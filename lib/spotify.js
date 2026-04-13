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
  tokenExpiry  = Date.now() + (data.expires_in - 60) * 1000 // refresh 60s before expiry
  return cachedToken
}

// Search tracks — returns raw Spotify track objects (top `limit` results)
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

// Audio features for a single track ID
export async function getAudioFeatures(trackId) {
  const token = await getAccessToken()

  const res = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )

  if (!res.ok) throw new Error(`Spotify audio features error ${res.status}`)
  return res.json()
}

// Convenience — search + enrich top results with audio features in one call
export async function searchWithFeatures(query, limit = 5) {
  const tracks = await searchTracks(query, limit)
  if (tracks.length === 0) return []

  const featuresResults = await Promise.allSettled(
    tracks.map(t => getAudioFeatures(t.id))
  )

  return tracks.map((track, i) => {
    const features = featuresResults[i].status === 'fulfilled' ? featuresResults[i].value : null

    // Map valence → mood label
    let mood = 'neutral'
    if (features) {
      const v = features.valence
      const e = features.energy
      if (v > 0.7 && e > 0.6)       mood = 'energetic'
      else if (v > 0.6)              mood = 'upbeat'
      else if (v > 0.4 && e > 0.6)  mood = 'driving'
      else if (v > 0.4)              mood = 'dreamy'
      else if (e > 0.6)              mood = 'aggressive'
      else if (v < 0.25)             mood = 'melancholic'
      else                           mood = 'atmospheric'
    }

    return {
      id:           track.id,
      title:        track.name,
      artist:       track.artists.map(a => a.name).join(', '),
      album:        track.album.name,
      albumArt:     track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
      releaseDate:  track.album.release_date,
      popularity:   track.popularity,               // 0–100
      spotifyUrl:   track.external_urls.spotify,
      previewUrl:   track.preview_url,              // 30-sec clip URL (may be null)
      explicit:     track.explicit,
      durationMs:   track.duration_ms,
      // Audio features (null if unavailable)
      bpm:          features ? Math.round(features.tempo) : null,
      energy:       features ? Math.round(features.energy * 100) : null,       // 0–100
      danceability: features ? Math.round(features.danceability * 100) : null, // 0–100
      valence:      features ? Math.round(features.valence * 100) : null,      // 0–100 (sadness→happiness)
      acousticness: features ? Math.round(features.acousticness * 100) : null, // 0–100
      mood,
      key:            features?.key ?? null,           // 0=C, 1=C#, 2=D … 11=B
      mode:           features?.mode ?? null,          // 1=major, 0=minor
      timeSignature:  features?.time_signature ?? null,
    }
  })
}
