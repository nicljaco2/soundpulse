'use client'

import { useState, useEffect, useRef } from "react"
import {
  GENRE_OPTIONS, GENRE_META, VIBE_OPTIONS,
  ALL_SOUNDS, ALL_IDEAS, ALL_CALENDARS, ALL_STATS, ALL_ALERTS, ALL_VIDEOS,
  DISCOVERY_TIPS, typeColors, platformColors, moodStyles, ideaTypeStyles,
} from "./data/content"

// ─── useIsMobile hook ─────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])
  return isMobile
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MoodTag({ mood }) {
  const s = moodStyles[mood] || { bg: "#374151", text: "#D1D5DB" }
  return <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, letterSpacing: "0.02em" }}>{mood}</span>
}

function PlatformBadge({ platform }) {
  const color = platformColors[platform] || "#ccc"
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, color }}><span style={{ width: 5, height: 5, borderRadius: 99, background: color }} />{platform}</span>
}

function VideoCard({ video, genreMeta, expanded, onToggle }) {
  const hasThumbnail = !!video.videoId
  const breakdowns = [
    { label: "Hook",              text: video.hook },
    { label: "Format",           text: video.formatBreakdown },
    { label: "Algorithm signals", text: video.algorithmSignals },
    { label: "Steal this",       text: video.stealThis, highlight: true },
  ]
  return (
    <div style={{ marginBottom: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
      {/* Thumbnail / placeholder */}
      <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", textDecoration: "none", flexShrink: 0 }}>
        {hasThumbnail ? (
          <img
            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            alt={video.title}
            style={{ width: "100%", height: 195, objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ height: 160, background: `linear-gradient(135deg, ${genreMeta.color}1A 0%, rgba(10,10,15,0.9) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${genreMeta.color}08 0px, ${genreMeta.color}08 1px, transparent 1px, transparent 12px)` }} />
          </div>
        )}
        {/* SHORT badge */}
        <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,0,0,0.82)", borderRadius: 4, padding: "2px 7px", fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>SHORT</div>
        {/* Play button overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 46, height: 46, borderRadius: 99, background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16, color: "#fff", marginLeft: 3, lineHeight: 1 }}>&#9654;</span>
          </div>
        </div>
      </a>

      {/* Card body */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#E8E6E1", marginBottom: 4, lineHeight: 1.3 }}>{video.title}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#8B8680" }}>{video.creator}</span>
          <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
          <span style={{ fontSize: 11, color: "#6B6560" }}>{video.subs}</span>
          <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
          <span style={{ fontSize: 11, color: "#6B6560" }}>{video.views}</span>
        </div>

        {/* Why this worked toggle */}
        <button
          onClick={onToggle}
          style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: genreMeta.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>Why this worked</span>
          <span style={{ fontSize: 15, color: genreMeta.color, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.15s", lineHeight: 1, display: "inline-block" }}>&#8964;</span>
        </button>

        {expanded && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {breakdowns.map(({ label, text, highlight }) => (
              <div key={label} style={{ marginBottom: 11 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: highlight ? genreMeta.color : "#6B6560", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{label}</div>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.75, color: highlight ? "#D4D0CB" : "#A8A49E" }}>{text}</p>
              </div>
            ))}
            <a
              href={video.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 6, background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,80,80,0.2)", borderRadius: 8, padding: "7px 12px", textDecoration: "none", fontSize: 12, color: "#FC6464", fontWeight: 500 }}
            >
              Watch on YouTube &#8599;
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── YouTube Trending Card ────────────────────────────────────────────────────

function fmtCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

function fmtDur(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

function fmtAgo(iso) {
  const d = Math.floor((Date.now() - new Date(iso)) / 86_400_000)
  if (d === 0) return 'today'
  if (d === 1) return 'yesterday'
  if (d < 7)   return `${d}d ago`
  if (d < 30)  return `${Math.floor(d / 7)}w ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}

function YouTubeTrendingCard({ video, accentColor }) {
  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", textDecoration: "none", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", transition: "border-color 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${accentColor}40`}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        {video.thumbnail
          ? <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
          : <div style={{ height: 180, background: `linear-gradient(135deg, ${accentColor}20 0%, rgba(10,10,15,0.9) 100%)` }} />
        }
        {/* Duration badge */}
        {video.duration > 0 && (
          <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>{fmtDur(video.duration)}</div>
        )}
        {/* Play overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 99, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: "#fff", marginLeft: 3 }}>&#9654;</span>
          </div>
        </div>
        {/* Shorts badge */}
        {video.duration <= 60 && (
          <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,0,0,0.82)", borderRadius: 4, padding: "2px 7px", fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>SHORT</div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "11px 13px 13px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1", lineHeight: 1.4, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{video.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#8B8680", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{video.channel}</span>
          <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
          <span style={{ fontSize: 11, color: "#6B6560" }}>{fmtCount(video.viewCount)} views</span>
          {video.likeCount > 0 && <>
            <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
            <span style={{ fontSize: 11, color: "#6B6560" }}>{fmtCount(video.likeCount)} likes</span>
          </>}
          <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
          <span style={{ fontSize: 11, color: "#6B6560" }}>{fmtAgo(video.publishedAt)}</span>
        </div>
      </div>
    </a>
  )
}

// ─── Spotify Track Lookup ─────────────────────────────────────────────────────

function SpotifyLookup({ genreMeta }) {
  const [query,    setQuery]   = useState("")
  const [results,  setResults] = useState([])
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState(null)
  const [selected, setSelected] = useState(null)

  const KEY_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

  const search = async () => {
    if (!query.trim()) return
    setLoading(true); setError(null); setResults([]); setSelected(null)
    try {
      const res  = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.tracks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const Bar = ({ label, value, color }) => (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: '#A8A49E' }}>{value}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ height: '100%', borderRadius: 99, background: color, width: `${value}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )

  return (
    <div style={{ marginTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: '#1DB954' }} />
        <h3 style={{ fontSize: 12, fontWeight: 500, color: '#8B8680', margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Spotify Track Lookup</h3>
      </div>
      <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 14, lineHeight: 1.6 }}>Search any real track to see live BPM, energy, mood, and audio features from Spotify.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          placeholder="e.g. Blinding Lights The Weeknd"
          style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 13px', color: '#E8E6E1', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
        />
        <button
          onClick={search}
          disabled={loading || !query.trim()}
          style={{ background: loading ? 'rgba(29,185,84,0.15)' : '#1DB954', border: 'none', borderRadius: 10, padding: '10px 16px', color: loading ? '#1DB954' : '#000', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '10px 13px', fontSize: 12, color: '#FCA5A5', marginBottom: 12 }}>
          {error}
        </div>
      )}

      {/* Result list */}
      {results.length > 0 && !selected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {results.map(track => (
            <button
              key={track.id}
              onClick={() => setSelected(track)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}
            >
              {track.albumArt && <img src={track.albumArt} alt={track.album} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#E8E6E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</div>
                <div style={{ fontSize: 11, color: '#6B6560', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.artist}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {track.bpm && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: genreMeta.color }}>{track.bpm} BPM</div>}
                <div style={{ fontSize: 10, color: '#6B6560' }}>Pop {track.popularity}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Expanded track detail */}
      {selected && (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px 0' }}>
            {selected.albumArt && <img src={selected.albumArt} alt={selected.album} style={{ width: 52, height: 52, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#E8E6E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected.title}</div>
              <div style={{ fontSize: 12, color: '#8B8680' }}>{selected.artist}</div>
              <div style={{ fontSize: 11, color: '#6B6560' }}>{selected.album} · {selected.releaseDate?.slice(0, 4)}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 12 }}>
            {[
              { label: 'BPM',        value: selected.bpm ?? '—',       accent: genreMeta.color },
              { label: 'Key',        value: selected.key != null ? `${KEY_NAMES[selected.key]} ${selected.mode ? 'maj' : 'min'}` : '—', accent: '#A8A49E' },
              { label: 'Popularity', value: selected.popularity,        accent: '#FBBF24' },
              { label: 'Mood',       value: selected.mood,              accent: '#F472B6' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '8px 4px' }}>
                <div style={{ fontSize: 9, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: s.accent, overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 14px 14px' }}>
            <Bar label="Energy"            value={selected.energy}       color="#F472B6" />
            <Bar label="Danceability"       value={selected.danceability} color="#A78BFA" />
            <Bar label="Valence (happiness)" value={selected.valence}     color="#4ADE80" />
            <Bar label="Acousticness"       value={selected.acousticness} color="#60A5FA" />
          </div>

          <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
            <a href={selected.spotifyUrl} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.25)', borderRadius: 8, padding: '9px', textDecoration: 'none', fontSize: 12, fontWeight: 500, color: '#1DB954' }}>
              Open in Spotify &#8599;
            </a>
            {selected.previewUrl && (
              <button
                onClick={() => new Audio(selected.previewUrl).play()}
                style={{ flex: 1, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 8, padding: '9px', fontSize: 12, fontWeight: 500, color: '#A78BFA', fontFamily: 'inherit', cursor: 'pointer' }}
              >
                ▶ Preview (30s)
              </button>
            )}
            <button onClick={() => setSelected(null)}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '9px 12px', fontSize: 12, color: '#6B6560', fontFamily: 'inherit', cursor: 'pointer' }}>
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function Home() {
  // Onboarding
  const [screen,        setScreen]        = useState("onboard")
  const [step,          setStep]          = useState(1)
  const [artistName,    setArtistName]    = useState("")
  const [spotifyUrl,    setSpotifyUrl]    = useState("")
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedVibes, setSelectedVibes] = useState([])

  // Dashboard
  const [expandedSound,    setExpandedSound]    = useState(null)
  const [expandedIdea,     setExpandedIdea]     = useState(null)
  const [expandedVideo,    setExpandedVideo]    = useState(null)
  const [activeTab,        setActiveTab]        = useState("brief")
  const [discoveryOpen,    setDiscoveryOpen]    = useState(false)
  const [calendarDone,     setCalendarDone]     = useState({})
  const [email,            setEmail]            = useState("")
  const [submitted,        setSubmitted]        = useState(false)

  // Spotify artist analysis
  const [artistAnalysis, setArtistAnalysis] = useState(null) // null | {loading} | {ok, ...} | {error}

  // AI-generated personalised strategy
  const [aiStrategy, setAiStrategy] = useState(null) // null | {loading} | {ok, sounds, ideas, calendar, alert} | {error}

  // YouTube trending videos
  const [ytTrending,       setYtTrending]       = useState(null)       // null | {loading} | {ok, videos, fetchedAt} | {error}
  const [selectedPlatform, setSelectedPlatform] = useState("youtube")  // "youtube" | "tiktok" | "instagram"

  // Artist name dropdown search
  const [artistDropdown,  setArtistDropdown]  = useState([])   // search results
  const [dropdownOpen,    setDropdownOpen]    = useState(false)
  const [dropdownLoading, setDropdownLoading] = useState(false)
  const artistInputRef = useRef(null)
  const dropdownRef    = useRef(null)

  // Responsive
  const isMobile = useIsMobile()

  // Auto-analyze when a valid Spotify artist URL is pasted
  useEffect(() => {
    const isArtistUrl = /open\.spotify\.com\/artist\/[a-zA-Z0-9]+/.test(spotifyUrl)
    if (!isArtistUrl) { setArtistAnalysis(null); setAiStrategy(null); return }

    let cancelled = false
    setArtistAnalysis({ loading: true })
    setAiStrategy(null)

    fetch(`/api/spotify/artist?url=${encodeURIComponent(spotifyUrl)}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (data.error) {
          setArtistAnalysis({ error: data.error })
        } else {
          setArtistAnalysis({ ok: true, ...data })
          if (!artistName.trim() && data.name) setArtistName(data.name)
          if (data.detectedGenre)              setSelectedGenre(data.detectedGenre)
          if (data.detectedVibes?.length)      setSelectedVibes(data.detectedVibes)

          // Kick off AI strategy generation immediately after Spotify profile loads
          setAiStrategy({ loading: true })
          fetch('/api/ai/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
            .then(r => r.json())
            .then(strategy => {
              if (cancelled) return
              if (strategy.error) {
                setAiStrategy({ error: strategy.error })
              } else {
                setAiStrategy({ ok: true, ...strategy })
                // Claude is the authoritative genre classifier — override the regex result
                if (strategy.genre) setSelectedGenre(strategy.genre)
                if (strategy.vibes?.length) setSelectedVibes(strategy.vibes)
              }
            })
            .catch(err => { if (!cancelled) setAiStrategy({ error: err.message }) })
        }
      })
      .catch(err => { if (!cancelled) setArtistAnalysis({ error: err.message }) })

    return () => { cancelled = true }
  }, [spotifyUrl])

  // Debounced artist name search → dropdown
  useEffect(() => {
    const q = artistName.trim()
    if (q.length < 2 || artistAnalysis?.ok) { setArtistDropdown([]); setDropdownOpen(false); return }

    setDropdownLoading(true)
    const timer = setTimeout(() => {
      fetch(`/api/spotify/artists?q=${encodeURIComponent(q)}`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setArtistDropdown(data)
            setDropdownOpen(true)
          } else {
            setArtistDropdown([])
            setDropdownOpen(false)
          }
        })
        .catch(() => { setArtistDropdown([]); setDropdownOpen(false) })
        .finally(() => setDropdownLoading(false))
    }, 350)

    return () => clearTimeout(timer)
  }, [artistName, artistAnalysis?.ok])

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        artistInputRef.current && !artistInputRef.current.contains(e.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectArtistFromDropdown = (artist) => {
    setArtistName(artist.name)
    setSpotifyUrl(artist.spotifyUrl) // triggers auto-analysis via existing useEffect
    setDropdownOpen(false)
    setArtistDropdown([])
  }

  // Fetch YouTube trending whenever genre or AI region info changes
  useEffect(() => {
    if (!selectedGenre || screen !== "dashboard") return
    let cancelled = false
    setYtTrending({ loading: true })

    const region   = aiStrategy?.ok && aiStrategy.region   ? aiStrategy.region   : null
    const language = aiStrategy?.ok && aiStrategy.language ? aiStrategy.language : null

    const url = new URL('/api/youtube/trending', window.location.origin)
    url.searchParams.set('genre', selectedGenre)
    if (region)   url.searchParams.set('region',   region)
    if (language) url.searchParams.set('language', language)

    fetch(url.toString())
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (data.error) setYtTrending({ error: data.error })
        else setYtTrending({ ok: true, videos: data.videos, fetchedAt: data.fetchedAt, region: data.regionCode, language: data.language })
      })
      .catch(err => { if (!cancelled) setYtTrending({ error: err.message }) })
    return () => { cancelled = true }
  }, [selectedGenre, screen, aiStrategy?.ok])

  const launchDashboard = () => { setScreen("dashboard"); setActiveTab("brief"); setExpandedSound(null); setExpandedIdea(null); setExpandedVideo(null) }
  const editProfile     = () => { setScreen("onboard"); setStep(1) }
  const toggleVibe      = (v) => setSelectedVibes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  const toggleCalendar  = (i) => setCalendarDone(prev => ({ ...prev, [i]: !prev[i] }))
  const handleWaitlist  = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setSubmitted(true)
      else console.error('Waitlist error:', await res.json())
    } catch (err) {
      console.error('Waitlist fetch failed:', err)
    }
  }

  const Logo = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#A78BFA", letterSpacing: "-0.02em" }}>SoundPulse</span>
      <span style={{ fontSize: 9, background: "rgba(167,139,250,0.15)", color: "#A78BFA", padding: "2px 6px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.04em" }}>BETA</span>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // ONBOARDING
  // ══════════════════════════════════════════════════════════════════════════

  if (screen === "onboard") {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", padding: "0 20px", display: "flex", flexDirection: "column" }}>
        <div style={{ paddingTop: 40, paddingBottom: 10, textAlign: "center" }}>
          <Logo />
          <p style={{ fontSize: 13, color: "#6B6560", marginTop: 6, marginBottom: 0 }}>Your weekly marketing strategist</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, paddingTop: 28, paddingBottom: 36 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ height: 5, borderRadius: 99, width: s === step ? 24 : 6, background: s < step ? "rgba(167,139,250,0.5)" : s === step ? "#A78BFA" : "rgba(255,255,255,0.1)", transition: "all 0.2s" }} />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#E8E6E1", marginBottom: 8, lineHeight: 1.3 }}>What{"'"}s your artist name?</h2>
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: 28, lineHeight: 1.6 }}>Start typing and select your Spotify profile — we{"'"}ll detect your genre and vibe automatically.</p>

            {/* Artist name input + dropdown */}
            <div style={{ position: "relative", marginBottom: 10 }}>
              <div style={{ position: "relative" }}>
                <input
                  ref={artistInputRef}
                  type="text"
                  placeholder="Your artist or project name"
                  value={artistName}
                  autoFocus
                  onChange={e => {
                    setArtistName(e.target.value)
                    // If user edits after selecting from dropdown, clear analysis
                    if (artistAnalysis?.ok && e.target.value !== artistAnalysis.name) {
                      setArtistAnalysis(null)
                      setSpotifyUrl("")
                    }
                  }}
                  onKeyDown={e => e.key === "Escape" && setDropdownOpen(false)}
                  onFocus={() => artistDropdown.length > 0 && setDropdownOpen(true)}
                  style={{ display: "block", width: "100%", background: artistAnalysis?.ok ? "rgba(29,185,84,0.06)" : "rgba(255,255,255,0.04)", border: `1px solid ${artistAnalysis?.ok ? "rgba(29,185,84,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: dropdownOpen ? "12px 12px 0 0" : 12, padding: "14px 44px 14px 16px", color: "#E8E6E1", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                />
                <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>
                  {artistAnalysis?.loading && <span style={{ color: "#6B6560", animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>}
                  {dropdownLoading && !artistAnalysis?.loading && <span style={{ color: "#6B6560", fontSize: 13 }}>⟳</span>}
                  {artistAnalysis?.ok      && <span style={{ color: "#1DB954" }}>✓</span>}
                  {artistAnalysis?.error   && <span style={{ color: "#F87171" }}>✗</span>}
                </div>
              </div>

              {/* Dropdown */}
              {dropdownOpen && artistDropdown.length > 0 && (
                <div
                  ref={dropdownRef}
                  style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1A1A22", border: "1px solid rgba(255,255,255,0.12)", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden", zIndex: 100, boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}
                >
                  {artistDropdown.map((artist, i) => (
                    <button
                      key={artist.id}
                      onMouseDown={e => { e.preventDefault(); selectArtistFromDropdown(artist) }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: "none", border: "none", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "10px 14px", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      {artist.image
                        ? <img src={artist.image} alt={artist.name} style={{ width: 36, height: 36, borderRadius: 99, objectFit: "cover", flexShrink: 0 }} />
                        : <div style={{ width: 36, height: 36, borderRadius: 99, background: "rgba(255,255,255,0.08)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#6B6560" }}>{artist.name[0]}</div>
                      }
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{artist.name}</div>
                        <div style={{ fontSize: 11, color: "#6B6560" }}>
                          {artist.followers >= 1_000_000
                            ? (artist.followers / 1_000_000).toFixed(1) + "M followers"
                            : artist.followers >= 1_000
                            ? (artist.followers / 1_000).toFixed(0) + "K followers"
                            : artist.followers + " followers"}
                          {artist.genres?.[0] && <span> · {artist.genres[0]}</span>}
                        </div>
                      </div>
                      <div style={{ marginLeft: "auto", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: "#1DB954", background: "rgba(29,185,84,0.1)", padding: "2px 7px", borderRadius: 99, fontWeight: 500 }}>Select</span>
                      </div>
                    </button>
                  ))}
                  <div style={{ padding: "7px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 10, color: "#4B4540" }}>Not you?</span>
                    <button
                      onMouseDown={e => { e.preventDefault(); setDropdownOpen(false); setArtistDropdown([]) }}
                      style={{ fontSize: 10, color: "#7C3AED", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
                    >Continue without Spotify</button>
                  </div>
                </div>
              )}
            </div>

            {/* Spotify profile card */}
            {artistAnalysis?.ok && (
              <div style={{ background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  {artistAnalysis.image && <img src={artistAnalysis.image} alt={artistAnalysis.name} style={{ width: 40, height: 40, borderRadius: 99, objectFit: "cover" }} />}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{artistAnalysis.name}</div>
                    <div style={{ fontSize: 11, color: "#6B6560" }}>{artistAnalysis.followers?.toLocaleString()} followers · {artistAnalysis.popularity} popularity</div>
                  </div>
                  {/* AI analysis in progress */}
                  {aiStrategy?.loading && (
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#A78BFA", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                      <span style={{ animation: "spin 1.2s linear infinite", display: "inline-block" }}>⟳</span> Analysing sound…
                    </span>
                  )}
                </div>

                {/* AI-confirmed genre + vibes */}
                {(aiStrategy?.ok ? aiStrategy.genre : artistAnalysis.detectedGenre) && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {aiStrategy?.ok ? "AI-classified genre" : "Detected genre"}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: aiStrategy?.ok ? "#A78BFA" : "#1DB954", background: aiStrategy?.ok ? "rgba(167,139,250,0.1)" : "rgba(29,185,84,0.1)", padding: "2px 10px", borderRadius: 99 }}>
                      {aiStrategy?.ok ? aiStrategy.genre : artistAnalysis.detectedGenre}
                    </span>
                  </div>
                )}
                {((aiStrategy?.ok ? aiStrategy.vibes : artistAnalysis.detectedVibes) ?? []).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {(aiStrategy?.ok ? aiStrategy.vibes : artistAnalysis.detectedVibes).map(v => (
                      <span key={v} style={{ fontSize: 11, color: "#A78BFA", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", padding: "2px 8px", borderRadius: 99 }}>{v}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* AI ready — launch dashboard shortcut */}
            {aiStrategy?.ok && aiStrategy.genre && (
              <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => { setSelectedGenre(aiStrategy.genre); setSelectedVibes(aiStrategy.vibes ?? []); launchDashboard() }}
                  style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #7C3AED, #6D28D9)", border: "none", borderRadius: 12, padding: "15px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Launch my dashboard ✦
                </button>
                <button
                  onClick={() => setStep(2)}
                  style={{ display: "block", width: "100%", background: "none", border: "none", padding: "10px", color: "#6B6560", fontSize: 12, fontFamily: "inherit", cursor: "pointer", marginTop: 4 }}
                >
                  Customise genre & vibes instead
                </button>
              </div>
            )}

            {/* Analysis error */}
            {artistAnalysis?.error && (
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#FCA5A5", lineHeight: 1.5 }}>Couldn{"'"}t analyze this profile — you{"'"}ll pick your genre and vibe manually on the next steps.</p>
              </div>
            )}

            {/* Default continue button — shown when AI isn't ready or no Spotify profile */}
            {!aiStrategy?.ok && (
              <>
                <div style={{ height: 24 }} />
                <button
                  onClick={() => artistName.trim() && setStep(2)}
                  disabled={!artistName.trim() || artistAnalysis?.loading}
                  style={{ display: "block", width: "100%", background: (artistName.trim() && !artistAnalysis?.loading) ? "#7C3AED" : "rgba(124,58,237,0.25)", border: "none", borderRadius: 12, padding: "15px", color: (artistName.trim() && !artistAnalysis?.loading) ? "#fff" : "#6B6560", fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: (artistName.trim() && !artistAnalysis?.loading) ? "pointer" : "not-allowed", transition: "all 0.15s" }}
                >
                  {artistAnalysis?.loading ? "Analyzing your music…" : aiStrategy?.loading ? "Crafting your strategy…" : "Continue"}
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#E8E6E1", marginBottom: 8, lineHeight: 1.3 }}>What{"'"}s your genre?</h2>
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: artistAnalysis?.ok && artistAnalysis?.detectedGenre ? 10 : 22, lineHeight: 1.6 }}>This determines which trending sounds and content ideas we surface for you.</p>
            {artistAnalysis?.ok && artistAnalysis?.detectedGenre && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 10, padding: "8px 12px" }}>
                <span style={{ fontSize: 14 }}>✦</span>
                <span style={{ fontSize: 12, color: "#86EFAC" }}>Auto-detected from your Spotify — confirm or change below</span>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
              {GENRE_OPTIONS.map(g => {
                const meta = GENRE_META[g]; const active = selectedGenre === g
                return (
                  <button key={g} onClick={() => setSelectedGenre(g)} style={{ background: active ? meta.bg : "rgba(255,255,255,0.03)", border: "1px solid", borderColor: active ? meta.border : "rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: active ? meta.color : "#E8E6E1", marginBottom: 4 }}>{g}</div>
                    <div style={{ fontSize: 11, color: active ? meta.color : "#6B6560", opacity: active ? 0.85 : 1 }}>{meta.desc}</div>
                  </button>
                )
              })}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "13px", color: "#8B8680", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>Back</button>
              <button onClick={() => selectedGenre && setStep(3)} disabled={!selectedGenre} style={{ flex: 2, background: selectedGenre ? "#7C3AED" : "rgba(124,58,237,0.25)", border: "none", borderRadius: 12, padding: "13px", color: selectedGenre ? "#fff" : "#6B6560", fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: selectedGenre ? "pointer" : "not-allowed", transition: "all 0.15s" }}>Continue</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#E8E6E1", marginBottom: 8, lineHeight: 1.3 }}>Describe your sound</h2>
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: artistAnalysis?.ok && artistAnalysis?.detectedVibes?.length ? 10 : 22, lineHeight: 1.6 }}>Pick any words that fit. These help tailor your strategy. You can skip this step.</p>
            {artistAnalysis?.ok && artistAnalysis?.detectedVibes?.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 10, padding: "8px 12px" }}>
                <span style={{ fontSize: 14 }}>✦</span>
                <span style={{ fontSize: 12, color: "#86EFAC" }}>Vibes auto-detected from your Spotify — remove or add more below</span>
              </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {VIBE_OPTIONS.map(v => {
                const active = selectedVibes.includes(v)
                return <button key={v} onClick={() => toggleVibe(v)} style={{ background: active ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid", borderColor: active ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)", borderRadius: 99, padding: "8px 15px", color: active ? "#C4B5FD" : "#8B8680", fontSize: 13, fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s" }}>{v}</button>
              })}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "13px", color: "#8B8680", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>Back</button>
              <button onClick={launchDashboard} style={{ flex: 2, background: "#7C3AED", border: "none", borderRadius: 12, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: "pointer" }}>Generate my dashboard</button>
            </div>
          </div>
        )}
        <div style={{ height: 40 }} />
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ══════════════════════════════════════════════════════════════════════════

  // Use AI-generated content when ready, fall back to static data
  const sounds        = aiStrategy?.ok ? aiStrategy.sounds        : ALL_SOUNDS[selectedGenre]
  const ideas         = aiStrategy?.ok ? aiStrategy.ideas         : ALL_IDEAS[selectedGenre]
  const alert         = aiStrategy?.ok ? aiStrategy.alert         : ALL_ALERTS[selectedGenre]
  const calendarItems = aiStrategy?.ok ? aiStrategy.calendar      : ALL_CALENDARS[selectedGenre]
  const stats         = ALL_STATS[selectedGenre]
  const videos        = ALL_VIDEOS[selectedGenre]
  const discTips      = DISCOVERY_TIPS[selectedGenre]
  const genreMeta     = GENRE_META[selectedGenre]
  const initials      = artistName.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)

  const tabs = [
    { id: "brief",    label: "Brief"    },
    { id: "sounds",   label: "Sounds"   },
    { id: "videos",   label: "Videos"   },
    { id: "calendar", label: "Calendar" },
  ]

  // ── Computed live stat values (shared between sidebar and briefSection) ──
  const liveFollowers = artistAnalysis?.followers != null
    ? artistAnalysis.followers >= 1_000_000
      ? (artistAnalysis.followers / 1_000_000).toFixed(1) + "M"
      : artistAnalysis.followers >= 1_000
      ? (artistAnalysis.followers / 1_000).toFixed(1) + "K"
      : String(artistAnalysis.followers)
    : stats.followers
  const livePopularity = artistAnalysis?.popularity != null
    ? artistAnalysis.popularity + " / 100"
    : stats.monthlyListeners

  // ── Shared section JSX ────────────────────────────────────────────────────

  const briefSection = (
    <div>
      {/* Stats — mobile only */}
      {isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            {
              label:  "Followers",
              value:  liveFollowers,
              change: artistAnalysis?.followers != null ? "Spotify" : stats.followersChange,
              live:   artistAnalysis?.followers != null,
            },
            {
              label:  "Popularity",
              value:  livePopularity,
              change: artistAnalysis?.popularity != null ? "Spotify score" : stats.listenersChange,
              live:   artistAnalysis?.popularity != null,
            },
            {
              label:  "Playlist reach",
              value:  stats.playlistReach,
              change: stats.playlistChange,
              live:   false,
            },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.live ? "rgba(29,185,84,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "12px 10px" }}>
              <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 4, letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 4 }}>
                {s.label}
                {s.live && <span style={{ width: 4, height: 4, borderRadius: 99, background: "#1DB954", display: "inline-block" }} />}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#E8E6E1" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: s.live ? "#1DB954" : "#4ADE80", marginTop: 3 }}>{s.change}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hot opportunity — mobile only */}
      {isMobile && (
        <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "#F472B6", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: "#F9A8D4", letterSpacing: "0.04em", textTransform: "uppercase" }}>Hot opportunity</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D4D0CB" }}>
            <strong style={{ color: "#E8E6E1" }}>{alert.title}</strong> — {alert.stat}. {alert.desc}
          </p>
        </div>
      )}

      {/* Discovery mechanics — both layouts */}
      <div style={{ marginBottom: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
        <button onClick={() => setDiscoveryOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "13px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#60A5FA" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#A8A49E" }}>How discovery actually works</span>
          </div>
          <span style={{ fontSize: 15, color: "#6B6560", transform: discoveryOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s", lineHeight: 1, display: "inline-block" }}>&#8964;</span>
        </button>
        {discoveryOpen && (
          <div style={{ padding: "0 14px 14px" }}>
            {/* Funnel */}
            <div style={{ display: "flex", alignItems: "stretch", gap: 3, marginBottom: 16 }}>
              {[
                { label: "Test pool", sub: "~500 accounts", color: "#60A5FA" },
                { label: "Watch time", sub: "≥55% avg", color: "#A78BFA" },
                { label: "Wider push", sub: "10K–50K", color: "#F472B6" },
                { label: "Non-followers", sub: "followers irrelevant", color: "#4ADE80" },
              ].map((stage, i, arr) => (
                <div key={stage.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <div style={{ width: "100%", background: stage.color + "18", border: `1px solid ${stage.color}30`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: stage.color, marginBottom: 2, lineHeight: 1.2 }}>{stage.label}</div>
                    <div style={{ fontSize: 9, color: "#6B6560", lineHeight: 1.3 }}>{stage.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ fontSize: 12, color: "#3A3530", alignSelf: "center", position: "relative", top: -22, left: "calc(50% + 10px)" }}>&#8250;</div>
                  )}
                </div>
              ))}
            </div>
            {/* Platform tips */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {discTips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, color: "#60A5FA", marginTop: 3, flexShrink: 0 }}>&#8250;</span>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "#8B8680" }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ideas — both layouts */}
      <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: "0 0 12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>This week{"'"}s content ideas</h3>
      {ideas.map(idea => {
        const ts = ideaTypeStyles[idea.type] || ideaTypeStyles["Evergreen"]
        const open = expandedIdea === idea.id
        return (
          <div key={idea.id} onClick={() => setExpandedIdea(open ? null : idea.id)} style={{ background: open ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid", borderColor: open ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s" }}>
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
              <span style={{ fontSize: 18, color: "#6B6560", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", lineHeight: 1 }}>&#8964;</span>
            </div>
            {open && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.7, color: "#A8A49E" }}>{idea.description}</p>
                {idea.timing && <div style={{ background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 8, padding: "7px 10px", marginBottom: 10, fontSize: 11, color: "#F9A8D4" }}>{idea.timing}</div>}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{idea.tags.map(tag => <span key={tag} style={{ fontSize: 10, color: "#8B8680", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 99 }}>{tag}</span>)}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  const soundsSection = (
    <div style={{ display: isMobile ? "block" : "grid", gridTemplateColumns: isMobile ? undefined : "1fr 360px", gap: isMobile ? undefined : 32, alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trending in {selectedGenre}</h3>
          <span style={{ fontSize: 11, color: "#6B6560" }}>Updated 2h ago</span>
        </div>
        {sounds.map((sound, i) => {
          const open = expandedSound === sound.id
          return (
            <div key={sound.id} onClick={() => setExpandedSound(open ? null : sound.id)} style={{ background: open ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid", borderColor: sound.daysActive <= 2 ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s" }}>
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
              {open && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11, color: "#8B8680" }}><span>{sound.bpm} BPM</span><span>Hook: {sound.hook}</span></div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 5 }}>7-day growth</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
                      {[12, 18, 25, 35, 52, 78, 100].map((h, j) => <div key={j} style={{ flex: 1, height: h + "%", background: j === 6 ? "#A78BFA" : "rgba(167,139,250,0.3)", borderRadius: "3px 3px 0 0" }} />)}
                    </div>
                  </div>
                  <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 500, color: "#A78BFA", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>How to use this for YOUR music</div>
                    <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "#C4B5FD" }}>{sound.suggestion}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {isMobile && <SpotifyLookup genreMeta={genreMeta} />}
      </div>
      {!isMobile && (
        <div style={{ position: "sticky", top: 40 }}>
          <SpotifyLookup genreMeta={genreMeta} />
        </div>
      )}
    </div>
  )

  const ytFetchedAgo = ytTrending?.fetchedAt
    ? (() => {
        const mins = Math.round((Date.now() - ytTrending.fetchedAt) / 60_000)
        if (mins < 2)   return "just now"
        if (mins < 60)  return `${mins}m ago`
        return `${Math.floor(mins / 60)}h ago`
      })()
    : null

  const PLATFORMS = [
    { id: "youtube",   label: "YouTube Shorts", color: "#FF0000", dot: "#FF4444" },
    { id: "tiktok",    label: "TikTok",         color: "#69C9D0", dot: "#69C9D0" },
    { id: "instagram", label: "Instagram Reels", color: "#E1306C", dot: "#E1306C" },
  ]

  const videosSection = (
    <div>
      {/* ── Platform picker ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {PLATFORMS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPlatform(p.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: selectedPlatform === p.id ? `${p.dot}18` : "rgba(255,255,255,0.03)",
              border: `1px solid ${selectedPlatform === p.id ? p.dot + "60" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 99, padding: "6px 14px",
              color: selectedPlatform === p.id ? p.color : "#6B6560",
              fontSize: 12, fontWeight: selectedPlatform === p.id ? 600 : 400,
              fontFamily: "inherit", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: selectedPlatform === p.id ? p.dot : "#3A3530", flexShrink: 0 }} />
            {p.label}
          </button>
        ))}
        {/* Region tag */}
        {ytTrending?.region && selectedPlatform === "youtube" && (
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#4B4540", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 99, padding: "4px 10px" }}>
            {ytTrending.region}{ytTrending.language ? ` · ${ytTrending.language}` : ""}
          </span>
        )}
      </div>

      {/* ── YouTube Shorts ── */}
      {selectedPlatform === "youtube" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Trending Shorts — {selectedGenre}
              </h3>
              {ytTrending?.ok && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#4B7C59", background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.15)", borderRadius: 99, padding: "1px 7px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: "#1DB954", display: "inline-block" }} />live · last 14 days
                </span>
              )}
            </div>
            {ytFetchedAgo && <span style={{ fontSize: 10, color: "#4B4540" }}>updated {ytFetchedAgo}</span>}
          </div>
          <p style={{ fontSize: 12, color: "#6B6560", marginBottom: 16, lineHeight: 1.6 }}>
            Short-form videos posted in the last 14 days gaining the most traction in your genre{ytTrending?.region ? ` (${ytTrending.region})` : ""}.
          </p>

          {ytTrending?.loading && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ height: 180, background: "rgba(255,255,255,0.03)", animation: "pulse 1.5s ease-in-out infinite" }} />
                  <div style={{ padding: "11px 13px 13px" }}>
                    <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.05)", marginBottom: 8, width: "80%" }} />
                    <div style={{ height: 10, borderRadius: 6, background: "rgba(255,255,255,0.04)", width: "55%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {ytTrending?.error && (
            <div style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 12, padding: "12px 16px" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#FCA5A5", lineHeight: 1.5 }}>
                {ytTrending.error.includes('not configured')
                  ? 'YouTube API key not set up yet — add YOUTUBE_API_KEY to .env.local to enable live trending.'
                  : `Couldn't load trending videos: ${ytTrending.error}`}
              </p>
            </div>
          )}

          {ytTrending?.ok && ytTrending.videos?.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 32 }}>
              {ytTrending.videos.map(video => (
                <YouTubeTrendingCard key={video.id} video={video} accentColor={genreMeta.color} />
              ))}
            </div>
          )}

          {ytTrending?.ok && ytTrending.videos?.length === 0 && (
            <p style={{ fontSize: 12, color: "#6B6560", marginBottom: 32 }}>No shorts found in the last 14 days — the window is tight. Try checking back tomorrow.</p>
          )}

          {/* Curated Deep Dives */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Curated Deep Dives</h3>
              <span style={{ fontSize: 10, color: "#4B4540", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 99, padding: "1px 7px" }}>Editor{"'"}s picks</span>
            </div>
            <p style={{ fontSize: 12, color: "#6B6560", marginBottom: 16, lineHeight: 1.6 }}>Hand-picked examples with a breakdown of exactly why they worked — and how to steal the strategy.</p>
            <div style={{ display: isMobile ? "block" : "grid", gridTemplateColumns: isMobile ? undefined : "1fr 1fr", gap: isMobile ? undefined : 16 }}>
              {videos.map(video => (
                <VideoCard
                  key={video.id}
                  video={video}
                  genreMeta={genreMeta}
                  expanded={expandedVideo === video.id}
                  onToggle={() => setExpandedVideo(expandedVideo === video.id ? null : video.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TikTok placeholder ── */}
      {selectedPlatform === "tiktok" && (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🎵</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#E8E6E1", marginBottom: 8 }}>TikTok coming soon</div>
          <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.7, maxWidth: 340, margin: "0 auto 20px" }}>
            TikTok{"'"}s Research API requires an approved developer application and is restricted to academic/enterprise use. We{"'"}re evaluating third-party data partners to unlock this.
          </p>
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, textAlign: "left", background: "rgba(105,201,208,0.06)", border: "1px solid rgba(105,201,208,0.15)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#69C9D0", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>What{"'"}s available today</div>
            {["Trending sound suggestions (AI-generated, Sounds tab)", "Platform-specific content ideas in the Brief tab", "YouTube Shorts as a Reels-equivalent proxy"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#8B8680" }}>
                <span style={{ color: "#69C9D0", flexShrink: 0 }}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Instagram placeholder ── */}
      {selectedPlatform === "instagram" && (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📸</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#E8E6E1", marginBottom: 8 }}>Instagram Reels coming soon</div>
          <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.7, maxWidth: 340, margin: "0 auto 20px" }}>
            Meta{"'"}s Instagram Graph API only exposes content from accounts you manage — there{"'"}s no public endpoint for searching trending Reels. Unlocking this requires a paid third-party data provider.
          </p>
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, textAlign: "left", background: "rgba(225,48,108,0.06)", border: "1px solid rgba(225,48,108,0.15)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#E1306C", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Roadmap options</div>
            {["RapidAPI Instagram scraper (~$30–50/mo)", "Apify Instagram actor (~$0.25 / 1,000 results)", "Chartmetric API (enterprise pricing)"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#8B8680" }}>
                <span style={{ color: "#E1306C", flexShrink: 0 }}>→</span>{item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const calendarSection = (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Week of April 7–13</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(typeColors).map(([type, c]) => (
            <span key={type} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: c.text }}>
              <span style={{ width: 5, height: 5, borderRadius: 99, background: c.dot }} />{type}
            </span>
          ))}
        </div>
      </div>
      {calendarItems.map((item, i) => {
        const c = typeColors[item.type]; const done = !!calendarDone[i]
        return (
          <div key={i} onClick={() => toggleCalendar(i)} style={{ display: "flex", alignItems: "center", gap: 12, background: done ? "rgba(255,255,255,0.01)" : c.bg + "44", border: "1px solid", borderColor: done ? "rgba(255,255,255,0.03)" : c.dot + "22", borderRadius: 12, padding: "12px 14px", marginBottom: 5, cursor: "pointer", transition: "all 0.15s", opacity: done ? 0.5 : 1 }}>
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
  )

  const waitlistSection = (
    <div style={{ marginTop: 32, background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
      {!submitted ? (
        <>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E6E1", marginBottom: 6 }}>Get early access</div>
          <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px", lineHeight: 1.6 }}>SoundPulse is launching soon. Join the waitlist and be first to know when we go live.</p>
          <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 8 }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ flex: 1, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            <button type="submit" style={{ background: "#7C3AED", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>Join waitlist</button>
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
  )

  // ── Desktop layout ────────────────────────────────────────────────────────

  if (!isMobile) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0F", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* Sidebar */}
        <aside style={{
          width: 260, flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 20px",
          display: "flex", flexDirection: "column",
          position: "sticky", top: 0, height: "100vh", overflowY: "auto",
          background: "rgba(255,255,255,0.01)",
        }}>
          {/* Logo + Edit button */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <Logo />
            <button onClick={editProfile} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 10px", color: "#8B8680", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>Edit</button>
          </div>

          {/* Artist photo + name + genre + vibes */}
          <div style={{ marginBottom: 20 }}>
            {artistAnalysis?.image ? (
              <img src={artistAnalysis.image} alt={artistName} style={{ width: 56, height: 56, borderRadius: 99, objectFit: "cover", border: `2px solid ${genreMeta.color}50`, marginBottom: 12, display: "block" }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: 99, background: `linear-gradient(135deg, ${genreMeta.color} 0%, #4C1D95 100%)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#fff" }}>{initials}</span>
              </div>
            )}
            <div style={{ fontSize: 15, fontWeight: 700, color: "#E8E6E1", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{artistName}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: genreMeta.color, background: genreMeta.bg, border: `1px solid ${genreMeta.border}`, padding: "2px 9px", borderRadius: 99, fontWeight: 500 }}>{selectedGenre}</span>
              {spotifyUrl && (
                <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 6, padding: "2px 7px", textDecoration: "none" }}>
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: "#1DB954" }} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: "#1DB954" }}>Spotify</span>
                </a>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {selectedVibes.slice(0, 4).map(v => <span key={v} style={{ fontSize: 10, color: "#8B8680", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 99 }}>{v}</span>)}
            </div>
          </div>

          {/* Live stats */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Followers",     value: liveFollowers,  live: artistAnalysis?.followers != null },
              { label: "Popularity",    value: livePopularity, live: artistAnalysis?.popularity != null },
              { label: "Playlist reach", value: stats.playlistReach, live: false },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#6B6560", display: "flex", alignItems: "center", gap: 4 }}>
                  {s.label}
                  {s.live && <span style={{ width: 4, height: 4, borderRadius: 99, background: "#1DB954", display: "inline-block" }} />}
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: s.live ? "#1DB954" : "#E8E6E1" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Nav */}
          <nav style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 20, display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: activeTab === t.id ? `${genreMeta.color}15` : "transparent", border: "none", borderLeft: activeTab === t.id ? `2px solid ${genreMeta.color}` : "2px solid transparent", borderRadius: activeTab === t.id ? "0 10px 10px 0" : 10, padding: "10px 14px", color: activeTab === t.id ? genreMeta.color : "#6B6560", fontSize: 14, fontWeight: activeTab === t.id ? 600 : 400, fontFamily: "inherit", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}>
                {t.label}
              </button>
            ))}
          </nav>

          {/* Alert — pushes to bottom */}
          <div style={{ marginTop: "auto", background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.18)", borderRadius: 12, padding: "14px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: "#F472B6" }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#F9A8D4", textTransform: "uppercase", letterSpacing: "0.06em" }}>Hot right now</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E6E1", marginBottom: 4, lineHeight: 1.3 }}>{alert.title}</div>
            <div style={{ fontSize: 11, color: "#8B8680", lineHeight: 1.5 }}>{alert.stat}</div>
          </div>
        </aside>

        {/* Main content area */}
        <main style={{ flex: 1, overflowY: "auto", height: "100vh" }}>
          <div style={{ maxWidth: 900, padding: "40px 48px" }}>
            {/* AI personalisation status banner */}
            {aiStrategy?.loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 12, padding: "10px 16px", marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: "#6B6560", animation: "spin 1.2s linear infinite", display: "inline-block", flexShrink: 0 }}>⟳</span>
                <span style={{ fontSize: 12, color: "#A78BFA" }}>Analysing your sound and crafting a personalised strategy…</span>
              </div>
            )}
            {aiStrategy?.ok && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 12, padding: "8px 14px", marginBottom: 20 }}>
                <span style={{ fontSize: 12 }}>✦</span>
                <span style={{ fontSize: 12, color: "#A78BFA" }}>Dashboard personalised for <strong style={{ color: "#E8E6E1" }}>{artistName}</strong> — sounds, ideas, and calendar generated from your Spotify profile</span>
              </div>
            )}
            {activeTab === "brief"    && briefSection}
            {activeTab === "sounds"   && soundsSection}
            {activeTab === "videos"   && videosSection}
            {activeTab === "calendar" && calendarSection}
            {waitlistSection}
          </div>
        </main>
      </div>
    )
  }

  // ── Mobile layout ─────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Logo />
          <button onClick={editProfile} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 12px", color: "#8B8680", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>Edit profile</button>
        </div>

        {/* Artist card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {artistAnalysis?.image ? (
              <img src={artistAnalysis.image} alt={artistName} style={{ width: 44, height: 44, borderRadius: 99, objectFit: "cover", flexShrink: 0, border: `1px solid ${genreMeta.color}40` }} />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: 99, background: `linear-gradient(135deg, ${genreMeta.color} 0%, #4C1D95 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#fff" }}>{initials}</span>
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#E8E6E1", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{artistName}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: genreMeta.color, background: genreMeta.bg, border: `1px solid ${genreMeta.border}`, padding: "1px 8px", borderRadius: 99, fontWeight: 500 }}>{selectedGenre}</span>
                {selectedVibes.slice(0, 3).map(v => <span key={v} style={{ fontSize: 10, color: "#8B8680", background: "rgba(255,255,255,0.04)", padding: "1px 7px", borderRadius: 99 }}>{v}</span>)}
                {selectedVibes.length > 3 && <span style={{ fontSize: 10, color: "#6B6560" }}>+{selectedVibes.length - 3}</span>}
              </div>
            </div>
            {spotifyUrl && (
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 7, padding: "4px 9px", textDecoration: "none", flexShrink: 0 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "#1DB954" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#1DB954" }}>Spotify</span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, background: "none", border: "none", padding: "10px 4px", fontSize: 12, fontWeight: activeTab === t.id ? 600 : 400, color: activeTab === t.id ? "#A78BFA" : "#6B6560", cursor: "pointer", borderBottom: activeTab === t.id ? "2px solid #A78BFA" : "2px solid transparent", fontFamily: "inherit", transition: "all 0.15s", letterSpacing: "0.01em" }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div style={{ padding: "20px 20px 40px" }}>
        {/* AI personalisation status banner */}
        {aiStrategy?.loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "#6B6560", animation: "spin 1.2s linear infinite", display: "inline-block", flexShrink: 0 }}>⟳</span>
            <span style={{ fontSize: 12, color: "#A78BFA" }}>Analysing your sound and crafting a personalised strategy…</span>
          </div>
        )}
        {aiStrategy?.ok && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 12, padding: "8px 12px", marginBottom: 16 }}>
            <span style={{ fontSize: 11 }}>✦</span>
            <span style={{ fontSize: 11, color: "#A78BFA" }}>Personalised for <strong style={{ color: "#E8E6E1" }}>{artistName}</strong></span>
          </div>
        )}
        {activeTab === "brief"    && briefSection}
        {activeTab === "sounds"   && soundsSection}
        {activeTab === "videos"   && videosSection}
        {activeTab === "calendar" && calendarSection}
        {waitlistSection}
      </div>
    </div>
  )
}
