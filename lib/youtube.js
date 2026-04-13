// Server-side YouTube Data API v3 helper
// Results cached per genre+region in module scope + CDN Cache-Control headers.
//
// Quota cost per cache refresh:
//   100 units (search) + ~8 units (videos.list stats) ≈ 108 units
//   6 genres × 4 refreshes/day (6-hr TTL) = ~2,592 units/day — well under 10k limit.
//
// publishedAfter: last 14 days — keeps results genuinely trending, not just popular.
// regionCode + relevantLanguage: passed in from Claude's artist analysis so results
//   match the artist's primary market (e.g. KR for K-pop, BR for Brazilian music).

const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

/** @type {Record<string, { data: object[], fetchedAt: number }>} */
const cache = {}

const GENRE_QUERIES = {
  'Lo-Fi':      'lofi hip hop chill beats #shorts',
  'Hip-Hop':    'hip hop rap trending #shorts',
  'R&B':        'rnb soul new music #shorts',
  'Electronic': 'electronic edm house music #shorts',
  'Alt Rock':   'alternative rock indie rock #shorts',
  'Indie Pop':  'indie pop new music #shorts',
}

function cacheKey(genre, regionCode) {
  return `${genre}::${regionCode ?? 'any'}`
}

function isFresh(key) {
  const entry = cache[key]
  return entry && Date.now() - entry.fetchedAt < CACHE_TTL_MS
}

// ISO 8601 duration → total seconds  (e.g. "PT1M30S" → 90)
function parseDuration(iso) {
  const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  return (parseInt(m[1] ?? 0) * 3600) + (parseInt(m[2] ?? 0) * 60) + parseInt(m[3] ?? 0)
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

export function formatRelativeDate(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7)   return `${days}d ago`
  if (days < 30)  return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

/**
 * @param {string}  genre         - SoundPulse genre label
 * @param {number}  [limit=8]     - max results
 * @param {string}  [regionCode]  - ISO 3166-1 alpha-2 (e.g. "US", "KR", "BR")
 * @param {string}  [language]    - ISO 639-1 (e.g. "en", "ko", "pt")
 */
export async function getTrendingByGenre(genre, limit = 8, regionCode, language) {
  const key = cacheKey(genre, regionCode)
  if (isFresh(key)) return { data: cache[key].data, fromCache: true, fetchedAt: cache[key].fetchedAt }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) throw new Error('YOUTUBE_API_KEY not configured')

  const query       = GENRE_QUERIES[genre] ?? genre
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  // ── Search (100 quota units) ───────────────────────────────────────────────
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
  searchUrl.searchParams.set('part', 'snippet')
  searchUrl.searchParams.set('q', query)
  searchUrl.searchParams.set('type', 'video')
  searchUrl.searchParams.set('videoDuration', 'short')   // under 4 minutes
  searchUrl.searchParams.set('order', 'viewCount')
  searchUrl.searchParams.set('publishedAfter', fourteenDaysAgo)
  searchUrl.searchParams.set('maxResults', String(limit))
  searchUrl.searchParams.set('key', apiKey)

  // Regional targeting — only add when explicitly provided
  if (regionCode)  searchUrl.searchParams.set('regionCode', regionCode)
  if (language)    searchUrl.searchParams.set('relevantLanguage', language)

  const searchRes = await fetch(searchUrl.toString(), { cache: 'no-store' })
  if (!searchRes.ok) {
    const text = await searchRes.text()
    throw new Error(`YouTube search error ${searchRes.status}: ${text}`)
  }
  const searchData = await searchRes.json()

  if (!searchData.items?.length) {
    // If region-filtered search returned nothing, retry without region filter
    if (regionCode) {
      console.warn(`[YouTube] No results for region=${regionCode}, retrying without region`)
      return getTrendingByGenre(genre, limit)
    }
    cache[key] = { data: [], fetchedAt: Date.now() }
    return { data: [], fromCache: false, fetchedAt: cache[key].fetchedAt }
  }

  const videoIds = searchData.items.map(i => i.id.videoId).join(',')

  // ── Video stats + duration (1 unit per video) ──────────────────────────────
  const statsUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
  statsUrl.searchParams.set('part', 'statistics,contentDetails')
  statsUrl.searchParams.set('id', videoIds)
  statsUrl.searchParams.set('key', apiKey)

  const statsRes = await fetch(statsUrl.toString(), { cache: 'no-store' })
  if (!statsRes.ok) throw new Error(`YouTube stats error ${statsRes.status}`)
  const statsData = await statsRes.json()

  const statsMap = {}
  statsData.items?.forEach(v => { statsMap[v.id] = v })

  const data = searchData.items.map(item => {
    const id    = item.id.videoId
    const stats = statsMap[id]?.statistics ?? {}
    const dur   = statsMap[id]?.contentDetails?.duration ?? ''
    return {
      id,
      title:       item.snippet.title,
      channel:     item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnail:   item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.medium?.url ?? null,
      viewCount:   parseInt(stats.viewCount ?? '0', 10),
      likeCount:   parseInt(stats.likeCount ?? '0', 10),
      duration:    parseDuration(dur),
      videoUrl:    `https://www.youtube.com/watch?v=${id}`,
      shortsUrl:   `https://www.youtube.com/shorts/${id}`,
    }
  })

  const fetchedAt = Date.now()
  cache[key] = { data, fetchedAt }
  return { data, fromCache: false, fetchedAt }
}
