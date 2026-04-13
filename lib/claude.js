// Server-side Claude API helper — generates personalized content strategy from Spotify artist data.
// Uses claude-haiku for speed and cost (~$0.001 per analysis).
//
// Genre detection: Spotify's regex-based mapping misses many artists (phonk, hyperpop,
// synthwave, sad rap, plugg, etc.). Claude uses the artist name + track names it knows
// from training data to make a confident genre + vibe determination regardless of
// whether Spotify genre tags are populated.

import Anthropic from '@anthropic-ai/sdk'

const SOUNDPULSE_GENRES = ['Lo-Fi', 'Hip-Hop', 'R&B', 'Electronic', 'Alt Rock', 'Indie Pop']
const SOUNDPULSE_VIBES  = [
  'groovy', 'dreamy', 'atmospheric', 'energetic', 'raw / DIY',
  'guitar-driven', 'synth-heavy', 'psychedelic', 'lo-fi', 'danceable',
  'introspective', 'vocal-forward', 'upbeat', 'experimental', 'spacey',
]

function buildPrompt(artistData) {
  const {
    name, detectedGenre, detectedVibes = [], followers, popularity,
    spotifyGenres = [], avgFeatures, topTracks = [],
  } = artistData

  const trackList    = topTracks.slice(0, 5).map(t => `"${t.title}" (popularity ${t.popularity}/100)`).join(', ')
  const featureLine  = avgFeatures
    ? `BPM: ${Math.round(avgFeatures.tempo)} | Energy: ${Math.round(avgFeatures.energy)}% | Danceability: ${Math.round(avgFeatures.danceability)}% | Valence: ${Math.round(avgFeatures.valence)}% | Acousticness: ${Math.round(avgFeatures.acousticness)}%`
    : 'Audio features unavailable — infer from artist name, tracks, and genre tags'
  const spotifyTags  = spotifyGenres.slice(0, 10).join(', ') || 'none'
  const regexGenre   = detectedGenre || 'could not determine — you must classify'

  return `You are a music industry expert and content strategist. A genre detection system has tried to classify this artist but may have failed or guessed incorrectly. Your job is to:
1. Determine the correct SoundPulse genre (you likely know this artist from your training data)
2. Determine appropriate vibes
3. Generate a personalized short-form content strategy

ARTIST PROFILE
Name: ${name}
Regex-detected genre (may be wrong or null): ${regexGenre}
Regex-detected vibes: ${detectedVibes.join(', ') || 'none'}
Spotify genre tags: ${spotifyTags}
Top tracks: ${trackList || 'unavailable'}
Followers: ${followers?.toLocaleString() ?? 'unknown'} | Popularity: ${popularity ?? 'unknown'}/100
Audio analysis: ${featureLine}

GENRE CLASSIFICATION RULES
Pick exactly ONE genre from this list that best fits the artist's PRIMARY sound:
${SOUNDPULSE_GENRES.map(g => `  - "${g}"`).join('\n')}

VIBE CLASSIFICATION RULES
Pick 2–5 vibes from this list only (no others):
${SOUNDPULSE_VIBES.map(v => `  - "${v}"`).join('\n')}

OUTPUT RULES
- Return ONLY a valid JSON object. No markdown, no explanation, no code fences.
- The "genre" field MUST be one of the 6 genres above — never null, never a different string.
- The "vibes" field MUST only contain strings from the vibes list above.
- Every content suggestion must be specific to ${name}'s actual sound and named tracks.
- Calendar tasks must implement the ideas — no generic filler.

OUTPUT SCHEMA (follow exactly):
{
  "genre": "<one of the 6 SoundPulse genres>",
  "vibes": ["<2–5 vibes from the list>"],
  "sounds": [
    {
      "id": 1,
      "title": "trending sound name",
      "artist": "sound creator or producer",
      "platform": "TikTok" | "Reels" | "YouTube Shorts",
      "videos": "e.g. 87K",
      "growth": "e.g. +430%",
      "daysActive": <integer 1–8>,
      "mood": "<one word>",
      "bpm": <integer matching artist's energy profile>,
      "hook": "e.g. 0:10–0:24 chorus drop",
      "suggestion": "<2 sentences: specific advice for how ${name} should use this sound>"
    }
    /* 5 sounds total */
  ],
  "ideas": [
    {
      "id": 1,
      "type": "Trend Ride" | "Original" | "Engagement" | "Evergreen",
      "title": "<short punchy title>",
      "effort": "Low" | "Medium" | "High",
      "impact": "Low" | "Medium" | "High" | "Very High",
      "timing": "<only if urgent, e.g. 'Post today — trend is 2 days old', otherwise omit>",
      "description": "<2–3 sentences referencing ${name}'s actual tracks, aesthetic, and genre>",
      "format": "e.g. TikTok / Reels",
      "tags": ["#tag1", "#tag2", "#tag3"]
    }
    /* 5 ideas total */
  ],
  "calendar": [
    { "day": "Mon", "task": "<specific task>", "type": "create" },
    { "day": "Tue", "task": "<specific task>", "type": "post" },
    { "day": "Wed", "task": "<specific task>", "type": "engage" },
    { "day": "Thu", "task": "<specific task>", "type": "create" },
    { "day": "Fri", "task": "<specific task>", "type": "post" },
    { "day": "Sat", "task": "<specific task>", "type": "engage" },
    { "day": "Sun", "task": "<specific task>", "type": "plan" }
  ],
  "alert": {
    "title": "<trending opportunity — 3–5 words>",
    "stat": "<specific stat>",
    "desc": "<1–2 sentences on why this matters for ${name} right now>"
  }
}`
}

export async function generateArtistStrategy(artistData) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages:   [{ role: 'user', content: buildPrompt(artistData) }],
  })

  const raw = message.content[0]?.text?.trim()
  if (!raw) throw new Error('Empty response from Claude')

  const jsonText = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()

  let strategy
  try {
    strategy = JSON.parse(jsonText)
  } catch {
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 200)}`)
  }

  // Validate and sanitise
  if (!SOUNDPULSE_GENRES.includes(strategy.genre)) strategy.genre = null
  strategy.vibes    = (strategy.vibes ?? []).filter(v => SOUNDPULSE_VIBES.includes(v))
  strategy.sounds   = (strategy.sounds   ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.ideas    = (strategy.ideas    ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.calendar = strategy.calendar  ?? []

  return strategy
}
