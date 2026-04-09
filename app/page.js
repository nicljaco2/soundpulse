'use client'

import { useState } from "react"

const GENRE_OPTIONS = ["Indie Pop", "Hip-Hop", "Electronic", "R&B", "Alt Rock", "Lo-Fi"]

const TRENDING_SOUNDS = [
  { id: 1, title: "Velvet Haze", artist: "poolboy", platform: "TikTok", videos: "284K", growth: "+1,240%", daysActive: 3, mood: "dreamy", bpm: 98, hook: "0:14–0:28 chorus drop", suggestion: "Use the 14-sec chorus hook over a 'day in my life' aesthetic — golden hour lighting, slow motion transitions" },
  { id: 2, title: "Static Love", artist: "NIKA", platform: "Reels", videos: "156K", growth: "+680%", daysActive: 5, mood: "nostalgic", bpm: 112, hook: "0:22–0:36 bridge vocal", suggestion: "Film a 'then vs now' split-screen with the bridge vocal as the transition beat" },
  { id: 3, title: "Neon Tears", artist: "glass animal collective", platform: "TikTok", videos: "91K", growth: "+320%", daysActive: 7, mood: "melancholic", bpm: 86, hook: "0:08–0:22 intro riff", suggestion: "The intro riff is perfect for a slow-reveal — start with a close-up detail shot, pull back on the drop" },
  { id: 4, title: "Cheap Wine", artist: "somegirl", platform: "YouTube Shorts", videos: "67K", growth: "+190%", daysActive: 4, mood: "playful", bpm: 124, hook: "0:00–0:15 opening verse", suggestion: "The opening verse works for 'unpopular opinion' or 'things that just hit different' format" },
  { id: 5, title: "Blurface", artist: "TVquiet", platform: "TikTok", videos: "43K", growth: "+890%", daysActive: 1, mood: "experimental", bpm: 76, hook: "0:18–0:30 beat switch", suggestion: "Early trend — beat switch is ideal for transformation/glow-up reveals. Get in now before saturation" },
]

const CONTENT_IDEAS = [
  { id: 1, type: "Trend Ride", title: "Velvet Haze chorus challenge", effort: "Low", impact: "High", timing: "Post today — peak window", description: "Record a 15-sec clip of you vibing to your own track using the Velvet Haze format. Swap in YOUR chorus at the 14-sec mark. The contrast gets saves.", format: "TikTok / Reels", tags: ["#indiemusic", "#newmusic", "#velvethazetrend"] },
  { id: 2, type: "Original", title: "Studio session time-lapse", effort: "Medium", impact: "Medium", description: "Film your next recording session. Speed it up to 60 seconds. Overlay your latest track. These consistently get 2-3x your normal engagement.", format: "TikTok / Reels / Shorts", tags: ["#studiolife", "#musicproduction", "#behindthemusic"] },
  { id: 3, type: "Engagement", title: "'Which version?' A/B poll", effort: "Low", impact: "High", description: "Post two 10-sec clips of the same song section with different production choices. Ask followers to vote. Drives comments and saves.", format: "TikTok / Instagram Stories", tags: ["#whichversion", "#newmusic", "#indieartist"] },
  { id: 4, type: "Trend Ride", title: "Blurface beat-switch reveal", effort: "Medium", impact: "Very High", description: "The Blurface beat-switch is brand new (1 day old, +890% growth). Film a before/after transformation synced to the switch, but end on YOUR song. Early adoption = maximum algorithmic push.", format: "TikTok", tags: ["#blurface", "#beatswitchchallenge", "#indiemusic"] },
  { id: 5, type: "Evergreen", title: "How I wrote [your song title]", effort: "Medium", impact: "Medium", description: "Songwriting breakdowns perform well across all platforms. Show the voice memo, the first demo, then the final version. Humanizes your process.", format: "YouTube Shorts / TikTok", tags: ["#songwriting", "#process", "#musicmaker"] },
]

const WEEKLY_CALENDAR = [
  { day: "Mon", task: "Film trend content (Velvet Haze)", type: "create", done: false },
  { day: "Tue", task: "Post Velvet Haze trend video", type: "post", done: false },
  { day: "Wed", task: "Engage — reply to comments, duet fans", type: "engage", done: false },
  { day: "Thu", task: "Film studio session time-lapse", type: "create", done: false },
  { day: "Fri", task: "Post A/B poll + studio content", type: "post", done: false },
  { day: "Sat", task: "Engage — comment on 10 similar artists", type: "engage", done: false },
  { day: "Sun", task: "Plan next week + review analytics", type: "plan", done: false },
]

const ARTIST_STATS = {
  monthlyListeners: "34,200",
  listenersChange: "+8.2%",
  followers: "12,800",
  followersChange: "+3.1%",
  playlistReach: "89K",
}

const typeColors = {
  create: { bg: "#2D1B69", text: "#C4B5FD", dot: "#A78BFA" },
  post: { bg: "#1B3A2D", text: "#86EFAC", dot: "#4ADE80" },
  engage: { bg: "#3A2A1B", text: "#FCD34D", dot: "#FBBF24" },
  plan: { bg: "#1B2D3A", text: "#93C5FD", dot: "#60A5FA" },
}

const platformColors = {
  TikTok: "#FF004F",
  Reels: "#E1306C",
  "YouTube Shorts": "#FF0000",
}

const moodStyles = {
  dreamy: { bg: "#312E81", text: "#C4B5FD" },
  nostalgic: { bg: "#713F12", text: "#FDE68A" },
  melancholic: { bg: "#1E3A5F", text: "#93C5FD" },
  playful: { bg: "#14532D", text: "#86EFAC" },
  experimental: { bg: "#4C1D95", text: "#DDD6FE" },
}

const ideaTypeStyles = {
  "Trend Ride": { color: "#F472B6", bg: "rgba(244,114,182,0.12)" },
  "Original": { color: "#60A5FA", bg: "rgba(96,165,250,0.12)" },
  "Engagement": { color: "#FBBF24", bg: "rgba(251,191,36,0.12)" },
  "Evergreen": { color: "#4ADE80", bg: "rgba(74,222,128,0.12)" },
}

function MoodTag({ mood }) {
  const s = moodStyles[mood] || { bg: "#374151", text: "#D1D5DB" }
  return (
    <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, letterSpacing: "0.02em" }}>
      {mood}
    </span>
  )
}

function PlatformBadge({ platform }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, color: platformColors[platform] || "#ccc" }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: platformColors[platform] || "#ccc" }} />
      {platform}
    </span>
  )
}

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Indie Pop")
  const [expandedSound, setExpandedSound] = useState(null)
  const [expandedIdea, setExpandedIdea] = useState(null)
  const [calendar, setCalendar] = useState(WEEKLY_CALENDAR)
  const [activeTab, setActiveTab] = useState("brief")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const toggleCalendar = (i) => {
    setCalendar(prev => prev.map((item, idx) => idx === i ? { ...item, done: !item.done } : item))
  }

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (email.trim()) {
      // In production, wire this to Formspree, Tally, or your own API
      setSubmitted(true)
    }
  }

  const tabs = [
    { id: "brief", label: "Daily brief" },
    { id: "trends", label: "Trending sounds" },
    { id: "calendar", label: "This week" },
  ]

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#A78BFA", letterSpacing: "-0.02em" }}>SoundPulse</span>
              <span style={{ fontSize: 10, background: "rgba(167,139,250,0.15)", color: "#A78BFA", padding: "2px 6px", borderRadius: 4, fontWeight: 500 }}>BETA</span>
            </div>
            <p style={{ fontSize: 13, color: "#8B8680", margin: 0 }}>Your weekly marketing strategist</p>
          </div>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
            {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: "none", border: "none", padding: "10px 16px", fontSize: 13,
              fontWeight: activeTab === t.id ? 500 : 400,
              color: activeTab === t.id ? "#A78BFA" : "#6B6560",
              cursor: "pointer",
              borderBottom: activeTab === t.id ? "2px solid #A78BFA" : "2px solid transparent",
              fontFamily: "inherit", transition: "all 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 40px" }}>

        {/* ============ DAILY BRIEF ============ */}
        {activeTab === "brief" && (
          <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Monthly listeners", value: ARTIST_STATS.monthlyListeners, change: ARTIST_STATS.listenersChange },
                { label: "Followers", value: ARTIST_STATS.followers, change: ARTIST_STATS.followersChange },
                { label: "Playlist reach", value: ARTIST_STATS.playlistReach, change: "+12%" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 4, letterSpacing: "0.03em" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "#E8E6E1" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#4ADE80", marginTop: 3 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Alert */}
            <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#F472B6", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#F9A8D4", letterSpacing: "0.04em", textTransform: "uppercase" }}>Hot opportunity</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D4D0CB" }}>
                <strong style={{ color: "#E8E6E1" }}>Blurface beat-switch</strong> is exploding — 43K videos in just 1 day with +890% growth. Artists who post in the first 48 hours get 3-5x more algorithmic distribution.
              </p>
            </div>

            {/* Content Ideas */}
            <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: "0 0 12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>This week's content ideas</h3>
            {CONTENT_IDEAS.map((idea) => {
              const ts = ideaTypeStyles[idea.type] || ideaTypeStyles["Evergreen"]
              return (
                <div key={idea.id} onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)} style={{
                  background: expandedIdea === idea.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                  border: "1px solid", borderColor: expandedIdea === idea.id ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)",
                  borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: ts.color, background: ts.bg, padding: "2px 6px", borderRadius: 4 }}>{idea.type}</span>
                        <span style={{ fontSize: 10, color: "#6B6560" }}>{idea.format}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1", marginBottom: 3 }}>{idea.title}</div>
                      <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#6B6560" }}>
                        <span>Effort: <span style={{ color: idea.effort === "Low" ? "#4ADE80" : "#FBBF24" }}>{idea.effort}</span></span>
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

        {/* ============ TRENDING SOUNDS ============ */}
        {activeTab === "trends" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trending in {selectedGenre}</h3>
              <span style={{ fontSize: 11, color: "#6B6560" }}>Updated 2h ago</span>
            </div>
            {TRENDING_SOUNDS.map((sound, i) => (
              <div key={sound.id} onClick={() => setExpandedSound(expandedSound === sound.id ? null : sound.id)} style={{
                background: expandedSound === sound.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                border: "1px solid", borderColor: sound.daysActive <= 2 ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.05)",
                borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6B6560", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                      <PlatformBadge platform={sound.platform} />
                      <MoodTag mood={sound.mood} />
                      {sound.daysActive <= 2 && <span style={{ fontSize: 9, background: "rgba(244,114,182,0.15)", color: "#F472B6", padding: "2px 5px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.04em" }}>EARLY</span>}
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
                        {[12, 18, 25, 35, 52, 78, 100].map((h, j) => (
                          <div key={j} style={{ flex: 1, height: `${h}%`, background: j === 6 ? "#A78BFA" : "rgba(167,139,250,0.3)", borderRadius: "3px 3px 0 0" }} />
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

        {/* ============ CALENDAR ============ */}
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

            {calendar.map((item, i) => {
              const c = typeColors[item.type]
              return (
                <div key={i} onClick={() => toggleCalendar(i)} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: item.done ? "rgba(255,255,255,0.01)" : `${c.bg}44`,
                  border: "1px solid", borderColor: item.done ? "rgba(255,255,255,0.03)" : `${c.dot}22`,
                  borderRadius: 12, padding: "12px 14px", marginBottom: 5,
                  cursor: "pointer", transition: "all 0.15s", opacity: item.done ? 0.5 : 1,
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 5,
                    border: `2px solid ${item.done ? "#4ADE80" : c.dot}`,
                    background: item.done ? "rgba(74,222,128,0.15)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {item.done && <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 700 }}>&#10003;</span>}
                  </div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: item.done ? "#6B6560" : "#E8E6E1", textDecoration: item.done ? "line-through" : "none" }}>
                    {item.task}
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: c.text, opacity: 0.7, minWidth: 28, textAlign: "right" }}>
                    {item.day}
                  </div>
                </div>
              )
            })}

            <div style={{ marginTop: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#A8A49E", marginBottom: 6 }}>Your weekly rhythm</div>
              <div style={{ fontSize: 11, lineHeight: 1.8, color: "#6B6560" }}>
                <span style={{ color: typeColors.create.text }}>Create</span> on Mon/Thu — batch your filming.{" "}
                <span style={{ color: typeColors.post.text }}>Post</span> on Tue/Fri — optimal algorithm windows.{" "}
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

        {/* ============ WAITLIST CTA ============ */}
        <div style={{
          marginTop: 32,
          background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)",
          border: "1px solid rgba(139,92,246,0.15)",
          borderRadius: 16,
          padding: "24px 20px",
          textAlign: "center",
        }}>
          {!submitted ? (
            <>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E6E1", marginBottom: 6 }}>
                Get early access
              </div>
              <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px", lineHeight: 1.6 }}>
                SoundPulse is launching soon. Join the waitlist and be first to know when we go live.
              </p>
              <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#E8E6E1",
                    fontSize: 13,
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                />
                <button type="submit" style={{
                  background: "#7C3AED",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}>
                  Join waitlist
                </button>
              </form>
            </>
          ) : (
            <div>
              <div style={{ fontSize: 24, marginBottom: 8 }}>&#10003;</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#4ADE80", marginBottom: 4 }}>You're on the list</div>
              <p style={{ fontSize: 12, color: "#8B8680", margin: 0 }}>We'll reach out when SoundPulse is ready for you.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
