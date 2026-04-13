'use client'

import { useState, useEffect } from "react"

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
      id: 1, title: "wrote this at 2am and idk what to do with it", creator: "mei.wav",
      subs: "34K subs", views: "4.1M views", age: "5 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=bedroom+indie+pop+guitar+short+2am+original+song+2024",
      hook: "The title IS the hook — it names a feeling every creative person has had. You clicked because you've been that person at 2am. The song hasn't even started and you already identify.",
      formatBreakdown: "Single take, iPhone on a desk, barely-lit bedroom, acoustic guitar and one raw vocal take. No cuts, no grade. Under 40 seconds. The absence of polish is the entire aesthetic statement.",
      algorithmSignals: "Relatability drove the initial share wave. Saves from other musicians thinking 'I should do this.' Comments flooded with 'please release this' — high comment-to-subscribe conversion when people want more.",
      stealThis: "Write your title before you write the song. 'Wrote this at 2am' is more searchable, more emotional, more shareable than 'New Song #3.' The title is your hook — treat it that way.",
    },
    {
      id: 2, title: "building a loop until it feels right", creator: "hollowcoast",
      subs: "61K subs", views: "2.8M views", age: "3 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=indie+guitar+loop+building+short+bedroom+pop+2024",
      hook: "The phrase 'until it feels right' creates an open-ended narrative — viewers stick around to hear if it ever does. Suspense in 60 seconds without a single word of dialogue.",
      formatBreakdown: "Screen-split: guitar close-up on top, DAW layers adding below. The visual accumulation mirrors the sonic build. When the full loop lands, you see and hear it simultaneously — satisfying on both levels.",
      algorithmSignals: "High completion rate — people watched to the end to hear the 'final' version. The loop format rewards repeat plays; each loop-through reveals a layer they missed. Completion + rewatch = algorithm push.",
      stealThis: "Film your process but give it a goal that creates tension. 'Building a loop until it feels right' is a narrative, not a demo. The open-ended constraint makes it a story — and stories get watched to the end.",
    },
    {
      id: 3, title: "the verse I keep coming back to", creator: "petal.mp3",
      subs: "22K subs", views: "1.6M views", age: "6 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=indie+pop+unfinished+song+verse+short+acoustic+viral+2024",
      hook: "'Keep coming back to' signals quality without claiming it. The humility invites the viewer to judge for themselves — which they do, loudly, in the comments.",
      formatBreakdown: "Handheld, natural light by a window, voice only. 28 seconds. The verse doesn't resolve — it just stops. The unfinished status is not a flaw, it's the concept. Incompleteness creates longing.",
      algorithmSignals: "Ambiguity drove comments asking 'when's this coming out?' — comment-to-subscribe conversion spikes when people are genuinely asking for more. Saves from people who wanted to find it again later.",
      stealThis: "Post unfinished things. 'Is this worth finishing?' is the most effective call to action in music Shorts. You're not releasing — you're asking for permission. People love giving it, and that engagement is distribution.",
    },
  ],
  "Hip-Hop": [
    {
      id: 1, title: "dropped 16 bars on the train, nobody noticed", creator: "jay.verses",
      subs: "18K subs", views: "6.7M views", age: "4 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=rapper+freestyle+public+transit+nobody+noticed+short+viral+2024",
      hook: "The location and the anonymity make it feel clandestine. 'Nobody noticed' is immediately funny and sad and intriguing — it perfectly names the independent artist experience and people share it to correct that.",
      formatBreakdown: "iPhone propped against a seat, unsteady angle, train sounds audible throughout. The ambient noise is not removed — it becomes part of the performance. One take, no edits, bars over a phone beat.",
      algorithmSignals: "Authenticity of the location triggered 'you need to see this' sharing. Comments: 'they missed a legend.' The share trigger was collective indignation — people wanted to correct the world's mistake, which compounded reach.",
      stealThis: "Film in real places — not studios, not rented spaces. A train, a stairwell, a parking garage. Real ambient noise signals real performance. The location is credibility you can't fake with gear.",
    },
    {
      id: 2, title: "made this beat in a hotel room at 1am", creator: "prodbyNW",
      subs: "42K subs", views: "3.2M views", age: "7 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=producer+beat+hotel+room+short+laptop+viral+hip+hop+2024",
      hook: "The specific location (hotel room, 1am) creates an image immediately. Specificity is relatability — every producer has made something in a weird place, and this is that feeling made visible.",
      formatBreakdown: "Wide angle showing the full cramped setup: laptop, small MIDI keyboard, hotel lamp. 45 seconds from empty session to finished loop. The clock on the laptop validates the time claim.",
      algorithmSignals: "Saves from producers noting the minimal setup. 'What laptop is that?' and 'what DAW?' threads drive comment engagement as high as music comments — both register as high-signal to the algorithm.",
      stealThis: "Your setup doesn't need to be aspirational — it needs to be real. A cramped, interesting space is more compelling than a staged home studio. The constraint tells a story. Let the room talk.",
    },
    {
      id: 3, title: "this bar hit different when I wrote it", creator: "lue.freeverse",
      subs: "29K subs", views: "2.1M views", age: "2 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=rapper+lyric+reveal+notes+app+bars+short+viral+2024",
      hook: "The notes app lyric reveal signals rawness — no label, no filter, just a thought someone had. The personal-diary format drops all pretense before a single bar is delivered.",
      formatBreakdown: "Notes app screenshot, then transition to delivery. Under 30 seconds. No beat, no filter, no pitch correction. The constraint of no beat actually focuses all attention on the writing.",
      algorithmSignals: "Lyric screengrab is a highly shareable format — people screenshot and re-share the text independently of the video, compounding reach off-platform entirely outside YouTube's own system.",
      stealThis: "Show the writing, not just the result. A lyric in your notes app is more intimate than a polished verse. The rough thing often lands harder than the finished thing — rawness is a production choice.",
    },
  ],
  "Electronic": [
    {
      id: 1, title: "the drop I almost deleted", creator: "86px",
      subs: "51K subs", views: "8.4M views", age: "5 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=producer+drop+almost+deleted+reveal+short+electronic+viral+2024",
      hook: "'Almost deleted' creates immediate stakes. You're not watching a flex — you're watching a rescue. Content that was almost lost feels inherently more valuable than content that was always intended for you.",
      formatBreakdown: "DAW zoomed in, muted track reveal. 20-second build where you can see the waveform but hear nothing, then everything at once. The visual silence before the audio hit is the technique.",
      algorithmSignals: "The drop reveal is one of the highest-completion formats in electronic Shorts — people physically cannot stop before the payoff. Completion rates above 95% trigger aggressive algorithm distribution.",
      stealThis: "Name your Shorts for the emotional history behind them, not the technical content. 'Drop I almost deleted' beats 'my new drop' every time. The vulnerability is the content.",
    },
    {
      id: 2, title: "found this patch and couldn't stop", creator: "synth_void",
      subs: "17K subs", views: "2.6M views", age: "3 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=synth+patch+discovery+short+loop+hypnotic+producer+2024",
      hook: "'Couldn't stop' is contagious — it tells the viewer to feel the same thing before they've heard a note. You're predisposed to agree. Emotional framing in the title is a cheat code.",
      formatBreakdown: "Single synth, no song structure, just the patch looping for 45 seconds over slowly building automation. Minimalist but hypnotic — the simplicity is not laziness, it's restraint as craft.",
      algorithmSignals: "Loop-ability is the hidden metric. A Short that people watch twice because it loops seamlessly registers as longer average view duration. Electronic music loops naturally — use that.",
      stealThis: "Post standalone patches and sounds, not just finished songs. A texture that makes people feel something for 45 seconds is more shareable than a 3-minute track compressed into a Short.",
    },
    {
      id: 3, title: "mixing until 3am and I think I finally got it", creator: "DRVFT.wav",
      subs: "73K subs", views: "5.1M views", age: "8 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=producer+before+after+mix+short+electronic+bedroom+viral+2024",
      hook: "The time ('3am') and uncertainty ('I think') create a very human narrative around a technical task. This isn't a flex — it's a confession. Confessions perform better than announcements.",
      formatBreakdown: "Split audio: rough mix on left vs. finished mix on right, 30 seconds each. The difference is audible through phone speakers — which is the bar you need to clear for a Short to land.",
      algorithmSignals: "Producers save for technique; non-producers share because they can actually hear the difference. Two audiences, both engaged, both doing different things that both register as high-value signal.",
      stealThis: "Show the before and the after. Every mix, every master, every edit. The transformation is the content. People are invested in progress narratives — especially when the gap is audible.",
    },
  ],
  "R&B": [
    {
      id: 1, title: "I didn't plan to sing this, it just came out", creator: "jade.wav",
      subs: "38K subs", views: "4.9M views", age: "4 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=rnb+vocalist+candid+unplanned+vocal+short+bedroom+viral+2024",
      hook: "'Didn't plan to' is the most powerful thing an artist can say about a creative moment. It signals something was channeled, not constructed. Spontaneity performs better than perfection.",
      formatBreakdown: "Phone propped in a kitchen, soft lamp light, no setup visible. She hums, stops, thinks, then just goes. Under 60 seconds. The hesitation before the moment is kept in — it makes it feel real.",
      algorithmSignals: "Comments: 'please release this.' Save rate extremely high — people want to find it again. 'Came back to this 10 times' comments are direct evidence of rewatch behavior the algorithm tracks.",
      stealThis: "Film your accidental moments. Not the rehearsed take — the thing that happened when you weren't trying. Those moments have a quality that a hundred planned recordings can't recreate.",
    },
    {
      id: 2, title: "made a whole song in one sitting — should I drop it?", creator: "elo.creates",
      subs: "24K subs", views: "2.3M views", age: "6 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=rnb+producer+one+sitting+song+should+I+drop+short+2024",
      hook: "The question at the end turns passive viewers into active participants. 'Should I drop it?' has generated hundreds of thousands of 'YES' comments across creators — the ask is a distribution mechanism.",
      formatBreakdown: "Time-lapse of the session — 4 hours in 60 seconds. The clock in the corner validates the one-sitting claim. The finished song plays under the time-lapse so you hear it while watching it get built.",
      algorithmSignals: "The call to action ('should I drop it?') drives comment conversion at 8–12x the average rate. More comments → more algorithmic distribution. The question is not real — it's a trigger.",
      stealThis: "Make your audience feel like collaborators in your decisions. 'Should I drop this?' is an invitation, not a real question. The invite gets more engagement than any announcement ever will.",
    },
    {
      id: 3, title: "wrote this about someone who doesn't know it exists", creator: "summer.grv",
      subs: "57K subs", views: "7.2M views", age: "9 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=rnb+piano+vocal+secret+song+short+viral+bedroom+2024",
      hook: "'Someone who doesn't know it exists' is universally relatable — every listener has a version of this person. You're not singing to your person. You're singing to theirs.",
      formatBreakdown: "Overhead piano shot + face cam split. Minimal framing. The camera occasionally catches an expression that seems private — like you're watching something you weren't supposed to see.",
      algorithmSignals: "This is 'tag someone' content. Shares are aimed at the specific person the lyric is about — or at a friend who needs to hear it. Share velocity ran 3x the genre average for 72 hours.",
      stealThis: "Write titles that describe the emotional situation, not the song. 'Wrote this about someone who doesn't know it exists' is a story. The song is evidence. Lead with the story.",
    },
  ],
  "Alt Rock": [
    {
      id: 1, title: "one take, no click track, no fix", creator: "static.june",
      subs: "31K subs", views: "3.4M views", age: "5 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=alt+rock+one+take+no+fix+guitar+short+raw+viral+2024",
      hook: "The three constraints dare you to hear a mistake. When you don't find one, the accomplishment belongs to you too — you were the witness. Sharing it is sharing the proof.",
      formatBreakdown: "Single shot, garage, one mic, no cuts. 58 seconds. Room tone audible. A minor timing imperfection at 0:32 stays in — which becomes the most-commented moment, driving engagement.",
      algorithmSignals: "Rock audiences are particularly responsive to authenticity signals. Comments divided between 'flawless' and pointing out the timing slip — both groups drove comment engagement to 4x the creator's average.",
      stealThis: "Announce your constraints and then execute. 'One take, no fix' sets an expectation that makes watching feel like witnessing. The constraint is also honesty — you're inviting scrutiny and surviving it.",
    },
    {
      id: 2, title: "recorded this in my closet and I'm not sorry", creator: "pale.static",
      subs: "47K subs", views: "1.9M views", age: "3 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=bedroom+alt+rock+closet+recording+diy+short+viral+2024",
      hook: "'I'm not sorry' reframes DIY not as an apology but as a choice. It positions the constraint as a statement of values — which is inherently more interesting than a statement of capability.",
      formatBreakdown: "Claustrophobic framing, literally in a closet. Dampened acoustics you can hear. Phone against the wall. The compression of the space creates an intimacy that a full studio room never could.",
      algorithmSignals: "DIY content performs well in alt rock because the audience identifies with the constraints. Comments: 'this sounds better than half the major label stuff I've heard this year.'",
      stealThis: "Own your setup, don't apologize for it. 'Recorded in my closet' is not an excuse — it's a story. The constraint becomes the identity. And identity is what people follow, not production budgets.",
    },
    {
      id: 3, title: "found a tone I've been chasing for 3 years", creator: "gravel.tone",
      subs: "19K subs", views: "2.7M views", age: "7 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=guitar+tone+amp+pedal+found+it+short+alt+rock+viral+2024",
      hook: "'3 years' creates emotional weight around a technical detail. Every guitarist has a tone they've been chasing — you're speaking directly to their specific, private obsession.",
      formatBreakdown: "45-second clip: pedal chain and amp settings shown first, then just playing. No talking, no explanation. Gear-forward format where the sound IS the argument.",
      algorithmSignals: "Save rate from guitarists noting every setting. Comment threads on gear choices that ran 200+ replies — the algorithm sees sustained comment engagement and keeps distributing. Saves also compound over time.",
      stealThis: "For guitar content, detail is the product. Show every knob, every pedal. 'Found it after 3 years' + the gear reveal creates a community event, not just a video. The specificity is the invitation.",
    },
  ],
  "Lo-Fi": [
    {
      id: 1, title: "made this on my phone during lunch", creator: "pocketbeats",
      subs: "15K subs", views: "4.4M views", age: "4 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=lofi+beat+phone+garageband+lunch+break+short+viral+2024",
      hook: "'During lunch' makes music-making feel accessible — not a studio skill, a lunch break skill. Accessibility is the most democratic value in lo-fi, and this is it made literal.",
      formatBreakdown: "Phone screen mirrored, GarageBand visible, beat built in real time in 55 seconds. Creator never shows their face. The tool is the star — which makes the viewer think 'I have this app.'",
      algorithmSignals: "Save rate extremely high — people bookmarking to try it themselves. Tutorial-adjacent content gets saved more than watched. The saves compound into long-tail discovery weeks after posting.",
      stealThis: "Remove every barrier from your process video. Phone + free app + lunch break is the most accessible creative setup imaginable. Accessible process converts viewers into attempted creators — your most loyal followers.",
    },
    {
      id: 2, title: "rain sample + one chord = this", creator: "cloudy.wav",
      subs: "42K subs", views: "2.8M views", age: "2 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=lofi+rain+sample+one+chord+minimal+beat+short+viral+2024",
      hook: "The equation format (rain + one chord = this) is satisfying as pure structure. You're given inputs and promised an output, and you stay to see the math resolve.",
      formatBreakdown: "Shows the rain sample layered first, then a single piano chord added on top. Nothing else added. 40 seconds. The finished product is genuinely minimal — the simplicity is the flex.",
      algorithmSignals: "The simplicity of the formula is the share trigger — people share it specifically because it seems achievable. 'I could make this' is the most powerful response content can generate in terms of saves and shares.",
      stealThis: "Simplify your formula until it feels doable. 'Rain + one chord' sounds like something anyone can try. Content that makes people think 'I should try this' gets saved and shared at a fundamentally different level.",
    },
    {
      id: 3, title: "found a vinyl skip and built a beat around it", creator: "night.flip",
      subs: "27K subs", views: "1.6M views", age: "6 months ago", format: "YouTube Short",
      videoId: null,
      youtubeLink: "https://www.youtube.com/results?search_query=lofi+vinyl+skip+sample+flip+beat+short+producer+2024",
      hook: "The accident (a vinyl skip) as the starting point romanticizes the lo-fi process before a note is played. Imperfection as creative input is the genre's origin myth — this embodies it.",
      formatBreakdown: "Vinyl player visible throughout. The skip isolated and looped, then a chord and a kick built around it. The skip stays audible in the final beat — it's preserved, not corrected. That choice is the statement.",
      algorithmSignals: "The specificity of the accident (a vinyl skip, not 'a sample') makes this feel found, not constructed. Comments: 'the skip IS the song.' Save rate high from producers noting the crate-digging technique.",
      stealThis: "Document accidents. A vinyl skip, a wrong note that worked, a mic bleed that became texture. The most interesting lo-fi sounds were discovered, not designed. Your mistakes are your differentiator.",
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

  // Auto-analyze when a valid Spotify artist URL is pasted
  useEffect(() => {
    const isArtistUrl = /open\.spotify\.com\/artist\/[a-zA-Z0-9]+/.test(spotifyUrl)
    if (!isArtistUrl) { setArtistAnalysis(null); return }

    let cancelled = false
    setArtistAnalysis({ loading: true })

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
        }
      })
      .catch(err => { if (!cancelled) setArtistAnalysis({ error: err.message }) })

    return () => { cancelled = true }
  }, [spotifyUrl])

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
            <p style={{ fontSize: 13, color: "#8B8680", marginBottom: 28, lineHeight: 1.6 }}>We{"'"}ll use this to personalize your dashboard and content strategy.</p>
            <input type="text" placeholder="Your artist or project name" value={artistName} onChange={e => setArtistName(e.target.value)} onKeyDown={e => e.key === "Enter" && artistName.trim() && setStep(2)} autoFocus style={{ display: "block", width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", color: "#E8E6E1", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
            <div style={{ position: "relative", marginBottom: 8 }}>
              <input
                type="url"
                placeholder="Paste your Spotify artist URL to auto-detect genre + vibe"
                value={spotifyUrl}
                onChange={e => setSpotifyUrl(e.target.value)}
                style={{ display: "block", width: "100%", background: artistAnalysis?.ok ? "rgba(29,185,84,0.06)" : "rgba(255,255,255,0.04)", border: `1px solid ${artistAnalysis?.ok ? "rgba(29,185,84,0.3)" : artistAnalysis?.error ? "rgba(248,113,113,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 44px 14px 16px", color: "#E8E6E1", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>
                {artistAnalysis?.loading && <span style={{ color: "#6B6560", animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>}
                {artistAnalysis?.ok      && <span style={{ color: "#1DB954" }}>✓</span>}
                {artistAnalysis?.error   && <span style={{ color: "#F87171" }}>✗</span>}
              </div>
            </div>

            {/* Analysis result card */}
            {artistAnalysis?.ok && (
              <div style={{ background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  {artistAnalysis.image && <img src={artistAnalysis.image} alt={artistAnalysis.name} style={{ width: 40, height: 40, borderRadius: 99, objectFit: "cover" }} />}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1" }}>{artistAnalysis.name}</div>
                    <div style={{ fontSize: 11, color: "#6B6560" }}>{artistAnalysis.followers?.toLocaleString()} followers · {artistAnalysis.popularity} popularity</div>
                  </div>
                </div>
                {artistAnalysis.detectedGenre && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.04em" }}>Detected genre</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1DB954", background: "rgba(29,185,84,0.1)", padding: "2px 10px", borderRadius: 99 }}>{artistAnalysis.detectedGenre}</span>
                  </div>
                )}
                {artistAnalysis.detectedVibes?.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {artistAnalysis.detectedVibes.map(v => (
                      <span key={v} style={{ fontSize: 11, color: "#A78BFA", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", padding: "2px 8px", borderRadius: 99 }}>{v}</span>
                    ))}
                  </div>
                )}
                {!artistAnalysis.confident && (
                  <p style={{ margin: "8px 0 0", fontSize: 11, color: "#6B6560", lineHeight: 1.5 }}>Limited track data — you can refine your genre and vibe on the next steps.</p>
                )}
              </div>
            )}

            {/* Analysis error — prompt manual flow */}
            {artistAnalysis?.error && (
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#FCA5A5", lineHeight: 1.5 }}>Couldn{"'"}t analyze this profile — you{"'"}ll pick your genre and vibe manually on the next steps.</p>
              </div>
            )}

            {!spotifyUrl && (
              <p style={{ fontSize: 11, color: "#4B4540", marginTop: 4, marginBottom: 0 }}>Optional — we{"'"}ll detect your genre and vibe automatically from your Spotify profile.</p>
            )}

            <div style={{ height: 24 }} />
            <button
              onClick={() => artistName.trim() && setStep(2)}
              disabled={!artistName.trim() || artistAnalysis?.loading}
              style={{ display: "block", width: "100%", background: (artistName.trim() && !artistAnalysis?.loading) ? "#7C3AED" : "rgba(124,58,237,0.25)", border: "none", borderRadius: 12, padding: "15px", color: (artistName.trim() && !artistAnalysis?.loading) ? "#fff" : "#6B6560", fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: (artistName.trim() && !artistAnalysis?.loading) ? "pointer" : "not-allowed", transition: "all 0.15s" }}
            >
              {artistAnalysis?.loading ? "Analyzing your music…" : "Continue"}
            </button>
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
            <SpotifyLookup genreMeta={genreMeta} />
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
