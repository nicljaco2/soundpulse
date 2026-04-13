// Server-side Spotify utility — Client Credentials flow
// Token is cached in module scope so it's reused across requests within the same server instance

let cachedToken = null
let tokenExpiry  = 0

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Spotify token error ${res.status}: ${text}`)
  }

  const data = await res.json()
  cachedToken = data.access_token
  tokenExpiry  = Date.now() + (data.expires_in - 60) * 1000
  return cachedToken
}

// ─── Track search ─────────────────────────────────────────────────────────────

export async function searchTracks(query, limit = 5) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Spotify search error ${res.status}`)
  const data = await res.json()
  return data.tracks.items
}

export async function getAudioFeatures(trackId) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Spotify audio features error ${res.status}`)
  return res.json()
}

export async function searchWithFeatures(query, limit = 5) {
  const tracks = await searchTracks(query, limit)
  if (tracks.length === 0) return []

  const featuresResults = await Promise.allSettled(
    tracks.map(t => getAudioFeatures(t.id))
  )

  return tracks.map((track, i) => {
    const features = featuresResults[i].status === 'fulfilled' ? featuresResults[i].value : null
    return {
      id:           track.id,
      title:        track.name,
      artist:       track.artists.map(a => a.name).join(', '),
      album:        track.album.name,
      albumArt:     track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
      releaseDate:  track.album.release_date,
      popularity:   track.popularity,
      spotifyUrl:   track.external_urls.spotify,
      previewUrl:   track.preview_url,
      explicit:     track.explicit,
      durationMs:   track.duration_ms,
      bpm:          features ? Math.round(features.tempo) : null,
      energy:       features ? Math.round(features.energy * 100) : null,
      danceability: features ? Math.round(features.danceability * 100) : null,
      valence:      features ? Math.round(features.valence * 100) : null,
      acousticness: features ? Math.round(features.acousticness * 100) : null,
      mood:         features ? deriveMood(features) : 'neutral',
      key:            features?.key ?? null,
      mode:           features?.mode ?? null,
      timeSignature:  features?.time_signature ?? null,
    }
  })
}

// ─── Artist analysis ──────────────────────────────────────────────────────────

// Extract Spotify artist ID from a URL or URI
export function extractArtistId(input) {
  const match = input.match(/[:/]artist[/:]([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

async function getArtist(artistId) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Artist not found (${res.status})`)
  return res.json()
}

async function getArtistTopTracks(artistId) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Top tracks fetch failed (${res.status})`)
  const data = await res.json()
  return data.tracks
}

async function getBulkAudioFeatures(trackIds) {
  if (trackIds.length === 0) return []
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`Bulk audio features failed (${res.status})`)
  const data = await res.json()
  return data.audio_features.filter(Boolean)
}

// Main artist analysis — given a Spotify artist URL, return genre + vibe recommendations
export async function analyzeArtistProfile(spotifyUrl) {
  const artistId = extractArtistId(spotifyUrl)
  if (!artistId) throw new Error('Invalid Spotify artist URL')

  const [artist, topTracks] = await Promise.all([
    getArtist(artistId),
    getArtistTopTracks(artistId),
  ])

  const trackIds = topTracks.slice(0, 10).map(t => t.id)
  const features = await getBulkAudioFeatures(trackIds)

  const avg = features.length > 0 ? {
    energy:       avgKey(features, 'energy') * 100,
    danceability: avgKey(features, 'danceability') * 100,
    valence:      avgKey(features, 'valence') * 100,
    acousticness: avgKey(features, 'acousticness') * 100,
    tempo:        avgKey(features, 'tempo'),
  } : null

  const detectedGenre = mapToSoundPulseGenre(artist.genres)
  const detectedVibes = avg ? deriveVibes(avg, artist.genres) : []

  return {
    id:            artist.id,
    name:          artist.name,
    followers:     artist.followers.total,
    popularity:    artist.popularity,
    image:         artist.images[0]?.url ?? null,
    spotifyGenres: artist.genres,
    detectedGenre,
    detectedVibes,
    avgFeatures:   avg,
    topTracks:     topTracks.slice(0, 5).map(t => ({
      id:         t.id,
      title:      t.name,
      popularity: t.popularity,
      albumArt:   t.album.images[2]?.url ?? t.album.images[0]?.url ?? null,
    })),
    // Fallback flag — true if we had enough data to be confident
    confident: detectedGenre !== null && features.length >= 3,
  }
}

// ─── Mapping helpers ──────────────────────────────────────────────────────────

// SoundPulse has 6 genres. We score each based on how many Spotify genre strings match.
// The first rule with any match wins; ties go to the higher-priority rule.
const GENRE_RULES = [
  // Lo-Fi before Hip-Hop so "lofi hip hop" maps correctly
  { genre: 'Lo-Fi',      re: /lo.?fi|chillhop|jazz.?hop|study beats/ },
  { genre: 'Hip-Hop',    re: /hip.?hop|rap|trap|drill|grime|afrobeats|afropop|cloud rap/ },
  { genre: 'R&B',        re: /\br&b\b|rnb|neo.?soul|\bsoul\b|\bfunk\b|quiet storm/ },
  { genre: 'Electronic', re: /electronic|edm|\bhouse\b|techno|trance|dubstep|drum.and.bass|\bdnb\b|synth.?pop|electro|ambient/ },
  { genre: 'Alt Rock',   re: /\brock\b|alternative|grunge|\bpunk\b|\bmetal\b|\bemo\b|post.rock|hardcore|shoegaze|indie.rock/ },
  { genre: 'Indie Pop',  re: /indie.pop|bedroom.pop|dream.pop|indie|folk|singer.songwriter|art.pop|chillwave|acoustic/ },
]

function mapToSoundPulseGenre(spotifyGenres) {
  if (!spotifyGenres || spotifyGenres.length === 0) return null
  const joined = spotifyGenres.join(' ').toLowerCase()
  for (const rule of GENRE_RULES) {
    if (rule.re.test(joined)) return rule.genre
  }
  return null
}

// VIBE_OPTIONS in the app — only map to these exact strings
const VIBES = [
  'groovy', 'dreamy', 'atmospheric', 'energetic', 'raw / DIY',
  'guitar-driven', 'synth-heavy', 'psychedelic', 'lo-fi', 'danceable',
  'introspective', 'vocal-forward', 'upbeat', 'experimental', 'spacey',
]

function deriveVibes(avg, spotifyGenres) {
  const set = new Set()
  const genres = (spotifyGenres || []).join(' ').toLowerCase()

  if (avg.energy > 72)                          set.add('energetic')
  if (avg.energy < 38)                          set.add('atmospheric')
  if (avg.energy < 30)                          set.add('spacey')
  if (avg.valence > 65 && avg.energy > 55)      set.add('upbeat')
  if (avg.valence < 35)                         set.add('introspective')
  if (avg.danceability > 72)                    set.add('groovy')
  if (avg.danceability > 75 && avg.tempo > 110) set.add('danceable')
  if (avg.acousticness > 55)                    set.add('guitar-driven')
  if (avg.acousticness < 20 && avg.energy > 48) set.add('synth-heavy')
  if (avg.energy < 50 && avg.valence > 38 && avg.valence < 65) set.add('dreamy')
  if (avg.tempo < 82)                           set.add('lo-fi')

  if (/psychedel/.test(genres))                      set.add('psychedelic')
  if (/experimental|avant|noise/.test(genres))       set.add('experimental')
  if (/punk|garage|diy/.test(genres))                set.add('raw / DIY')
  if (/vocal|acapella|a.cappella/.test(genres))      set.add('vocal-forward')

  // Only return vibes that exist in VIBE_OPTIONS, max 5
  return [...set].filter(v => VIBES.includes(v)).slice(0, 5)
}

function deriveMood(features) {
  const v = features.valence, e = features.energy
  if (v > 0.7 && e > 0.6) return 'energetic'
  if (v > 0.6)             return 'upbeat'
  if (v > 0.4 && e > 0.6) return 'driving'
  if (v > 0.4)             return 'dreamy'
  if (e > 0.6)             return 'aggressive'
  if (v < 0.25)            return 'melancholic'
  return 'atmospheric'
}

function avgKey(arr, key) {
  return arr.reduce((sum, f) => sum + (f[key] ?? 0), 0) / arr.length
}
