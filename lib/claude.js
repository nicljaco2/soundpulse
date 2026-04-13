// Server-side Claude API helper — generates personalized content strategy from Spotify artist data.
// Uses claude-haiku for speed and cost (~$0.001 per analysis).

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

  const trackList   = topTracks.slice(0, 5).map(t => `"${t.title}" (popularity ${t.popularity}/100)`).join(', ')
  const featureLine = avgFeatures
    ? `BPM ~${Math.round(avgFeatures.tempo)} | Energy ${Math.round(avgFeatures.energy)}% | Danceability ${Math.round(avgFeatures.danceability)}% | Valence ${Math.round(avgFeatures.valence)}% | Acousticness ${Math.round(avgFeatures.acousticness)}%`
    : 'Audio features restricted — infer from artist name, tracks, genre tags'
  const spotifyTags = spotifyGenres.slice(0, 10).join(', ') || 'none'
  const priorGenre  = detectedGenre || 'undetermined'

  return `You are a viral music marketing strategist embedded inside TikTok, Instagram Reels, and YouTube Shorts. You understand the algorithm at a technical level — completion rate, save rate, share triggers, comment bait, and the 0–3 second hook that decides whether a viewer scrolls past or watches twice.

Your audience: independent artists with no label, no publicist, no budget. Every recommendation must be executable with a phone, a bedroom, and the music they've already made.

═══ ARTIST PROFILE ═══
Name: ${name}
Likely genre: ${priorGenre}
Spotify genre tags: ${spotifyTags}
Vibes detected: ${detectedVibes.join(', ') || 'none'}
Top tracks: ${trackList || 'unavailable'}
Followers: ${followers?.toLocaleString() ?? 'unknown'} | Spotify popularity: ${popularity ?? 'unknown'}/100
Audio profile: ${featureLine}

═══ YOUR TASKS ═══

TASK 1 — CLASSIFY
Determine the correct genre and vibes using everything you know about ${name} from your training data. The Spotify tags are a hint, not the final answer.

TASK 2 — REGION & LANGUAGE
Identify the artist's primary market (ISO 3166-1 alpha-2, uppercase) and the primary language of their music (ISO 639-1 lowercase). This is used to filter YouTube trending results geographically.

TASK 3 — SOUNDS (5 items)
Identify 5 specific sounds or sonic formats that are gaining algorithmic traction in ${name}'s genre RIGHT NOW. For each:
- BPM must match ${name}'s energy profile
- The "hook" field = the exact timestamp window that's driving content (e.g. "0:08–0:22 pre-chorus build")
- The "suggestion" = a concrete, specific filming instruction for ${name} — NOT generic advice. Mention their actual sound, BPM range, or a named track. Explain: (a) what to film in the first 2 seconds to stop the scroll, (b) what virality mechanic this activates (save, share, comment, completion loop)

TASK 4 — IDEAS (5 items)
Generate 5 content ideas across different types. For each idea:
- "title" = the scroll-stopping first-frame concept (what the viewer sees in 0–2s)
- "description" = 2–3 sentences covering: the hook, the virality mechanic (what makes someone save/share/comment), and exactly how ${name} executes it referencing their actual aesthetic or a real track title
- Ideas must span: at least 1 Trend Ride (ride an existing format), 1 Engagement (drives comments/votes), 1 Original (unique to their sound), 1 Evergreen (works any time)
- Prioritise saves over likes — saved content gets re-served by the algorithm

TASK 5 — CALENDAR (7 days, Mon–Sun)
Map the 5 ideas into a realistic week. Respect posting science: Tue–Thu are peak days for music content; Mon/Fri for engagement replies; Sun for planning. Each task must be action-specific, not "post content."

TASK 6 — ALERT
The single highest-leverage opportunity this week in ${name}'s genre. Should feel urgent and time-sensitive — what format or trend can they jump on TODAY for outsized algorithmic distribution? Be specific about why the timing matters.

═══ OUTPUT FORMAT ═══
Return ONLY a valid JSON object. No markdown fences, no explanation text, no comments inside the JSON.
All 6 fields are required. Strings from controlled vocabularies must match exactly.

Valid genres: ${SOUNDPULSE_GENRES.map(g => `"${g}"`).join(', ')}
Valid vibes: ${SOUNDPULSE_VIBES.map(v => `"${v}"`).join(', ')}

{
  "genre": "<one of the valid genres>",
  "vibes": ["<2 to 5 vibes, exact strings from the valid list>"],
  "region": "<ISO 3166-1 alpha-2 uppercase, e.g. US, GB, KR, BR, NG>",
  "language": "<ISO 639-1 lowercase, e.g. en, ko, es, pt, yo>",
  "sounds": [
    {
      "id": 1,
      "title": "<sound/format name>",
      "artist": "<creator or producer behind the sound>",
      "platform": "<TikTok or Reels or YouTube Shorts>",
      "videos": "<volume of content using this sound, e.g. 124K>",
      "growth": "<weekly growth rate, e.g. +580%>",
      "daysActive": <1 to 8>,
      "mood": "<one word that captures the emotional texture>",
      "bpm": <integer BPM matching the artist's energy profile>,
      "hook": "<timestamp window driving content, e.g. 0:14–0:28 chorus drop>",
      "suggestion": "<Specific filming instruction for ${name}: what to show in first 2 seconds + the virality mechanic this activates>"
    }
  ],
  "ideas": [
    {
      "id": 1,
      "type": "<Trend Ride or Original or Engagement or Evergreen>",
      "title": "<scroll-stopping first frame concept — what the viewer sees at 0s>",
      "effort": "<Low or Medium or High>",
      "impact": "<Low or Medium or High or Very High>",
      "timing": "<omit unless urgent — only include if there is a time-sensitive reason to post now>",
      "description": "<2–3 sentences: the hook, the virality mechanic, how ${name} executes it referencing their aesthetic or real track>",
      "format": "<platform(s), e.g. TikTok / Reels>",
      "tags": ["<3 relevant hashtags>"]
    }
  ],
  "calendar": [
    { "day": "Mon", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Tue", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Wed", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Thu", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Fri", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Sat", "task": "<specific action>", "type": "<create or post or engage or plan>" },
    { "day": "Sun", "task": "<specific action>", "type": "<create or post or engage or plan>" }
  ],
  "alert": {
    "title": "<3–5 word trend name>",
    "stat": "<specific engagement or growth stat>",
    "desc": "<1–2 sentences: why the timing is NOW for ${name}, what window they have before saturation>"
  }
}`
}

export async function generateArtistStrategy(artistData) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2500,
    messages:   [{ role: 'user', content: buildPrompt(artistData) }],
  })

  const raw = message.content[0]?.text?.trim()
  if (!raw) throw new Error('Empty response from Claude')

  const jsonText = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()

  let strategy
  try {
    strategy = JSON.parse(jsonText)
  } catch {
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 300)}`)
  }

  // Validate and sanitise — uppercase region before checking so Claude's lowercase output works
  if (!SOUNDPULSE_GENRES.includes(strategy.genre)) strategy.genre = null

  strategy.vibes = (strategy.vibes ?? []).filter(v => SOUNDPULSE_VIBES.includes(v))

  const rawRegion = typeof strategy.region === 'string' ? strategy.region.trim().toUpperCase() : null
  strategy.region = rawRegion && /^[A-Z]{2}$/.test(rawRegion) ? rawRegion : null

  const rawLang = typeof strategy.language === 'string' ? strategy.language.trim().toLowerCase() : null
  strategy.language = rawLang && /^[a-z]{2,3}$/.test(rawLang) ? rawLang : null

  strategy.sounds   = (strategy.sounds   ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.ideas    = (strategy.ideas    ?? []).map((s, i) => ({ id: i + 1, ...s }))
  strategy.calendar = strategy.calendar  ?? []

  return strategy
}
