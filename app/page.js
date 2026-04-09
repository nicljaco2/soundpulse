'use client'

import { useState } from "react"

// ─── Rumi Rafael · Groovy / Spacey Indie Pop & Rock ──────────────────────────
// Data sourced from YouTube trending & Instagram Reels audio — April 9, 2026

const RUMI_SOUNDS = [
  {
    id: 1,
    title: "The Less I Know the Better",
    artist: "Tame Impala",
    platform: "Reels",
    videos: "2.1M",
    growth: "+340%",
    daysActive: 3,
    mood: "spacey",
    bpm: 116,
    hook: "0:28–0:42 guitar groove + vocal",
    suggestion: "This is your sonic twin on Reels right now. Film a slow guitar close-up in warm, golden-hour light — the groove carries the visual by itself. Drop text: 'when the riff hits just right.' Your reverb-heavy tone slots directly into this aesthetic."
  },
  {
    id: 2,
    title: "Who's Your Boyfriend",
    artist: "Royel Otis",
    platform: "TikTok",
    videos: "312K",
    growth: "+890%",
    daysActive: 2,
    mood: "groovy",
    bpm: 128,
    hook: "0:06–0:22 opening riff",
    suggestion: "The opening riff is built for a 'windows down, guitar in hand' moment. Film in natural light — sun flare, dusty room, zero edits. Cut to YOUR own riff at the 22-second mark. That transition is what goes viral in this format."
  },
  {
    id: 3,
    title: "American Girls",
    artist: "Harry Styles",
    platform: "TikTok",
    videos: "178K",
    growth: "+510%",
    daysActive: 4,
    mood: "retro",
    bpm: 102,
    hook: "0:14–0:28 guitar strumming",
    suggestion: "The retro strumming aesthetic is peaking on TikTok. Show your guitar first — wood grain, the pick, fretting hand — then slowly pull back to reveal you playing. That slow reveal locks attention in the first 3 seconds."
  },
  {
    id: 4,
    title: "Sienna",
    artist: "The Marías",
    platform: "Reels",
    videos: "94K",
    growth: "+640%",
    daysActive: 5,
    mood: "dreamy",
    bpm: 84,
    hook: "0:10–0:24 guitar + reverb wash",
    suggestion: "The reverb wash format is dominating indie Reels. Dimly lit room, fairy lights, your clean tone — overlay the audio, then mute it and let YOUR atmospheric guitar close it out. Perfect for your spacey side."
  },
  {
    id: 5,
    title: "Lobster (electric riff wave)",
    artist: "Indie Guitar Wave",
    platform: "TikTok",
    videos: "41K",
    growth: "+1,180%",
    daysActive: 1,
    mood: "experimental",
    bpm: 132,
    hook: "0:08–0:20 electric riff",
    suggestion: "Brand new — just 1 day old and surging. Film a raw, one-take electric riff over this, then cut to YOUR riff. Early movers are pulling 3–5x algorithmic reach on this format. Get in before saturation."
  }
]

const RUMI_IDEAS = [
  {
    id: 1,
    type: "Trend Ride",
    title: "Tame Impala groove — atmospheric guitar Reel",
    effort: "Low",
    impact: "High",
    timing: "Post today — peak window open",
    description: "Film 15 seconds of slow guitar playing under golden-hour light. Use the Less I Know the Better audio, end on YOUR riff. This format is converting hard for guitar-forward indie artists — and your sound is literally this genre.",
    format: "Reels",
    tags: ["#indieguitarist", "#tameimpala", "#spaceyvibes", "#indiepop"]
  },
  {
    id: 2,
    type: "Original",
    title: "Guitar tone walkthrough — your signature sound",
    effort: "Medium",
    impact: "High",
    description: "Show your full signal chain: guitar → each pedal → amp. Demo every pedal alone, then hit your full tone at the end. Guitarist communities share these obsessively, and it signals deep craft — exactly the impression you want to build at this stage.",
    format: "TikTok / Reels / YouTube Shorts",
    tags: ["#guitartone", "#pedalboard", "#indieguitarist", "#signalchain"]
  },
  {
    id: 3,
    type: "Engagement",
    title: "'Groovy or dreamy?' — your two sides",
    effort: "Low",
    impact: "High",
    description: "Post two 10-second clips — one from your groovier tracks, one from your more atmospheric/spacey work. Ask: 'which side of Rumi Rafael hits harder?' Creates conversation around your sonic identity and tells you what your audience actually wants more of.",
    format: "TikTok / Instagram Stories",
    tags: ["#whichvibe", "#rumirafael", "#indieguitar", "#indiemusic"]
  },
  {
    id: 4,
    type: "Trend Ride",
    title: "Royel Otis riff-swap — seamless transition",
    effort: "Low",
    impact: "Very High",
    timing: "Post today — 2 days old, window is closing",
    description: "Play Who's Your Boyfriend opening riff for 6 seconds, then slide SEAMLESSLY into one of your own riffs. The transition moment is what goes viral. Raw, one-take, phone camera — over-production kills authenticity here.",
    format: "TikTok",
    tags: ["#royelotis", "#guitarriff", "#indiepop", "#riffswap"]
  },
  {
    id: 5,
    type: "Evergreen",
    title: "Voice memo → final track: your creative process",
    effort: "Medium",
    impact: "Medium",
    description: "Show the voice memo of the first idea, the messy first demo, and the polished final version. This format builds the strongest parasocial connection and gets massive saves from fellow musicians — it also sends strong signals to playlist algorithm editors.",
    format: "YouTube Shorts / TikTok",
    tags: ["#songwriting", "#process", "#indieartist", "#guitarplayer"]
  }
]

const RUMI_CALENDAR = [
  { day: "Mon", task: "Film guitar tone + pedal board signal chain reel", type: "create" },
  { day: "Tue", task: "Post Tame Impala atmospheric guitar Reel", type: "post" },
  { day: "Wed", task: "Engage — reply to comments, duet fans who cover your riffs", type: "engage" },
  { day: "Thu", task: "Film 'voice memo → final track' process video", type: "create" },
  { day: "Fri", task: "Post Royel Otis riff-swap + 'groovy or dreamy?' poll", type: "post" },
  { day: "Sat", task: "Engage — comment on 10 indie/psych-rock guitar pages", type: "engage" },
  { day: "Sun", task: "Review analytics + plan trending sounds for next week", type: "plan" }
]

const RUMI_STATS = {
  monthlyListeners: "171",
  listenersChange: "+12.4%",
  followers: "840",
  followersChange: "+4.8%",
  playlistReach: "2.1K",
  playlistChange: "+18%"
}

const RUMI_ALERT = {
  title: "Tame Impala Reels groove wave",
  stat: "2.1M Reels using the hook — guitar-forward indie content surging",
  desc: "Artists matching this aesthetic are pulling 4–8x normal reach right now. Your sound is this genre — post in the next 24 hours."
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const typeColors = {
  create: { bg: "#2D1B69", text: "#C4B5FD", dot: "#A78BFA" },
  post:   { bg: "#1B3A2D", text: "#86EFAC", dot: "#4ADE80" },
  engage: { bg: "#3A2A1B", text: "#FCD34D", dot: "#FBBF24" },
  plan:   { bg: "#1B2D3A", text: "#93C5FD", dot: "#60A5FA" },
}

const platformColors = {
  TikTok: "#FF004F",
  Reels: "#E1306C",
  "YouTube Shorts": "#FF0000"
}

const moodStyles = {
  dreamy:       { bg: "#312E81", text: "#C4B5FD" },
  nostalgic:    { bg: "#713F12", text: "#FDE68A" },
  melancholic:  { bg: "#1E3A5F", text: "#93C5FD" },
  playful:      { bg: "#14532D", text: "#86EFAC" },
  experimental: { bg: "#4C1D95", text: "#DDD6FE" },
  spacey:       { bg: "#1E1040", text: "#DDD6FE" },
  groovy:       { bg: "#2D1B07", text: "#FCD34D" },
  retro:        { bg: "#3A1E07", text: "#FDBA74" },
}

const ideaTypeStyles = {
  "Trend Ride": { color: "#F472B6", bg: "rgba(244,114,182,0.12)" },
  "Original":   { color: "#60A5FA", bg: "rgba(96,165,250,0.12)" },
  "Engagement": { color: "#FBBF24", bg: "rgba(251,191,36,0.12)" },
  "Evergreen":  { color: "#4ADE80", bg: "rgba(74,222,128,0.12)" },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MoodTag({ mood }) {
  const s = moodStyles[mood] || { bg: "#374151", text: "#D1D5DB" }
  return (
    <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, letterSpacing: "0.02em" }}>
      {mood}
    </span>
  )
}

function PlatformBadge({ platform }) {
  const color = platformColors[platform] || "#ccc"
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, color }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: color }} />
      {platform}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [expandedSound, setExpandedSound] = useState(null)
  const [expandedIdea,  setExpandedIdea]  = useState(null)
  const [activeTab,     setActiveTab]     = useState("brief")
  const [email,         setEmail]         = useState("")
  const [submitted,     setSubmitted]     = useState(false)
  const [calendarDone,  setCalendarDone]  = useState({})

  const toggleCalendar = (i) => setCalendarDone(prev => ({ ...prev, [i]: !prev[i] }))
  const handleWaitlist = (e) => { e.preventDefault(); if (email.trim()) setSubmitted(true) }

  const tabs = [
    { id: "brief",    label: "Daily brief" },
    { id: "trends",   label: "Trending sounds" },
    { id: "calendar", label: "This week" },
  ]

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(160deg, rgba(139,92,246,0.09) 0%, rgba(251,191,36,0.04) 60%, transparent 100%)" }}>

        {/* Branding + profile */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#A78BFA", letterSpacing: "-0.02em" }}>SoundPulse</span>
              <span style={{ fontSize: 9, background: "rgba(167,139,250,0.15)", color: "#A78BFA", padding: "2px 6px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.04em" }}>BETA</span>
            </div>
            <p style={{ fontSize: 12, color: "#6B6560", margin: 0 }}>Personalized for your artist profile</p>
          </div>
          {/* Spotify link */}
          <a
            href="https://open.spotify.com/artist/36Pjb0yokXNtAa8kGeYNGt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 8, padding: "5px 10px", textDecoration: "none" }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#1DB954" }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: "#1DB954" }}>Spotify</span>
          </a>
        </div>

        {/* Artist card */}
        <div style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(251,191,36,0.05) 100%)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Avatar placeholder */}
            <div style={{ width: 44, height: 44, borderRadius: 99, background: "linear-gradient(135deg, #7C3AED 0%, #FBBF24 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "#fff" }}>R</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#E8E6E1", marginBottom: 2 }}>Rumi Rafael</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Groovy", "Spacey", "Indie Pop/Rock", "Guitar"].map(tag => (
                  <span key={tag} style={{ fontSize: 10, color: "#A78BFA", background: "rgba(167,139,250,0.1)", padding: "1px 7px", borderRadius: 99, fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: "#4ADE80" }}>171</div>
              <div style={{ fontSize: 9, color: "#6B6560", marginTop: 1 }}>monthly<br />listeners</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: "none", border: "none", padding: "10px 16px",
                fontSize: 13, fontWeight: activeTab === t.id ? 500 : 400,
                color: activeTab === t.id ? "#A78BFA" : "#6B6560",
                cursor: "pointer",
                borderBottom: activeTab === t.id ? "2px solid #A78BFA" : "2px solid transparent",
                fontFamily: "inherit", transition: "all 0.15s"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "20px 20px 40px" }}>

        {/* ── Daily Brief ── */}
        {activeTab === "brief" && (
          <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Monthly listeners", value: RUMI_STATS.monthlyListeners, change: RUMI_STATS.listenersChange },
                { label: "Followers",          value: RUMI_STATS.followers,        change: RUMI_STATS.followersChange },
                { label: "Playlist reach",     value: RUMI_STATS.playlistReach,    change: RUMI_STATS.playlistChange },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 4, letterSpacing: "0.03em" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "#E8E6E1" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#4ADE80", marginTop: 3 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Hot opportunity */}
            <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#F472B6", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#F9A8D4", letterSpacing: "0.04em", textTransform: "uppercase" }}>Hot opportunity</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D4D0CB" }}>
                <strong style={{ color: "#E8E6E1" }}>{RUMI_ALERT.title}</strong>
                {" — "}
                {RUMI_ALERT.stat}. {RUMI_ALERT.desc}
              </p>
            </div>

            {/* Data source note */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase", flex: 1 }}>This week{"'"}s content ideas</h3>
              <span style={{ fontSize: 10, color: "#4B4540", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 6 }}>YouTube + Instagram · Apr 9</span>
            </div>

            {/* Ideas */}
            {RUMI_IDEAS.map(idea => {
              const ts = ideaTypeStyles[idea.type] || ideaTypeStyles["Evergreen"]
              return (
                <div
                  key={idea.id}
                  onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                  style={{
                    background: expandedIdea === idea.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                    border: "1px solid",
                    borderColor: expandedIdea === idea.id ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)",
                    borderRadius: 12, padding: "12px 14px", marginBottom: 6,
                    cursor: "pointer", transition: "all 0.15s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: ts.color, background: ts.bg, padding: "2px 6px", borderRadius: 4 }}>{idea.type}</span>
                        <span style={{ fontSize: 10, color: "#6B6560" }}>{idea.format}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1", marginBottom: 3 }}>{idea.title}</div>
                      <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#6B6560" }}>
                        <span>Effort: <span style={{ color: idea.effort === "Low" ? "#4ADE80" : idea.effort === "High" ? "#F472B6" : "#FBBF24" }}>{idea.effort}</span></span>
                        <span>Impact: <span style={{ color: idea.impact === "Very High" ? "#F472B6" : idea.impact === "High" ? "#4ADE80" : "#FBBF24" }}>{idea.impact}</span></span>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "#6B6560", transform: expandedIdea === idea.id ? "rotate(180deg)" : "none", transition: "transform 0.15s", lineHeight: 1 }}>&#8964;</span>
                  </div>
                  {expandedIdea === idea.id && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.7, color: "#A8A49E" }}>{idea.description}</p>
                      {idea.timing && (
                        <div style={{ background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 8, padding: "7px 10px", marginBottom: 10, fontSize: 11, color: "#F9A8D4" }}>{idea.timing}</div>
                      )}
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {idea.tags.map(tag => (
                          <span key={tag} style={{ fontSize: 10, color: "#8B8680", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 99 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Trending Sounds ── */}
        {activeTab === "trends" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trending in your genre</h3>
              <span style={{ fontSize: 11, color: "#6B6560" }}>YouTube + IG · Apr 9</span>
            </div>

            {/* Genre context */}
            <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.1)", borderRadius: 10, padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#A8A49E", lineHeight: 1.6 }}>
              <span style={{ color: "#FBBF24", fontWeight: 500 }}>Groovy · Spacey · Indie Pop/Rock</span> — sounds trending across YouTube Shorts, TikTok, and Instagram Reels that align with Rumi{"'"}s sonic identity.
            </div>

            {RUMI_SOUNDS.map((sound, i) => (
              <div
                key={sound.id}
                onClick={() => setExpandedSound(expandedSound === sound.id ? null : sound.id)}
                style={{
                  background: expandedSound === sound.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                  border: "1px solid",
                  borderColor: sound.daysActive <= 2 ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.05)",
                  borderRadius: 12, padding: "12px 14px", marginBottom: 6,
                  cursor: "pointer", transition: "all 0.15s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6B6560", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                      <PlatformBadge platform={sound.platform} />
                      <MoodTag mood={sound.mood} />
                      {sound.daysActive <= 2 && (
                        <span style={{ fontSize: 9, background: "rgba(244,114,182,0.15)", color: "#F472B6", padding: "2px 5px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.04em" }}>EARLY</span>
                      )}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#E8E6E1" }}>{sound.title}</div>
                    <div style={{ fontSize: 11, color: "#6B6560", marginTop: 2 }}>by {sound.artist}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 72 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: "#4ADE80" }}>{sound.growth}</div>
                    <div style={{ fontSize: 10, color: "#6B6560" }}>{sound.videos} videos</div>
                    <div style={{ fontSize: 10, color: "#6B6560" }}>{sound.daysActive}d active</div>
                  </div>
                </div>

                {expandedSound === sound.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11, color: "#8B8680" }}>
                      <span>{sound.bpm} BPM</span>
                      <span>Hook: {sound.hook}</span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 5 }}>7-day growth</div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
                        {[10, 16, 25, 38, 55, 78, 100].map((h, j) => (
                          <div key={j} style={{ flex: 1, height: h + "%", background: j === 6 ? "#A78BFA" : "rgba(167,139,250,0.3)", borderRadius: "3px 3px 0 0" }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 10, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, fontWeight: 500, color: "#A78BFA", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>How to use this for YOUR music</div>
                      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "#C4B5FD" }}>{sound.suggestion}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Calendar ── */}
        {activeTab === "calendar" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Week of April 7–13</h3>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(typeColors).map(([type, c]) => (
                  <span key={type} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: c.text }}>
                    <span style={{ width: 5, height: 5, borderRadius: 99, background: c.dot }} />
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {RUMI_CALENDAR.map((item, i) => {
              const c = typeColors[item.type]
              const done = !!calendarDone[i]
              return (
                <div
                  key={i}
                  onClick={() => toggleCalendar(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: done ? "rgba(255,255,255,0.01)" : c.bg + "44",
                    border: "1px solid",
                    borderColor: done ? "rgba(255,255,255,0.03)" : c.dot + "22",
                    borderRadius: 12, padding: "12px 14px", marginBottom: 5,
                    cursor: "pointer", transition: "all 0.15s", opacity: done ? 0.5 : 1
                  }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: "2px solid " + (done ? "#4ADE80" : c.dot), background: done ? "rgba(74,222,128,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {done && <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 700 }}>&#10003;</span>}
                  </div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: done ? "#6B6560" : "#E8E6E1", textDecoration: done ? "line-through" : "none" }}>{item.task}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: c.text, opacity: 0.7, minWidth: 28, textAlign: "right" }}>{item.day}</div>
                </div>
              )
            })}

            <div style={{ marginTop: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#A8A49E", marginBottom: 6 }}>Your weekly rhythm</div>
              <div style={{ fontSize: 11, lineHeight: 1.8, color: "#6B6560" }}>
                <span style={{ color: typeColors.create.text }}>Create</span> on Mon/Thu — batch your filming.{" "}
                <span style={{ color: typeColors.post.text }}>Post</span> on Tue/Fri — peak algorithm windows.{" "}
                <span style={{ color: typeColors.engage.text }}>Engage</span> on Wed/Sat — community building.{" "}
                <span style={{ color: typeColors.plan.text }}>Plan</span> on Sunday — review and prep.
              </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.1)", borderRadius: 12, padding: "12px 14px" }}>
              <span style={{ fontSize: 12, color: "#A8A49E" }}>Estimated time this week</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#A78BFA" }}>~4.5 hrs</span>
            </div>
          </div>
        )}

        {/* ── Waitlist ── */}
        <div style={{ marginTop: 32, background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
          {!submitted ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E6E1", marginBottom: 6 }}>Get early access</div>
              <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px", lineHeight: 1.6 }}>SoundPulse is launching soon. Join the waitlist and be first to know when we go live.</p>
              <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit", outline: "none" }}
                />
                <button type="submit" style={{ background: "#7C3AED", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Join waitlist
                </button>
              </form>
            </>
          ) : (
            <div>
              <div style={{ fontSize: 24, marginBottom: 8 }}>&#10003;</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#4ADE80", marginBottom: 4 }}>You{"'"}re on the list</div>
              <p style={{ fontSize: 12, color: "#8B8680", margin: 0 }}>We{"'"}ll reach out when SoundPulse is ready for you.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
