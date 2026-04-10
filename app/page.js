'use client'

import { useState } from "react"

// ─── Genre config ─────────────────────────────────────────────────────────────

const GENRE_OPTIONS = ["Indie Pop", "Hip-Hop", "Electronic", "R&B", "Alt Rock", "Lo-Fi"]

const GENRE_META = {
  "Indie Pop":  { color: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.28)", desc: "guitar · atmosphere · dreamy" },
  "Hip-Hop":    { color: "#FBBF24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.28)",  desc: "bars · beats · culture" },
  "Electronic": { color: "#22D3EE", bg: "rgba(34,211,238,0.12)",  border: "rgba(34,211,238,0.28)",  desc: "synths · production · drops" },
  "R&B":        { color: "#F472B6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.28)", desc: "soul · groove · vocals" },
  "Alt Rock":   { color: "#F87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.28)", desc: "riffs · energy · raw" },
  "Lo-Fi":      { color: "#86EFAC", bg: "rgba(134,239,172,0.12)", border: "rgba(134,239,172,0.28)", desc: "chill · beats · texture" },
}

const VIBE_OPTIONS = [
  "groovy", "dreamy", "atmospheric", "energetic", "raw / DIY",
  "guitar-driven", "synth-heavy", "psychedelic", "lo-fi", "danceable",
  "introspective", "vocal-forward", "upbeat", "experimental", "spacey",
]

// ─── Sounds ───────────────────────────────────────────────────────────────────

const ALL_SOUNDS = {
  "Indie Pop": [
    { id: 1, title: "Velvet Haze", artist: "poolboy", platform: "TikTok", videos: "284K", growth: "+1,240%", daysActive: 3, mood: "dreamy", bpm: 98, hook: "0:14–0:28 chorus drop", suggestion: "Use the 14-sec chorus hook over a 'day in my life' aesthetic — golden hour lighting, slow motion transitions" },
    { id: 2, title: "Static Love", artist: "NIKA", platform: "Reels", videos: "156K", growth: "+680%", daysActive: 5, mood: "nostalgic", bpm: 112, hook: "0:22–0:36 bridge vocal", suggestion: "Film a 'then vs now' split-screen with the bridge vocal as the transition beat" },
    { id: 3, title: "Neon Tears", artist: "glass animal collective", platform: "TikTok", videos: "91K", growth: "+320%", daysActive: 7, mood: "melancholic", bpm: 86, hook: "0:08–0:22 intro riff", suggestion: "The intro riff is perfect for a slow-reveal — start with a close-up detail shot, pull back on the drop" },
    { id: 4, title: "Cheap Wine", artist: "somegirl", platform: "YouTube Shorts", videos: "67K", growth: "+190%", daysActive: 4, mood: "playful", bpm: 124, hook: "0:00–0:15 opening verse", suggestion: "The opening verse works for 'unpopular opinion' or 'things that just hit different' format" },
    { id: 5, title: "Blurface", artist: "TVquiet", platform: "TikTok", videos: "43K", growth: "+890%", daysActive: 1, mood: "experimental", bpm: 76, hook: "0:18–0:30 beat switch", suggestion: "Early trend — beat switch is ideal for transformation/glow-up reveals. Get in now before saturation" },
  ],
  "Hip-Hop": [
    { id: 1, title: "Block Rotation", artist: "Fwaygo", platform: "TikTok", videos: "412K", growth: "+960%", daysActive: 2, mood: "aggressive", bpm: 140, hook: "0:04–0:18 opening bars", suggestion: "The opening bars are perfect for 'day in my city' walk-and-talk format — film in portrait, raw energy" },
    { id: 2, title: "Trunk Knock", artist: "DJ Swerve", platform: "TikTok", videos: "228K", growth: "+540%", daysActive: 4, mood: "energetic", bpm: 156, hook: "0:10–0:22 bass drop", suggestion: "Car audio check format — film the subwoofer hitting, then cut to you performing over the bass drop" },
    { id: 3, title: "Ghost Lane", artist: "Mvrci", platform: "Reels", videos: "134K", growth: "+380%", daysActive: 6, mood: "melancholic", bpm: 82, hook: "0:16–0:30 hook vocal", suggestion: "Late-night visuals — city lights, rain, low angles. The hook vocal fits introspective storytelling" },
    { id: 4, title: "No Cap Freestyle", artist: "Relly B", platform: "YouTube Shorts", videos: "89K", growth: "+270%", daysActive: 3, mood: "playful", bpm: 130, hook: "0:00–0:12 first verse", suggestion: "Freestyle challenge — rap over the first 12 seconds then switch to YOUR beat. The transition gets shares" },
    { id: 5, title: "Southside Anthem", artist: "K Dolo", platform: "TikTok", videos: "51K", growth: "+1,100%", daysActive: 1, mood: "aggressive", bpm: 148, hook: "0:20–0:32 chant section", suggestion: "Brand new — the chant section is built for crew/group videos. Film your squad or concert footage over it" },
  ],
  "Electronic": [
    { id: 1, title: "Dissolve", artist: "Kairn", platform: "TikTok", videos: "198K", growth: "+720%", daysActive: 3, mood: "dreamy", bpm: 128, hook: "0:30–0:45 synth build", suggestion: "Time-lapse transitions synced to the build — sunrise, clouds, city lights. Let the synth carry the visual" },
    { id: 2, title: "Pulse Grid", artist: "AERA", platform: "Reels", videos: "142K", growth: "+450%", daysActive: 5, mood: "energetic", bpm: 136, hook: "0:12–0:26 drop", suggestion: "Glitch edit format — quick cuts synced to the drum hits, each cut revealing a new angle or location" },
    { id: 3, title: "Midnight Protocol", artist: "Sylva", platform: "TikTok", videos: "87K", growth: "+310%", daysActive: 8, mood: "dark", bpm: 122, hook: "0:08–0:20 bassline", suggestion: "The bassline works for moody outfit/aesthetic reveals — dark lighting, high contrast, minimal movement" },
    { id: 4, title: "Crystal Freq", artist: "NØVA", platform: "YouTube Shorts", videos: "63K", growth: "+580%", daysActive: 2, mood: "experimental", bpm: 140, hook: "0:18–0:32 arp sequence", suggestion: "Arp sequence is perfect for tech/gear showcase — show your setup, plug in cables synced to the arps" },
    { id: 5, title: "Deep Channel", artist: "Mira Void", platform: "TikTok", videos: "38K", growth: "+940%", daysActive: 1, mood: "hypnotic", bpm: 118, hook: "0:22–0:36 vocal chop", suggestion: "Very early — the vocal chop loop works for hypnotic visual loops. Film a simple repeating action, match the loop" },
  ],
  "R&B": [
    { id: 1, title: "Slow Burn", artist: "Amira K", platform: "TikTok", videos: "267K", growth: "+830%", daysActive: 3, mood: "sensual", bpm: 72, hook: "0:10–0:24 chorus", suggestion: "The chorus is trending for 'getting ready' GRWM content — soft lighting, mirror shots, slow movements" },
    { id: 2, title: "After Hours", artist: "Dex Monroe", platform: "Reels", videos: "189K", growth: "+490%", daysActive: 5, mood: "nostalgic", bpm: 88, hook: "0:20–0:34 bridge", suggestion: "Late-night drive format — dashboard camera, city lights passing, lip-sync the bridge from the driver's seat" },
    { id: 3, title: "Honey Drip", artist: "Solei", platform: "TikTok", videos: "112K", growth: "+360%", daysActive: 6, mood: "playful", bpm: 96, hook: "0:06–0:18 verse groove", suggestion: "The verse groove fits cooking/self-care content — film a routine with smooth, confident energy" },
    { id: 4, title: "Phantom Touch", artist: "Jae Ellis", platform: "YouTube Shorts", videos: "78K", growth: "+270%", daysActive: 4, mood: "melancholic", bpm: 68, hook: "0:14–0:28 vocal run", suggestion: "The vocal run is being used for 'missing someone' storytelling — pair with old photos or text message screenshots" },
    { id: 5, title: "Velvet Room", artist: "NYLA", platform: "TikTok", videos: "34K", growth: "+1,050%", daysActive: 1, mood: "sensual", bpm: 78, hook: "0:08–0:20 intro piano", suggestion: "Just emerging — the piano intro works for elegant outfit reveals and 'soft life' aesthetic content" },
  ],
  "Alt Rock": [
    { id: 1, title: "Concrete Bloom", artist: "Rust Theory", platform: "TikTok", videos: "176K", growth: "+620%", daysActive: 4, mood: "aggressive", bpm: 158, hook: "0:08–0:22 riff + scream", suggestion: "The riff hits hard for 'things that make me lose it' format — build tension with calm footage, then cut to chaos on the scream" },
    { id: 2, title: "Paper Walls", artist: "Silo Effect", platform: "Reels", videos: "124K", growth: "+410%", daysActive: 5, mood: "melancholic", bpm: 98, hook: "0:18–0:32 chorus swell", suggestion: "The chorus swell works for time-lapse transitions — start tight, pull wide as the swell hits. Nature shots work well" },
    { id: 3, title: "Wired Shut", artist: "The Greys", platform: "TikTok", videos: "82K", growth: "+340%", daysActive: 7, mood: "dark", bpm: 132, hook: "0:04–0:16 opening riff", suggestion: "Raw performance format — film yourself playing along, messy room, real energy. Authenticity wins" },
    { id: 4, title: "Satellite Town", artist: "Lowbloom", platform: "YouTube Shorts", videos: "56K", growth: "+290%", daysActive: 3, mood: "nostalgic", bpm: 108, hook: "0:12–0:26 verse melody", suggestion: "Hometown footage format — film your neighborhood, local spots, small-town vibes over the verse melody" },
    { id: 5, title: "Nerve Ending", artist: "SPILL", platform: "TikTok", videos: "29K", growth: "+870%", daysActive: 1, mood: "experimental", bpm: 144, hook: "0:20–0:32 breakdown", suggestion: "Brand new — the breakdown is intense. Film a practice session and cut the most chaotic 12 seconds" },
  ],
  "Lo-Fi": [
    { id: 1, title: "Rainy Window", artist: "sleepyhead", platform: "TikTok", videos: "302K", growth: "+780%", daysActive: 3, mood: "dreamy", bpm: 72, hook: "0:00–0:20 full loop", suggestion: "The full loop is made for study/work ambiance content — film your desk setup, coffee being poured, rain on a window" },
    { id: 2, title: "Tape Hiss", artist: "Mondo Loops", platform: "Reels", videos: "167K", growth: "+520%", daysActive: 4, mood: "nostalgic", bpm: 80, hook: "0:08–0:22 piano chop", suggestion: "VHS filter aesthetic — film everyday moments through a vintage effect, let the piano chop set the mood" },
    { id: 3, title: "3AM Thoughts", artist: "jinsang", platform: "TikTok", videos: "98K", growth: "+310%", daysActive: 6, mood: "melancholic", bpm: 68, hook: "0:14–0:28 guitar sample", suggestion: "Journal/sketchbook content — film yourself writing, drawing, or staring out a window. The guitar sample carries emotion" },
    { id: 4, title: "Warm Dust", artist: "SwuM", platform: "YouTube Shorts", videos: "74K", growth: "+260%", daysActive: 5, mood: "dreamy", bpm: 76, hook: "0:10–0:24 vinyl crackle intro", suggestion: "Record player footage — show the vinyl spinning, the needle dropping. Analog vibes match the crackle perfectly" },
    { id: 5, title: "Bokeh", artist: "quickly, quickly", platform: "TikTok", videos: "31K", growth: "+950%", daysActive: 1, mood: "experimental", bpm: 84, hook: "0:16–0:30 beat switch", suggestion: "Very early — the beat switch works for 'focus mode on vs off' content. Calm studying then chaotic real life" },
  ],
}

// ─── Ideas ────────────────────────────────────────────────────────────────────

const ALL_IDEAS = {
  "Indie Pop": [
    { id: 1, type: "Trend Ride", title: "Velvet Haze chorus challenge", effort: "Low", impact: "High", timing: "Post today — peak window", description: "Record a 15-sec clip of you vibing to your own track using the Velvet Haze format. Swap in YOUR chorus at the 14-sec mark.", format: "TikTok / Reels", tags: ["#indiemusic", "#newmusic", "#velvethazetrend"] },
    { id: 2, type: "Original", title: "Studio session time-lapse", effort: "Medium", impact: "Medium", description: "Film your next recording session. Speed it up to 60 seconds. Overlay your latest track. 2-3x normal engagement.", format: "TikTok / Reels / Shorts", tags: ["#studiolife", "#musicproduction", "#behindthemusic"] },
    { id: 3, type: "Engagement", title: "'Which version?' A/B poll", effort: "Low", impact: "High", description: "Post two 10-sec clips of the same song section with different production choices. Ask followers to vote.", format: "TikTok / Instagram Stories", tags: ["#whichversion", "#newmusic", "#indieartist"] },
    { id: 4, type: "Trend Ride", title: "Blurface beat-switch reveal", effort: "Medium", impact: "Very High", timing: "Post today — brand new (+890%)", description: "The Blurface beat-switch is brand new. Film a before/after transformation, end on YOUR song.", format: "TikTok", tags: ["#blurface", "#beatswitchchallenge", "#indiemusic"] },
    { id: 5, type: "Evergreen", title: "How I wrote [your song title]", effort: "Medium", impact: "Medium", description: "Show the voice memo, the first demo, then the final version. Humanizes your process.", format: "YouTube Shorts / TikTok", tags: ["#songwriting", "#process", "#musicmaker"] },
  ],
  "Hip-Hop": [
    { id: 1, type: "Trend Ride", title: "Southside Anthem chant video", effort: "Low", impact: "Very High", timing: "Post today — trend is 1 day old", description: "Film your people or concert footage with the chant, then hard-cut to YOUR track.", format: "TikTok", tags: ["#hiphop", "#newrap", "#southsideanthem"] },
    { id: 2, type: "Original", title: "Freestyle over trending beat", effort: "Low", impact: "High", description: "Pick the Block Rotation instrumental and spit a 15-second freestyle. Raw, one-take, phone camera.", format: "TikTok / Reels", tags: ["#freestyle", "#bars", "#hiphop"] },
    { id: 3, type: "Engagement", title: "'Hard or trash?' snippet poll", effort: "Low", impact: "High", description: "Post a 10-sec snippet of your upcoming track and ask 'hard or trash?' Drives massive comment engagement.", format: "TikTok / Instagram Stories", tags: ["#hardortrash", "#newmusic", "#snippet"] },
    { id: 4, type: "Trend Ride", title: "Block Rotation walk-and-talk", effort: "Medium", impact: "High", description: "Film yourself walking your neighborhood, talking about your come-up story over the Block Rotation beat.", format: "TikTok / Reels", tags: ["#dayinmylife", "#raplife", "#blockrotation"] },
    { id: 5, type: "Evergreen", title: "Beat breakdown: how I made it", effort: "Medium", impact: "Medium", description: "Screen record your DAW, show layers one by one. Producer content builds dedicated followings.", format: "YouTube Shorts / TikTok", tags: ["#beatmaking", "#producer", "#behindthebeat"] },
  ],
  "Electronic": [
    { id: 1, type: "Trend Ride", title: "Deep Channel hypnotic loop", effort: "Low", impact: "Very High", timing: "Post today — only 1 day old", description: "Film a simple repeating action synced to the vocal chop, then blend in YOUR synth.", format: "TikTok", tags: ["#electronic", "#deepchannel", "#hypnotic"] },
    { id: 2, type: "Original", title: "Gear/setup showcase", effort: "Medium", impact: "High", description: "Film your synths, controllers, and setup with dramatic lighting. Overlay your track. Tag gear brands.", format: "TikTok / Reels / Shorts", tags: ["#synth", "#musicgear", "#producer"] },
    { id: 3, type: "Engagement", title: "'Drop A or Drop B?' poll", effort: "Low", impact: "High", description: "Post two different drop variations. Electronic audiences are opinionated about drops.", format: "TikTok / Instagram Stories", tags: ["#whichdrop", "#electronicmusic", "#newmusic"] },
    { id: 4, type: "Trend Ride", title: "Crystal Freq arp gear video", effort: "Medium", impact: "High", description: "Film yourself patching cables synced to the arps, then transition to your own arp.", format: "TikTok", tags: ["#modular", "#crystalfreq", "#synthwave"] },
    { id: 5, type: "Evergreen", title: "Sound design tutorial", effort: "High", impact: "High", description: "Show how you designed one specific sound from your latest track. Educational content builds loyal followers.", format: "YouTube Shorts / TikTok", tags: ["#sounddesign", "#tutorial", "#producer"] },
  ],
  "R&B": [
    { id: 1, type: "Trend Ride", title: "Velvet Room soft-life reveal", effort: "Low", impact: "Very High", timing: "Post today — just emerged", description: "Film a morning routine with warm lighting, transition to YOUR chorus over the piano intro.", format: "TikTok / Reels", tags: ["#rnb", "#softlife", "#velvetroom"] },
    { id: 2, type: "Original", title: "GRWM with your track", effort: "Low", impact: "High", description: "Getting Ready With Me format. Film your pre-show routine with your latest track playing.", format: "TikTok / Reels", tags: ["#grwm", "#rnb", "#newrnb"] },
    { id: 3, type: "Engagement", title: "'Vibe check' snippet reaction", effort: "Low", impact: "High", description: "Film yourself reacting to your own snippet like you're hearing it fresh. Ask followers for their vibe check.", format: "TikTok / Instagram Stories", tags: ["#vibecheck", "#newrnb", "#snippet"] },
    { id: 4, type: "Trend Ride", title: "Slow Burn GRWM", effort: "Medium", impact: "High", description: "Slow Burn's chorus is dominating GRWM content. Film your version but swap in your track at the hook.", format: "TikTok / Reels", tags: ["#slowburn", "#grwm", "#rnb"] },
    { id: 5, type: "Evergreen", title: "Vocal harmony breakdown", effort: "Medium", impact: "Medium", description: "Layer your harmonies one at a time on camera. R&B fans love watching harmonies stack. Massive saves.", format: "YouTube Shorts / TikTok", tags: ["#harmonies", "#vocals", "#rnbsinger"] },
  ],
  "Alt Rock": [
    { id: 1, type: "Trend Ride", title: "Nerve Ending jam session", effort: "Low", impact: "Very High", timing: "Post today — 1 day old, moving fast", description: "Film the most chaotic 12 seconds of a practice session, then hard-cut to YOUR breakdown.", format: "TikTok", tags: ["#altrock", "#nerveending", "#jamsession"] },
    { id: 2, type: "Original", title: "Pedal board walkthrough", effort: "Medium", impact: "High", description: "Show your pedal chain, demo each effect, land on your signature tone. Gets shared in guitarist communities.", format: "TikTok / Reels / Shorts", tags: ["#pedalboard", "#guitartone", "#altrock"] },
    { id: 3, type: "Engagement", title: "'Clean or dirty?' tone poll", effort: "Low", impact: "High", description: "Post the same riff with clean tone vs distortion. Guitar content drives debates, debates drive comments.", format: "TikTok / Instagram Stories", tags: ["#cleanordirty", "#guitartone", "#altrock"] },
    { id: 4, type: "Trend Ride", title: "Concrete Bloom rage cut", effort: "Medium", impact: "High", description: "Build tension with calm footage, then SLAM cut to full intensity on the riff. The contrast gets replays.", format: "TikTok / Reels", tags: ["#concretebloom", "#altrock", "#rage"] },
    { id: 5, type: "Evergreen", title: "Cover to original transition", effort: "Medium", impact: "Medium", description: "Play 10 seconds of a well-known song, then seamlessly transition into YOUR song with similar energy.", format: "YouTube Shorts / TikTok", tags: ["#cover", "#original", "#altrock"] },
  ],
  "Lo-Fi": [
    { id: 1, type: "Trend Ride", title: "Bokeh beat-switch study reel", effort: "Low", impact: "Very High", timing: "Post today — brand new trend", description: "Film calm studying, then cut to chaotic real life on the switch. Drop YOUR track into the calm section.", format: "TikTok", tags: ["#lofi", "#bokeh", "#studyvibes"] },
    { id: 2, type: "Original", title: "Sampling process video", effort: "Medium", impact: "High", description: "Show the original vinyl, chop it on camera, add drums, reveal the final beat. Lo-fi fans love the craft.", format: "TikTok / Reels / Shorts", tags: ["#sampling", "#lofibeats", "#beatmaking"] },
    { id: 3, type: "Engagement", title: "'Study or sleep?' vibe poll", effort: "Low", impact: "High", description: "Post a 15-sec loop and ask if it's a study beat or a sleep beat. Simple but drives saves and comments.", format: "TikTok / Instagram Stories", tags: ["#studyorsleep", "#lofi", "#vibecheck"] },
    { id: 4, type: "Trend Ride", title: "Rainy Window desk setup", effort: "Low", impact: "High", description: "Film your desk, window, coffee — the cozy aesthetic. Slip YOUR loop in at the halfway mark.", format: "TikTok / Reels", tags: ["#rainywindow", "#desksetup", "#lofi"] },
    { id: 5, type: "Evergreen", title: "1 hour loop teaser", effort: "Low", impact: "Medium", description: "Post a 15-sec clip with 'full 1-hour version on my channel.' Drives traffic to long-form.", format: "YouTube Shorts / TikTok", tags: ["#lofibeats", "#studymusic", "#chill"] },
  ],
}

// ─── Calendars ────────────────────────────────────────────────────────────────

const ALL_CALENDARS = {
  "Indie Pop":   [{ day: "Mon", task: "Film Velvet Haze trend content", type: "create" }, { day: "Tue", task: "Post Velvet Haze trend video", type: "post" }, { day: "Wed", task: "Engage — reply to comments, duet fans", type: "engage" }, { day: "Thu", task: "Film studio session time-lapse", type: "create" }, { day: "Fri", task: "Post A/B poll + studio content", type: "post" }, { day: "Sat", task: "Engage — comment on 10 similar artists", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Hip-Hop":     [{ day: "Mon", task: "Record freestyle over Block Rotation", type: "create" }, { day: "Tue", task: "Post freestyle + Southside chant video", type: "post" }, { day: "Wed", task: "Engage — reply to comments, repost fans", type: "engage" }, { day: "Thu", task: "Film beat breakdown screen recording", type: "create" }, { day: "Fri", task: "Post 'hard or trash?' snippet poll", type: "post" }, { day: "Sat", task: "Engage — collab DMs to 5 local artists", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Electronic":  [{ day: "Mon", task: "Film gear showcase with dramatic lighting", type: "create" }, { day: "Tue", task: "Post Deep Channel hypnotic loop video", type: "post" }, { day: "Wed", task: "Engage — reply to comments, share setups", type: "engage" }, { day: "Thu", task: "Record sound design tutorial", type: "create" }, { day: "Fri", task: "Post 'Drop A or B?' poll + tutorial", type: "post" }, { day: "Sat", task: "Engage — comment in producer communities", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "R&B":         [{ day: "Mon", task: "Film GRWM with your latest track", type: "create" }, { day: "Tue", task: "Post Velvet Room soft-life reveal", type: "post" }, { day: "Wed", task: "Engage — reply to comments, duet covers", type: "engage" }, { day: "Thu", task: "Record vocal harmony breakdown", type: "create" }, { day: "Fri", task: "Post 'vibe check' snippet + harmonies", type: "post" }, { day: "Sat", task: "Engage — connect with 10 R&B creators", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Alt Rock":    [{ day: "Mon", task: "Film Nerve Ending jam session clip", type: "create" }, { day: "Tue", task: "Post jam clip + Concrete Bloom rage cut", type: "post" }, { day: "Wed", task: "Engage — reply to comments, share covers", type: "engage" }, { day: "Thu", task: "Film pedal board walkthrough", type: "create" }, { day: "Fri", task: "Post 'clean or dirty?' tone poll", type: "post" }, { day: "Sat", task: "Engage — comment on 10 band pages", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Lo-Fi":       [{ day: "Mon", task: "Film sampling process video", type: "create" }, { day: "Tue", task: "Post Bokeh beat-switch study reel", type: "post" }, { day: "Wed", task: "Engage — reply to comments, share vibes", type: "engage" }, { day: "Thu", task: "Film Rainy Window desk setup content", type: "create" }, { day: "Fri", task: "Post 'study or sleep?' poll + desk vid", type: "post" }, { day: "Sat", task: "Engage — share beats in lo-fi communities", type: "engage" }, { day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const ALL_STATS = {
  "Indie Pop":   { monthlyListeners: "34,200", listenersChange: "+8.2%",  followers: "12,800", followersChange: "+3.1%", playlistReach: "89K",   playlistChange: "+12%" },
  "Hip-Hop":     { monthlyListeners: "52,400", listenersChange: "+14.6%", followers: "28,300", followersChange: "+5.8%", playlistReach: "134K",  playlistChange: "+18%" },
  "Electronic":  { monthlyListeners: "41,800", listenersChange: "+11.3%", followers: "19,200", followersChange: "+4.2%", playlistReach: "112K",  playlistChange: "+9%"  },
  "R&B":         { monthlyListeners: "28,600", listenersChange: "+6.7%",  followers: "15,400", followersChange: "+2.9%", playlistReach: "76K",   playlistChange: "+11%" },
  "Alt Rock":    { monthlyListeners: "22,100", listenersChange: "+5.4%",  followers: "9,800",  followersChange: "+2.1%", playlistReach: "54K",   playlistChange: "+7%"  },
  "Lo-Fi":       { monthlyListeners: "47,900", listenersChange: "+12.1%", followers: "22,600", followersChange: "+6.3%", playlistReach: "203K",  playlistChange: "+22%" },
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

const ALL_ALERTS = {
  "Indie Pop":  { title: "Blurface beat-switch", stat: "43K videos in just 1 day with +890% growth", desc: "Artists who post in the first 48 hours get 3–5x more algorithmic distribution." },
  "Hip-Hop":    { title: "Southside Anthem chant", stat: "51K videos in 1 day with +1,100% growth", desc: "The chant format is built for crew videos — early adopters are getting massive reach." },
  "Electronic": { title: "Deep Channel vocal chop", stat: "38K videos in 1 day with +940% growth", desc: "Hypnotic loop content is surging. Simple repeating visuals synced to the chop are winning." },
  "R&B":        { title: "Velvet Room piano intro", stat: "34K videos in 1 day with +1,050% growth", desc: "Soft-life aesthetic is peaking right now. The piano intro fits perfectly." },
  "Alt Rock":   { title: "Nerve Ending breakdown", stat: "29K videos in 1 day with +870% growth", desc: "Raw energy content is trending — messy jam sessions outperform polished clips." },
  "Lo-Fi":      { title: "Bokeh beat switch", stat: "31K videos in 1 day with +950% growth", desc: "Study vs. chaos format is blowing up. Simple to film, high save rate." },
}

// ─── Trending Videos ──────────────────────────────────────────────────────────
// videoId: confirmed YouTube ID (thumbnail loads from img.youtube.com)
// youtubeLink: direct watch URL or search fallback

const ALL_VIDEOS = {
  "Indie Pop": [
    {
      id: 1, title: "who's your boyfriend", creator: "Royel Otis",
      views: "4.2M views", age: "7 months ago", format: "Official Music Video",
      videoId: "lumvhHA2psM",
      youtubeLink: "https://www.youtube.com/watch?v=lumvhHA2psM",
      hook: "Celebrity casting (Lola Tung) creates cross-fandom reach from the first frame — people who'd never heard Royel Otis clicked because of her name in the title.",
      formatBreakdown: "3-minute narrative arc with cinematic warmth — short enough to complete, long enough to invest in the characters. The story gives people a reason to rewatch.",
      algorithmSignals: "Cross-fandom sharing drove discovery outside the indie pop niche. High completion rate (story rewards finishing). Comment section became a pop culture discussion hub — algorithm gold.",
      stealThis: "You don't need a celebrity — you need a story. A Reel with a beginning, middle, and end beats a performance clip every time. What moment in your song could anchor a 60-second narrative?",
    },
    {
      id: 2, title: "The Less I Know the Better", creator: "Tame Impala",
      views: "113M+ views", age: "evergreen", format: "Narrative / Absurdist MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=tame+impala+the+less+i+know+the+better+official+video",
      hook: "Opens directly on the groove — the iconic riff, zero intro. You're inside the song before you can decide whether to keep watching.",
      formatBreakdown: "Absurdist humor (mascot love triangle) + flawless 70s cinematography. Comedy makes it shareable; the visuals make it rewatchable. Serves two audiences at once.",
      algorithmSignals: "Rewatch rate is the hidden driver here. The visual gag rewards repeat viewing. People share it specifically to watch a friend's reaction — an organic loop that never needed any push.",
      stealThis: "Start on your strongest moment. Never ease in. The first 3 seconds should be the most arresting 3 seconds in the video — not a title card, not a fade-in, not a hello.",
    },
    {
      id: 3, title: "Stick Season (live acoustic session)", creator: "Noah Kahan",
      views: "~80M streams", age: "2 years ago", format: "Stripped Live Session",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=noah+kahan+stick+season+live+acoustic+session",
      hook: "Emotional rawness from the first note. Just voice and guitar, nothing between artist and viewer. The simplicity is the statement.",
      formatBreakdown: "Zero production: one camera, natural light, one guitar. The absence of polish communicates authenticity. Listeners feel like they stumbled onto something private.",
      algorithmSignals: "Save rate through the roof — people bookmark emotional content. Share rate spikes when a lyric hits: 'this song is about me' comments are algorithmic fuel that sends content beyond followers.",
      stealThis: "Strip your setup to almost nothing. Film your most emotionally honest song in the most honest setting you have. The vulnerability IS the production value — you can't buy it.",
    },
  ],
  "Hip-Hop": [
    {
      id: 1, title: "Not Like Us", creator: "Kendrick Lamar",
      views: "450M+ views", age: "11 months ago", format: "Cultural Moment MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=kendrick+lamar+not+like+us+official+music+video",
      hook: "Opens on Drake's house aerial shot — every viewer with cultural context immediately understands the stakes before a single word is heard.",
      formatBreakdown: "A diss track MV functions as a cultural document as much as music. It gets shared for the story, not just the sound — the video IS the news cycle.",
      algorithmSignals: "Non-fans shared it for the narrative. News coverage drove direct search traffic. Comment engagement (debate) kept it surfacing algorithmically for weeks after the initial wave.",
      stealThis: "Tie your music to a moment or conversation already happening — even locally. Relevance to an existing discourse is the fastest path to reach you've never earned yet.",
    },
    {
      id: 2, title: "Surround Sound ft. 21 Savage", creator: "JID",
      views: "28M views", age: "2 years ago", format: "Cinematic Feature MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=JID+surround+sound+21+savage+official+video",
      hook: "Wide-angle cinematic shot with immediate visual texture — scale communicates ambition before the first bar lands.",
      formatBreakdown: "The feature means two fanbases are immediately exposed. Lyrical density rewards repeat listens — people come back to catch what they missed, which compounds watch time.",
      algorithmSignals: "Both artists' fan bases share independently without coordination. High replay driven by lyric complexity — fans make timestamps in the comments, each one a recommendation.",
      stealThis: "Feature someone whose audience overlaps yours but doesn't fully duplicate it. A local collab with 500 engaged followers in your genre exposes you to 500 people who've never heard of you.",
    },
    {
      id: 3, title: "Freestyle (one take, real location)", creator: "Underground breakout format",
      views: "1M–5M views", age: "ongoing format", format: "Raw Freestyle Clip",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=underground+hip+hop+freestyle+one+take+viral+2025",
      hook: "No setup, no title card — straight into bars in a genuine outdoor setting. The uncut nature signals authenticity before a single lyric.",
      formatBreakdown: "One take, single angle, real location. Low production is the artistic statement. Unpolished = unfiltered, which audiences read as honest in a genre where honesty is currency.",
      algorithmSignals: "'You need to hear this' sharing pattern — discovery content has a different social function than streaming content. It spreads because finding it feels like a personal discovery.",
      stealThis: "Film one perfect take somewhere real: rooftop, parking garage, subway platform, park. The right location adds more production value than any camera upgrade.",
    },
  ],
  "Electronic": [
    {
      id: 1, title: "Live at Boiler Room", creator: "Fred again..",
      views: "12M+ views", age: "2 years ago", format: "Live Set Footage",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=fred+again+boiler+room+london+live+set",
      hook: "1,000 people in a basement going completely off — visible from the first frame. Scale and energy communicate everything before a note is identified.",
      formatBreakdown: "Live performance content works differently than studio content. The audience reaction IS part of the music — you're selling the feeling of being in the room, not just the sound.",
      algorithmSignals: "FOMO is the share trigger. People who were there share to say 'I was there.' People who weren't share to say 'I need to be at the next one.' Both groups amplify the same content.",
      stealThis: "Film your best live moments regardless of crowd size. A tight 50-person room losing its mind looks better on camera than a half-empty 500-person room. Crowd energy always beats crowd size.",
    },
    {
      id: 2, title: "Abracadabra", creator: "Lady Gaga (prod. Gesaffelstein)",
      views: "180M+ views", age: "1 year ago", format: "High-Concept Fashion MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=lady+gaga+abracadabra+official+music+video+2025",
      hook: "Visual identity so specific and committed you know who made it in the first frame — fashion-as-identity storytelling that doubles as genre-crossing bait.",
      formatBreakdown: "Electronic music wrapped in fashion-world cinematography reaches audiences who'd never search 'electronic music.' The visual language is the genre crossover.",
      algorithmSignals: "Fashion and beauty communities shared it entirely independently of music communities. Multiple entry points create exponential reach — each community thought they discovered it.",
      stealThis: "Pick one adjacent creative world — fashion, visual art, gaming, architecture — and speak that language in your visuals. Electronic music is inherently visual. Own a look that isn't the music.",
    },
    {
      id: 3, title: "Making a beat from scratch (bedroom)", creator: "Producer process format",
      views: "1M–3M views", age: "ongoing format", format: "Process / Gear Showcase",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=making+electronic+beat+from+scratch+bedroom+producer+2025",
      hook: "Starts with a raw empty DAW — then one sound gets added and you hear the potential. The curiosity about what it becomes drives the entire watch.",
      formatBreakdown: "Educational + musical simultaneously. Process videos serve producers (who save for technique) and curious non-musicians (fascinated by how music gets made). Two audiences, one video.",
      algorithmSignals: "Save rate 4–5x higher than standard performance content. Producers comment on technique choices — high comment density. Algorithm reads high saves + high comments as high-value content.",
      stealThis: "Show one beat or one track being made from start to finish — real time or sped up. The process IS the content. No finished product required. Educational saves compound over time.",
    },
  ],
  "R&B": [
    {
      id: 1, title: "Kill Bill", creator: "SZA",
      views: "165M+ views", age: "3 years ago", format: "Cinematic Narrative MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=SZA+kill+bill+official+music+video",
      hook: "Tarantino-inspired aesthetics deliver a fully-formed visual world in under 2 seconds — the color grading alone signals that this is intentional and high-concept.",
      formatBreakdown: "Dark humor in R&B is rare enough to be shareable just for the concept. 'I might kill my ex' is quotable — quotability drives comment engagement, which is algorithmic fuel.",
      algorithmSignals: "Film community shared it. Meme-ability drove massive text-based sharing. Multiple audiences (R&B fans, Tarantino fans, humor accounts) amplified it completely independently.",
      stealThis: "Develop a visual identity as intentional as your sonic one. Your thumbnail should be unmistakable at a glance. What's the one image that represents your sound — and are you using it consistently?",
    },
    {
      id: 2, title: "Snooze", creator: "SZA",
      views: "90M+ views", age: "2 years ago", format: "Intimate / Home Aesthetic MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=SZA+snooze+official+music+video",
      hook: "Immediate emotional intimacy — warm, soft, domestic palette communicates vulnerability before the vocal even begins.",
      formatBreakdown: "Home/bedroom aesthetic positions the artist as a real person, not a product. Low visual distance = high emotional connection. The setting makes the emotion feel earned.",
      algorithmSignals: "Save rate driven by emotional identification — 'this song is about me' = share. Parasocial connection content outperforms aspirational content in R&B specifically.",
      stealThis: "Film in your actual space — bedroom, kitchen, car. The more personal the location, the more universally relatable the feeling. Authenticity of setting amplifies authenticity of emotion.",
    },
    {
      id: 3, title: "Guitar performance (live, self-filmed)", creator: "H.E.R. format",
      views: "8M+ views", age: "ongoing format", format: "Instrument Skill Showcase",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=HER+guitar+live+performance+soul+rnb+viral",
      hook: "Technical skill on display immediately — the first note from the guitar creates a 'wait, she can actually PLAY?' reaction that stops the scroll cold.",
      formatBreakdown: "Instrument-forward R&B carves out a subcategory that isn't competing with the broader R&B algorithm. You own a specific lane with a committed, devoted audience.",
      algorithmSignals: "Skill-surprise content — 'I didn't know they could do that' — is one of the highest-share patterns on any platform. People share it to show off their discovery: 'look what I found.'",
      stealThis: "If you play an instrument, lead with it every time. The bar for 'impressive' is lower than you think. Clean tone, emotional phrasing, first 2 seconds. The guitar is the hook.",
    },
  ],
  "Alt Rock": [
    {
      id: 1, title: "Chaise Longue", creator: "Wet Leg",
      views: "22M+ views", age: "3 years ago", format: "DIY Absurdist Performance MV",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=wet+leg+chaise+longue+official+music+video",
      hook: "Deadpan stare directly into camera + the opening riff simultaneously. The eye contact breaks the fourth wall and immediately creates intrigue — who IS this?",
      formatBreakdown: "Humor + musicianship in rock is rarely done well, making it immediately shareable. Deadpan delivery made people quote it: absurdist comedy built on top of a genuinely great song.",
      algorithmSignals: "'You need to hear this' discovery pattern — people shared it as a find. Music press amplified it after organic spread. Critical mass reached without any paid push.",
      stealThis: "Don't take yourself so seriously that you're not shareable. Comedy and sincerity can coexist — Wet Leg proved it. What's the funniest honest thing you could do with your most sincere song?",
    },
    {
      id: 2, title: "CRAWLER (Live at Glastonbury)", creator: "IDLES",
      views: "5M+ views", age: "1 year ago", format: "Live Festival Footage",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=IDLES+live+glastonbury+2024+performance",
      hook: "Physical intensity and crowd interaction from the first second — Joe Talbot is already in the crowd before the first verse.",
      formatBreakdown: "Fan-filmed live content frequently outperforms official recordings because a shaky camera and crowd noise feel MORE present, not less. Imperfection is the signal of authenticity.",
      algorithmSignals: "Concertgoers sharing their own experience create organic distribution. 'I was in that crowd' posts amplify the clip in waves — every show has a second life on social.",
      stealThis: "Explicitly encourage your audience to film. Your next show might be 80 people — but if 80 people post clips, you've just reached tens of thousands organically. Make it easy for them.",
    },
    {
      id: 3, title: "R U Mine? (Live)", creator: "Arctic Monkeys",
      views: "45M+ views", age: "2 years ago", format: "Live — Iconic Riff Focus",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=arctic+monkeys+R+U+mine+live+performance",
      hook: "Three seconds of the most recognizable guitar line in indie rock — no intro, just the riff. Reaches fans and non-fans simultaneously.",
      formatBreakdown: "Live context adds stakes that studio versions lack. The crowd's visible reaction is real-time proof that the riff works — social proof built into the clip itself.",
      algorithmSignals: "Riff recognition triggers dopamine in existing fans while creating curiosity in new ones. 'What is this song?' comments from new listeners is the discovery signal algorithm looks for.",
      stealThis: "Identify the single most striking moment in your set — the riff, the note, the drop — and film it from every angle at every show. That 3-second moment is the hook for every short-form clip you'll ever make.",
    },
  ],
  "Lo-Fi": [
    {
      id: 1, title: "lofi hip hop radio — beats to relax/study to", creator: "Lofi Girl",
      views: "14.6M subscribers", age: "7+ years running", format: "24/7 Livestream",
      videoId: "jfKfPfyJRdk",
      youtubeLink: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
      hook: "Familiarity IS the hook. Returning viewers come back for the same cozy frame, the same girl, the same vibe. Absence of novelty is the product.",
      formatBreakdown: "Anti-algorithm content that accidentally won the algorithm. 24/7 watch time creates session lengths YouTube has never seen from music content — and the algorithm rewards it.",
      algorithmSignals: "Session time is the only metric that matters here. Average viewing session is 7+ hours (people fall asleep to it). YouTube's algorithm optimizes for time-on-platform — Lofi Girl maxes that out.",
      stealThis: "For lo-fi, consistency crushes virality. One artist posting weekly beats builds more durable growth than chasing one viral moment. Own a time slot, own an aesthetic, show up every single week.",
    },
    {
      id: 2, title: "chill beats to drive at night", creator: "Chillhop Music",
      views: "8M+ views", age: "2 years ago", format: "Aesthetic Beat Compilation",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=chillhop+chill+beats+night+drive+lofi+compilation",
      hook: "The title does all the work — 'beats to drive at night' is a complete emotional scenario. Viewers know exactly what they're getting and exactly why they want it.",
      formatBreakdown: "Search-optimized titles beat scroll-optimized titles for lo-fi. People search for functional music ('study beats', 'night drive') more than they browse for it. SEO is distribution.",
      algorithmSignals: "Return visitors who come back for their 'night drive playlist.' Return rate in lo-fi is the highest of any genre — regular listeners create consistent daily view counts that stabilize your algorithm signal.",
      stealThis: "Name everything with intention. 'Track 3' doesn't get searched. 'late night guitar beats when you can't sleep' gets found every night. Functional titles are search optimization AND emotional targeting at once.",
    },
    {
      id: 3, title: "making a lo-fi beat in 10 minutes", creator: "Process video format",
      views: "1M–2M views", age: "ongoing format", format: "Speed-Run Process Video",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=making+lofi+beat+10+minutes+start+to+finish+2025",
      hook: "A timer in the corner from frame one creates narrative stakes. 'Can they actually make something good in 10 minutes?' is the question that keeps you watching till the end.",
      formatBreakdown: "Process + time constraint = story. Speed-run formats hold two audiences: producers watching for technique, and curious non-musicians watching to see music get made from nothing.",
      algorithmSignals: "High completion rate (time constraint = people stay to see if they finish). High save rate from producers noting techniques. Educational + musical = double the save motivation.",
      stealThis: "Constrain your next process video — 10 minutes, one sample, one plugin, one microphone. The constraint creates the story arc. Without a constraint, a process video is just documentation.",
    },
  ],
}

// ─── Discovery mechanics ──────────────────────────────────────────────────────

const DISCOVERY_TIPS = {
  "Indie Pop": [
    "TikTok has a 72-hour peak window — post, reply to every comment, and engage hard for the first 3 days. After that, the algorithm moves on.",
    "On Reels, saves trigger wider distribution more than likes. Ask people to save it, not just like it.",
    "YouTube Shorts have a 30-day shelf life. Optimize your title for search ('indie guitar riff,' 'dreamy bedroom pop') — not just the algorithm.",
  ],
  "Hip-Hop": [
    "Comment engagement (debates, reactions, call-outs) is TikTok's strongest algorithm signal for hip-hop. Controversy within reason drives reach.",
    "Features expose you to a second audience instantly — even a local collab multiplies your reach without buying a single ad.",
    "Long-form YouTube builds deeper fandom; Shorts build discovery. Run both tracks in parallel from the start.",
  ],
  "Electronic": [
    "TikTok's gear community is one of the most engaged niches — tagging hardware brands in your gear content often earns a repost from the brand itself.",
    "Festival clip content lives longest on YouTube. A 10-minute live set edit can accumulate views for years vs. a Short that peaks in 72 hours.",
    "Instagram Reels rewards visual consistency — same color grade, same aspect ratio, same energy across every post trains the algorithm to push you to the same audience each time.",
  ],
  "R&B": [
    "Emotional save rate is highest in R&B. Content that makes people feel something gets saved — and saves are the metric that pushes content beyond your existing followers.",
    "GRWM and 'day in the life' formats have the highest completion rates for R&B because they match the pacing of the genre.",
    "Vocal showcase content (harmonies, runs, adlibs) gets shared as a discovery tool — people share it to say 'you need to hear this voice.'",
  ],
  "Alt Rock": [
    "Fan-filmed concert footage consistently outperforms official live videos. Authenticity of the shaky cam signals a real moment — encourage filming at every show.",
    "TikTok's guitar community (#guitartok) is enormous and engaged. A riff or tone video that gets picked up there can reach millions with zero followers.",
    "Reels' 90-second format is ideal for live performance clips — enough time to establish energy, play through a hook, and leave them wanting the full song.",
  ],
  "Lo-Fi": [
    "Search is your primary distribution channel — YouTube search for 'study beats' and 'focus music' drives more consistent traffic than algorithmic recommendation for lo-fi.",
    "Consistency over virality: the lo-fi artists with the largest audiences post on a schedule. Weekly beats, same day, same time. The algorithm rewards predictability.",
    "Playlist placement is more valuable than viral moments for lo-fi. Email 5 lo-fi playlist curators per week with a short pitch and a link to your best track.",
  ],
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const typeColors = {
  create: { bg: "#2D1B69", text: "#C4B5FD", dot: "#A78BFA" },
  post:   { bg: "#1B3A2D", text: "#86EFAC", dot: "#4ADE80" },
  engage: { bg: "#3A2A1B", text: "#FCD34D", dot: "#FBBF24" },
  plan:   { bg: "#1B2D3A", text: "#93C5FD", dot: "#60A5FA" },
}
const platformColors = { TikTok: "#FF004F", Reels: "#E1306C", "YouTube Shorts": "#FF0000" }
const moodStyles = {
  dreamy:       { bg: "#312E81", text: "#C4B5FD" },
  nostalgic:    { bg: "#713F12", text: "#FDE68A" },
  melancholic:  { bg: "#1E3A5F", text: "#93C5FD" },
  playful:      { bg: "#14532D", text: "#86EFAC" },
  experimental: { bg: "#4C1D95", text: "#DDD6FE" },
  aggressive:   { bg: "#5B1A1A", text: "#FCA5A5" },
  energetic:    { bg: "#1B3A2D", text: "#86EFAC" },
  dark:         { bg: "#1F1F2E", text: "#A5B4FC" },
  hypnotic:     { bg: "#312E81", text: "#DDD6FE" },
  sensual:      { bg: "#4C1130", text: "#F9A8D4" },
}
const ideaTypeStyles = {
  "Trend Ride": { color: "#F472B6", bg: "rgba(244,114,182,0.12)" },
  "Original":   { color: "#60A5FA", bg: "rgba(96,165,250,0.12)"  },
  "Engagement": { color: "#FBBF24", bg: "rgba(251,191,36,0.12)"  },
  "Evergreen":  { color: "#4ADE80", bg: "rgba(74,222,128,0.12)"  },
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
          <span style={{ fontSize: 11, color: "#6B6560" }}>{video.views}</span>
          <span style={{ fontSize: 10, color: "#3A3530" }}>·</span>
          <span style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", color: "#8B8680", padding: "1px 7px", borderRadius: 4 }}>{video.format}</span>
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

  const launchDashboard = () => { setScreen("dashboard"); setActiveTab("brief"); setExpandedSound(null); setExpandedIdea(null); setExpandedVideo(null) }
  const editProfile     = () => { setScreen("onboard"); setStep(1) }
  const toggleVibe      = (v) => setSelectedVibes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  const toggleCalendar  = (i) => setCalendarDone(prev => ({ ...prev, [i]: !prev[i] }))
  const handleWaitlist  = (e) => { e.preventDefault(); if (email.trim()) setSubmitted(true) }

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
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: 28, lineHeight: 1.6 }}>We{"'"}ll use this to personalize your dashboard and content strategy.</p>
            <input type="text" placeholder="Your artist or project name" value={artistName} onChange={e => setArtistName(e.target.value)} onKeyDown={e => e.key === "Enter" && artistName.trim() && setStep(2)} autoFocus style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", color: "#E8E6E1", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
            <input type="url" placeholder="Spotify artist URL (optional)" value={spotifyUrl} onChange={e => setSpotifyUrl(e.target.value)} style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", color: "#E8E6E1", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
            <p style={{ fontSize: 11, color: "#4B4540", marginTop: 0, marginBottom: 32 }}>Spotify integration coming soon — enter your URL now and we{"'"}ll pull real stats when it{"'"}s ready.</p>
            <button onClick={() => artistName.trim() && setStep(2)} disabled={!artistName.trim()} style={{ display: "block", width: "100%", background: artistName.trim() ? "#7C3AED" : "rgba(124,58,237,0.25)", border: "none", borderRadius: 12, padding: "15px", color: artistName.trim() ? "#fff" : "#6B6560", fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: artistName.trim() ? "pointer" : "not-allowed", transition: "all 0.15s" }}>Continue</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#E8E6E1", marginBottom: 8, lineHeight: 1.3 }}>What{"'"}s your genre?</h2>
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: 22, lineHeight: 1.6 }}>This determines which trending sounds and content ideas we surface for you.</p>
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
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: 22, lineHeight: 1.6 }}>Pick any words that fit. These help tailor your strategy. You can skip this step.</p>
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

  const sounds        = ALL_SOUNDS[selectedGenre]
  const ideas         = ALL_IDEAS[selectedGenre]
  const stats         = ALL_STATS[selectedGenre]
  const alert         = ALL_ALERTS[selectedGenre]
  const calendarItems = ALL_CALENDARS[selectedGenre]
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
            <div style={{ width: 44, height: 44, borderRadius: 99, background: `linear-gradient(135deg, ${genreMeta.color} 0%, #4C1D95 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#fff" }}>{initials}</span>
            </div>
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

        {/* ── Brief ── */}
        {activeTab === "brief" && (
          <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[
                { label: "Monthly listeners", value: stats.monthlyListeners, change: stats.listenersChange },
                { label: "Followers",          value: stats.followers,        change: stats.followersChange },
                { label: "Playlist reach",     value: stats.playlistReach,    change: stats.playlistChange },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 4, letterSpacing: "0.03em" }}>{s.label}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "#E8E6E1" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#4ADE80", marginTop: 3 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Hot opportunity */}
            <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "#F472B6", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#F9A8D4", letterSpacing: "0.04em", textTransform: "uppercase" }}>Hot opportunity</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D4D0CB" }}>
                <strong style={{ color: "#E8E6E1" }}>{alert.title}</strong> — {alert.stat}. {alert.desc}
              </p>
            </div>

            {/* Discovery mechanics */}
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

            {/* Ideas */}
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
        )}

        {/* ── Sounds ── */}
        {activeTab === "sounds" && (
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
          </div>
        )}

        {/* ── Videos ── */}
        {activeTab === "videos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trending videos — {selectedGenre}</h3>
              <span style={{ fontSize: 11, color: "#6B6560" }}>Apr 10, 2026</span>
            </div>
            <p style={{ fontSize: 12, color: "#6B6560", marginBottom: 18, lineHeight: 1.6 }}>Real videos working in your genre right now. Tap <span style={{ color: genreMeta.color }}>Why this worked</span> under each one to see the breakdown.</p>
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
        )}

        {/* ── Calendar ── */}
        {activeTab === "calendar" && (
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
        )}

        {/* ── Waitlist ── */}
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

      </div>
    </div>
  )
}
