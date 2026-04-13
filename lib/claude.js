// Server-side Claude API helper — generates personalized content strategy from Spotify artist data.
// Uses claude-haiku for speed and cost (~$0.001 per analysis).
//
// Why not actual audio? Claude's API is text/image only. Spotify's audio features
// (BPM, energy, danceability, valence, acousticness) ARE the machine-readable output
// of audio analysis — sending them to Claude is equivalent to describing what the song sounds like.
// Track names help too: Claude knows most popular songs from training data.

import Anthropic from '@anthropic-ai/sdk'

function buildPrompt(artistData) {
  const {
    name, detectedGenre, detectedVibes = [], followers, popularity,
    spotifyGenres = [], avgFeatures, topTracks = [],
  } = artistData

  const vibes    = detectedVibes.length ? detectedVibes.join(', ') : 'not specified'
  const trackList = topTracks.slice(0, 5).map(t => `"${t.title}" (popularity ${t.popularity}/100)`).join(', ')
  const featureLine = avgFeatures
    ? `Avg BPM: ${Math.round(avgFeatures.tempo)} | Energy: ${Math.round(avgFeatures.energy)}% | Danceability: ${Math.round(avgFeatures.danceability)}% | Valence (mood): ${Math.round(avgFeatures.valence)}% | Acousticness: ${Math.round(avgFeatures.acousticness)}%`
    : `Audio features unavailable — infer from genre (${detectedGenre}) and vibes`
  const genreTags = spotifyGenres.slice(0, 8).join(', ') || detectedGenre

  return `You are a music marketing strategist for independent artists on TikTok, Instagram Reels, and YouTube Shorts.

Generate a hyper-personalized short-form content strategy for this artist. Reference their actual music style — do not give generic advice.

ARTIST PROFILE
Name: ${name}
Genre: ${detectedGenre}
Vibes: ${vibes}
Followers: ${followers?.toLocaleString() ?? 'unknown'}
Popularity: ${popularity ?? 'unknown'}/100
Spotify genre tags: ${genreTags}
Top tracks: ${trackList || 'unavailable'}
Audio analysis: ${featureLine}

OUTPUT RULES
- Return ONLY a valid JSON object. No markdown, no explanation, no code fences.
- Every suggestion must be specific to ${name}'s actual sound (BPM, energy, genre, named tracks).
- Sounds should match the artist's BPM range and energy level from the audio analysis.
- Ideas must reference their specific genre, vibes, and at least one of their actual track titles where possible.
- Calendar tasks must implement the ideas — not be generic "post content" filler.

OUTPUT SCHEMA (follow exactly):
{
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
      "suggestion": "<2 sentences: specific advice for how ${name} should use this sound, referencing their style>"
    }
    /* repeat for 5 sounds total */
  ],
  "ideas": [
    {
      "id": 1,
      "type": "Trend Ride" | "Original" | "Engagement" | "Evergreen",
      "title": "<short punchy title>",
      "effort": "Low" | "Medium" | "High",
      "impact": "Low" | "Medium" | "High" | "Very High",
      "timing": "<only include if urgent, e.g. 'Post today — trend is 2 days old'>",
      "description": "<2–3 sentences, specific to ${name}'s actual tracks, aesthetic, and genre>",
      "format": "e.g. TikTok / Reels",
      "tags": ["#tag1", "#tag2", "#tag3"]
    }
    /* repeat for 5 ideas total */
  ],
  "calendar": [
    { "day": "Mon", "task": "<specific task referencing their content plan>", "type": "create" },
    { "day": "Tue", "task": "<specific task>", "type": "post" },
    { "day": "Wed", "task": "<specific task>", "type": "engage" },
    { "day": "Thu", "task": "<specific task>", "type": "create" },
    { "day": "Fri", "task": "<specific task>", "type": "post" },
    { "day": "Sat", "task": "<specific task>", "type": "engage" },
    { "day": "Sun", "task": "<specific task>", "type": "plan" }
  ],
  "alert": {
    "title": "<trending opportunity name — 3–5 words>",
    "stat": "<specific stat about the opportunity>",
    "desc": "<1–2 sentences on why this is relevant to ${name}'s sound right now>"
  }
}`
}

export async function generateArtistStrategy(artistData) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{ role: 'user', content: buildPrompt(artistData) }],
  })

  const raw = message.content[0]?.text?.trim()
  if (!raw) throw new Error('Empty response from Claude')

  // Strip markdown fences if the model wrapped the JSON anyway
  const jsonText = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()

  let strategy
  try {
    strategy = JSON.parse(jsonText)
  } catch {
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 200)}`)
  }

  // Ensure id fields are present on sounds/ideas (in case Claude omitted them)
  strategy.sounds  = (strategy.sounds  ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.ideas   = (strategy.ideas   ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.calendar = strategy.calendar ?? []

  return strategy
}
