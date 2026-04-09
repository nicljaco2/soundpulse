'use client'

import { useState } from "react"

const GENRE_OPTIONS = ["Indie Pop", "Hip-Hop", "Electronic", "R&B", "Alt Rock", "Lo-Fi"]

const ALL_SOUNDS = {
  "Indie Pop": [
    { id: 1, title: "Velvet Haze", artist: "poolboy", platform: "TikTok", videos: "284K", growth: "+1,240%", daysActive: 3, mood: "dreamy", bpm: 98, hook: "0:14\u20130:28 chorus drop", suggestion: "Use the 14-sec chorus hook over a 'day in my life' aesthetic \u2014 golden hour lighting, slow motion transitions" },
    { id: 2, title: "Static Love", artist: "NIKA", platform: "Reels", videos: "156K", growth: "+680%", daysActive: 5, mood: "nostalgic", bpm: 112, hook: "0:22\u20130:36 bridge vocal", suggestion: "Film a 'then vs now' split-screen with the bridge vocal as the transition beat" },
    { id: 3, title: "Neon Tears", artist: "glass animal collective", platform: "TikTok", videos: "91K", growth: "+320%", daysActive: 7, mood: "melancholic", bpm: 86, hook: "0:08\u20130:22 intro riff", suggestion: "The intro riff is perfect for a slow-reveal \u2014 start with a close-up detail shot, pull back on the drop" },
    { id: 4, title: "Cheap Wine", artist: "somegirl", platform: "YouTube Shorts", videos: "67K", growth: "+190%", daysActive: 4, mood: "playful", bpm: 124, hook: "0:00\u20130:15 opening verse", suggestion: "The opening verse works for 'unpopular opinion' or 'things that just hit different' format" },
    { id: 5, title: "Blurface", artist: "TVquiet", platform: "TikTok", videos: "43K", growth: "+890%", daysActive: 1, mood: "experimental", bpm: 76, hook: "0:18\u20130:30 beat switch", suggestion: "Early trend \u2014 beat switch is ideal for transformation/glow-up reveals. Get in now before saturation" },
  ],
  "Hip-Hop": [
    { id: 1, title: "Block Rotation", artist: "Fwaygo", platform: "TikTok", videos: "412K", growth: "+960%", daysActive: 2, mood: "aggressive", bpm: 140, hook: "0:04\u20130:18 opening bars", suggestion: "The opening bars are perfect for 'day in my city' walk-and-talk format \u2014 film in portrait, raw energy" },
    { id: 2, title: "Trunk Knock", artist: "DJ Swerve", platform: "TikTok", videos: "228K", growth: "+540%", daysActive: 4, mood: "energetic", bpm: 156, hook: "0:10\u20130:22 bass drop", suggestion: "Car audio check format \u2014 film the subwoofer hitting, then cut to you performing over the bass drop" },
    { id: 3, title: "Ghost Lane", artist: "Mvrci", platform: "Reels", videos: "134K", growth: "+380%", daysActive: 6, mood: "melancholic", bpm: 82, hook: "0:16\u20130:30 hook vocal", suggestion: "Late-night visuals \u2014 city lights, rain, low angles. The hook vocal fits introspective storytelling" },
    { id: 4, title: "No Cap Freestyle", artist: "Relly B", platform: "YouTube Shorts", videos: "89K", growth: "+270%", daysActive: 3, mood: "playful", bpm: 130, hook: "0:00\u20130:12 first verse", suggestion: "Freestyle challenge \u2014 rap over the first 12 seconds then switch to YOUR beat. The transition gets shares" },
    { id: 5, title: "Southside Anthem", artist: "K Dolo", platform: "TikTok", videos: "51K", growth: "+1,100%", daysActive: 1, mood: "aggressive", bpm: 148, hook: "0:20\u20130:32 chant section", suggestion: "Brand new \u2014 the chant section is built for crew/group videos. Film your squad or concert footage over it" },
  ],
  "Electronic": [
    { id: 1, title: "Dissolve", artist: "Kairn", platform: "TikTok", videos: "198K", growth: "+720%", daysActive: 3, mood: "dreamy", bpm: 128, hook: "0:30\u20130:45 synth build", suggestion: "Time-lapse transitions synced to the build \u2014 sunrise, clouds, city lights. Let the synth carry the visual" },
    { id: 2, title: "Pulse Grid", artist: "AERA", platform: "Reels", videos: "142K", growth: "+450%", daysActive: 5, mood: "energetic", bpm: 136, hook: "0:12\u20130:26 drop", suggestion: "Glitch edit format \u2014 quick cuts synced to the drum hits, each cut revealing a new angle or location" },
    { id: 3, title: "Midnight Protocol", artist: "Sylva", platform: "TikTok", videos: "87K", growth: "+310%", daysActive: 8, mood: "dark", bpm: 122, hook: "0:08\u20130:20 bassline", suggestion: "The bassline works for moody outfit/aesthetic reveals \u2014 dark lighting, high contrast, minimal movement" },
    { id: 4, title: "Crystal Freq", artist: "N\u00d8VA", platform: "YouTube Shorts", videos: "63K", growth: "+580%", daysActive: 2, mood: "experimental", bpm: 140, hook: "0:18\u20130:32 arp sequence", suggestion: "Arp sequence is perfect for tech/gear showcase \u2014 show your setup, plug in cables synced to the arps" },
    { id: 5, title: "Deep Channel", artist: "Mira Void", platform: "TikTok", videos: "38K", growth: "+940%", daysActive: 1, mood: "hypnotic", bpm: 118, hook: "0:22\u20130:36 vocal chop", suggestion: "Very early \u2014 the vocal chop loop works for hypnotic visual loops. Film a simple repeating action, match the loop" },
  ],
  "R&B": [
    { id: 1, title: "Slow Burn", artist: "Amira K", platform: "TikTok", videos: "267K", growth: "+830%", daysActive: 3, mood: "sensual", bpm: 72, hook: "0:10\u20130:24 chorus", suggestion: "The chorus is trending for 'getting ready' GRWM content \u2014 soft lighting, mirror shots, slow movements" },
    { id: 2, title: "After Hours", artist: "Dex Monroe", platform: "Reels", videos: "189K", growth: "+490%", daysActive: 5, mood: "nostalgic", bpm: 88, hook: "0:20\u20130:34 bridge", suggestion: "Late-night drive format \u2014 dashboard camera, city lights passing, lip-sync the bridge from the driver's seat" },
    { id: 3, title: "Honey Drip", artist: "Solei", platform: "TikTok", videos: "112K", growth: "+360%", daysActive: 6, mood: "playful", bpm: 96, hook: "0:06\u20130:18 verse groove", suggestion: "The verse groove fits cooking/self-care content \u2014 film a routine with smooth, confident energy" },
    { id: 4, title: "Phantom Touch", artist: "Jae Ellis", platform: "YouTube Shorts", videos: "78K", growth: "+270%", daysActive: 4, mood: "melancholic", bpm: 68, hook: "0:14\u20130:28 vocal run", suggestion: "The vocal run is being used for 'missing someone' storytelling \u2014 pair with old photos or text message screenshots" },
    { id: 5, title: "Velvet Room", artist: "NYLA", platform: "TikTok", videos: "34K", growth: "+1,050%", daysActive: 1, mood: "sensual", bpm: 78, hook: "0:08\u20130:20 intro piano", suggestion: "Just emerging \u2014 the piano intro works for elegant outfit reveals and 'soft life' aesthetic content" },
  ],
  "Alt Rock": [
    { id: 1, title: "Concrete Bloom", artist: "Rust Theory", platform: "TikTok", videos: "176K", growth: "+620%", daysActive: 4, mood: "aggressive", bpm: 158, hook: "0:08\u20130:22 riff + scream", suggestion: "The riff hits hard for 'things that make me lose it' format \u2014 build tension with calm footage, then cut to chaos on the scream" },
    { id: 2, title: "Paper Walls", artist: "Silo Effect", platform: "Reels", videos: "124K", growth: "+410%", daysActive: 5, mood: "melancholic", bpm: 98, hook: "0:18\u20130:32 chorus swell", suggestion: "The chorus swell works for time-lapse transitions \u2014 start tight, pull wide as the swell hits. Nature shots work well" },
    { id: 3, title: "Wired Shut", artist: "The Greys", platform: "TikTok", videos: "82K", growth: "+340%", daysActive: 7, mood: "dark", bpm: 132, hook: "0:04\u20130:16 opening riff", suggestion: "Raw performance format \u2014 film yourself playing along, messy room, real energy. Authenticity wins" },
    { id: 4, title: "Satellite Town", artist: "Lowbloom", platform: "YouTube Shorts", videos: "56K", growth: "+290%", daysActive: 3, mood: "nostalgic", bpm: 108, hook: "0:12\u20130:26 verse melody", suggestion: "Hometown footage format \u2014 film your neighborhood, local spots, small-town vibes over the verse melody" },
    { id: 5, title: "Nerve Ending", artist: "SPILL", platform: "TikTok", videos: "29K", growth: "+870%", daysActive: 1, mood: "experimental", bpm: 144, hook: "0:20\u20130:32 breakdown", suggestion: "Brand new \u2014 the breakdown is intense. Film a practice session and cut the most chaotic 12 seconds" },
  ],
  "Lo-Fi": [
    { id: 1, title: "Rainy Window", artist: "sleepyhead", platform: "TikTok", videos: "302K", growth: "+780%", daysActive: 3, mood: "dreamy", bpm: 72, hook: "0:00\u20130:20 full loop", suggestion: "The full loop is made for study/work ambiance content \u2014 film your desk setup, coffee being poured, rain on a window" },
    { id: 2, title: "Tape Hiss", artist: "Mondo Loops", platform: "Reels", videos: "167K", growth: "+520%", daysActive: 4, mood: "nostalgic", bpm: 80, hook: "0:08\u20130:22 piano chop", suggestion: "VHS filter aesthetic \u2014 film everyday moments through a vintage effect, let the piano chop set the mood" },
    { id: 3, title: "3AM Thoughts", artist: "jinsang", platform: "TikTok", videos: "98K", growth: "+310%", daysActive: 6, mood: "melancholic", bpm: 68, hook: "0:14\u20130:28 guitar sample", suggestion: "Journal/sketchbook content \u2014 film yourself writing, drawing, or staring out a window. The guitar sample carries emotion" },
    { id: 4, title: "Warm Dust", artist: "SwuM", platform: "YouTube Shorts", videos: "74K", growth: "+260%", daysActive: 5, mood: "dreamy", bpm: 76, hook: "0:10\u20130:24 vinyl crackle intro", suggestion: "Record player footage \u2014 show the vinyl spinning, the needle dropping. Analog vibes match the crackle perfectly" },
    { id: 5, title: "Bokeh", artist: "quickly, quickly", platform: "TikTok", videos: "31K", growth: "+950%", daysActive: 1, mood: "experimental", bpm: 84, hook: "0:16\u20130:30 beat switch", suggestion: "Very early \u2014 the beat switch works for 'focus mode on vs off' content. Calm studying then chaotic real life" },
  ],
}

const ALL_IDEAS = {
  "Indie Pop": [
    { id: 1, type: "Trend Ride", title: "Velvet Haze chorus challenge", effort: "Low", impact: "High", timing: "Post today \u2014 peak window", description: "Record a 15-sec clip of you vibing to your own track using the Velvet Haze format. Swap in YOUR chorus at the 14-sec mark.", format: "TikTok / Reels", tags: ["#indiemusic", "#newmusic", "#velvethazetrend"] },
    { id: 2, type: "Original", title: "Studio session time-lapse", effort: "Medium", impact: "Medium", description: "Film your next recording session. Speed it up to 60 seconds. Overlay your latest track. 2-3x normal engagement.", format: "TikTok / Reels / Shorts", tags: ["#studiolife", "#musicproduction", "#behindthemusic"] },
    { id: 3, type: "Engagement", title: "'Which version?' A/B poll", effort: "Low", impact: "High", description: "Post two 10-sec clips of the same song section with different production choices. Ask followers to vote.", format: "TikTok / Instagram Stories", tags: ["#whichversion", "#newmusic", "#indieartist"] },
    { id: 4, type: "Trend Ride", title: "Blurface beat-switch reveal", effort: "Medium", impact: "Very High", description: "The Blurface beat-switch is brand new (+890% growth). Film a before/after transformation, end on YOUR song.", format: "TikTok", tags: ["#blurface", "#beatswitchchallenge", "#indiemusic"] },
    { id: 5, type: "Evergreen", title: "How I wrote [your song title]", effort: "Medium", impact: "Medium", description: "Show the voice memo, the first demo, then the final version. Humanizes your process.", format: "YouTube Shorts / TikTok", tags: ["#songwriting", "#process", "#musicmaker"] },
  ],
  "Hip-Hop": [
    { id: 1, type: "Trend Ride", title: "Southside Anthem chant video", effort: "Low", impact: "Very High", timing: "Post today \u2014 trend is 1 day old", description: "Film your people or concert footage with the chant, then hard-cut to YOUR track.", format: "TikTok", tags: ["#hiphop", "#newrap", "#southsideanthem"] },
    { id: 2, type: "Original", title: "Freestyle over trending beat", effort: "Low", impact: "High", description: "Pick the Block Rotation instrumental and spit a 15-second freestyle. Raw, one-take, phone camera.", format: "TikTok / Reels", tags: ["#freestyle", "#bars", "#hiphop"] },
    { id: 3, type: "Engagement", title: "'Hard or trash?' snippet poll", effort: "Low", impact: "High", description: "Post a 10-sec snippet of your upcoming track and ask 'hard or trash?' Drives massive comment engagement.", format: "TikTok / Instagram Stories", tags: ["#hardortrash", "#newmusic", "#snippet"] },
    { id: 4, type: "Trend Ride", title: "Block Rotation walk-and-talk", effort: "Medium", impact: "High", description: "Film yourself walking your neighborhood, talking about your come-up story over the Block Rotation beat.", format: "TikTok / Reels", tags: ["#dayinmylife", "#raplife", "#blockrotation"] },
    { id: 5, type: "Evergreen", title: "Beat breakdown: how I made it", effort: "Medium", impact: "Medium", description: "Screen record your DAW, show layers one by one. Producer content builds dedicated followings.", format: "YouTube Shorts / TikTok", tags: ["#beatmaking", "#producer", "#behindthebeat"] },
  ],
  "Electronic": [
    { id: 1, type: "Trend Ride", title: "Deep Channel hypnotic loop", effort: "Low", impact: "Very High", timing: "Post today \u2014 only 1 day old", description: "Film a simple repeating action synced to the vocal chop, then blend in YOUR synth.", format: "TikTok", tags: ["#electronic", "#deepchannel", "#hypnotic"] },
    { id: 2, type: "Original", title: "Gear/setup showcase", effort: "Medium", impact: "High", description: "Film your synths, controllers, and setup with dramatic lighting. Overlay your track. Tag gear brands.", format: "TikTok / Reels / Shorts", tags: ["#synth", "#musicgear", "#producer"] },
    { id: 3, type: "Engagement", title: "'Drop A or Drop B?' poll", effort: "Low", impact: "High", description: "Post two different drop variations. Electronic audiences are opinionated about drops.", format: "TikTok / Instagram Stories", tags: ["#whichdrop", "#electronicmusic", "#newmusic"] },
    { id: 4, type: "Trend Ride", title: "Crystal Freq arp gear video", effort: "Medium", impact: "High", description: "Film yourself patching cables synced to the arps, then transition to your own arp.", format: "TikTok", tags: ["#modular", "#crystalfreq", "#synthwave"] },
    { id: 5, type: "Evergreen", title: "Sound design tutorial", effort: "High", impact: "High", description: "Show how you designed one specific sound from your latest track. Educational content builds loyal followers.", format: "YouTube Shorts / TikTok", tags: ["#sounddesign", "#tutorial", "#producer"] },
  ],
  "R&B": [
    { id: 1, type: "Trend Ride", title: "Velvet Room soft-life reveal", effort: "Low", impact: "Very High", timing: "Post today \u2014 just emerged", description: "Film a morning routine with warm lighting, transition to YOUR chorus over the piano intro.", format: "TikTok / Reels", tags: ["#rnb", "#softlife", "#velvetroom"] },
    { id: 2, type: "Original", title: "GRWM with your track", effort: "Low", impact: "High", description: "Getting Ready With Me format. Film your pre-show routine with your latest track playing.", format: "TikTok / Reels", tags: ["#grwm", "#rnb", "#newrnb"] },
    { id: 3, type: "Engagement", title: "'Vibe check' snippet reaction", effort: "Low", impact: "High", description: "Film yourself reacting to your own snippet like you're hearing it fresh. Ask followers for their vibe check.", format: "TikTok / Instagram Stories", tags: ["#vibecheck", "#newrnb", "#snippet"] },
    { id: 4, type: "Trend Ride", title: "Slow Burn GRWM", effort: "Medium", impact: "High", description: "Slow Burn's chorus is dominating GRWM content. Film your version but swap in your track at the hook.", format: "TikTok / Reels", tags: ["#slowburn", "#grwm", "#rnb"] },
    { id: 5, type: "Evergreen", title: "Vocal harmony breakdown", effort: "Medium", impact: "Medium", description: "Layer your harmonies one at a time on camera. R&B fans love watching harmonies stack. Massive saves.", format: "YouTube Shorts / TikTok", tags: ["#harmonies", "#vocals", "#rnbsinger"] },
  ],
  "Alt Rock": [
    { id: 1, type: "Trend Ride", title: "Nerve Ending jam session", effort: "Low", impact: "Very High", timing: "Post today \u2014 1 day old, moving fast", description: "Film the most chaotic 12 seconds of a practice session, then hard-cut to YOUR breakdown.", format: "TikTok", tags: ["#altrock", "#nerveending", "#jamsession"] },
    { id: 2, type: "Original", title: "Pedal board walkthrough", effort: "Medium", impact: "High", description: "Show your pedal chain, demo each effect, land on your signature tone. Gets shared in guitarist communities.", format: "TikTok / Reels / Shorts", tags: ["#pedalboard", "#guitartone", "#altrock"] },
    { id: 3, type: "Engagement", title: "'Clean or dirty?' tone poll", effort: "Low", impact: "High", description: "Post the same riff with clean tone vs distortion. Guitar content drives debates, debates drive comments.", format: "TikTok / Instagram Stories", tags: ["#cleanordirty", "#guitartone", "#altrock"] },
    { id: 4, type: "Trend Ride", title: "Concrete Bloom rage cut", effort: "Medium", impact: "High", description: "Build tension with calm footage, then SLAM cut to full intensity on the riff. The contrast gets replays.", format: "TikTok / Reels", tags: ["#concretebloom", "#altrock", "#rage"] },
    { id: 5, type: "Evergreen", title: "Cover to original transition", effort: "Medium", impact: "Medium", description: "Play 10 seconds of a well-known song, then seamlessly transition into YOUR song with similar energy.", format: "YouTube Shorts / TikTok", tags: ["#cover", "#original", "#altrock"] },
  ],
  "Lo-Fi": [
    { id: 1, type: "Trend Ride", title: "Bokeh beat-switch study reel", effort: "Low", impact: "Very High", timing: "Post today \u2014 brand new trend", description: "Film calm studying, then cut to chaotic real life on the switch. Drop YOUR track into the calm section.", format: "TikTok", tags: ["#lofi", "#bokeh", "#studyvibes"] },
    { id: 2, type: "Original", title: "Sampling process video", effort: "Medium", impact: "High", description: "Show the original vinyl, chop it on camera, add drums, reveal the final beat. Lo-fi fans love the craft.", format: "TikTok / Reels / Shorts", tags: ["#sampling", "#lofibeats", "#beatmaking"] },
    { id: 3, type: "Engagement", title: "'Study or sleep?' vibe poll", effort: "Low", impact: "High", description: "Post a 15-sec loop and ask if it's a study beat or a sleep beat. Simple but drives saves and comments.", format: "TikTok / Instagram Stories", tags: ["#studyorsleep", "#lofi", "#vibecheck"] },
    { id: 4, type: "Trend Ride", title: "Rainy Window desk setup", effort: "Low", impact: "High", description: "Film your desk, window, coffee \u2014 the cozy aesthetic. Slip YOUR loop in at the halfway mark.", format: "TikTok / Reels", tags: ["#rainywindow", "#desksetup", "#lofi"] },
    { id: 5, type: "Evergreen", title: "1 hour loop teaser", effort: "Low", impact: "Medium", description: "Post a 15-sec clip with 'full 1-hour version on my channel.' Drives traffic to long-form.", format: "YouTube Shorts / TikTok", tags: ["#lofibeats", "#studymusic", "#chill"] },
  ],
}

const ALL_CALENDARS = {
  "Indie Pop":   [{ day: "Mon", task: "Film Velvet Haze trend content", type: "create" },{ day: "Tue", task: "Post Velvet Haze trend video", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, duet fans", type: "engage" },{ day: "Thu", task: "Film studio session time-lapse", type: "create" },{ day: "Fri", task: "Post A/B poll + studio content", type: "post" },{ day: "Sat", task: "Engage \u2014 comment on 10 similar artists", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Hip-Hop":     [{ day: "Mon", task: "Record freestyle over Block Rotation", type: "create" },{ day: "Tue", task: "Post freestyle + Southside chant video", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, repost fans", type: "engage" },{ day: "Thu", task: "Film beat breakdown screen recording", type: "create" },{ day: "Fri", task: "Post 'hard or trash?' snippet poll", type: "post" },{ day: "Sat", task: "Engage \u2014 collab DMs to 5 local artists", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Electronic":  [{ day: "Mon", task: "Film gear showcase with dramatic lighting", type: "create" },{ day: "Tue", task: "Post Deep Channel hypnotic loop video", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, share setups", type: "engage" },{ day: "Thu", task: "Record sound design tutorial", type: "create" },{ day: "Fri", task: "Post 'Drop A or B?' poll + tutorial", type: "post" },{ day: "Sat", task: "Engage \u2014 comment in producer communities", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "R&B":         [{ day: "Mon", task: "Film GRWM with your latest track", type: "create" },{ day: "Tue", task: "Post Velvet Room soft-life reveal", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, duet covers", type: "engage" },{ day: "Thu", task: "Record vocal harmony breakdown", type: "create" },{ day: "Fri", task: "Post 'vibe check' snippet + harmonies", type: "post" },{ day: "Sat", task: "Engage \u2014 connect with 10 R&B creators", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Alt Rock":    [{ day: "Mon", task: "Film Nerve Ending jam session clip", type: "create" },{ day: "Tue", task: "Post jam clip + Concrete Bloom rage cut", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, share covers", type: "engage" },{ day: "Thu", task: "Film pedal board walkthrough", type: "create" },{ day: "Fri", task: "Post 'clean or dirty?' tone poll", type: "post" },{ day: "Sat", task: "Engage \u2014 comment on 10 band pages", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
  "Lo-Fi":       [{ day: "Mon", task: "Film sampling process video", type: "create" },{ day: "Tue", task: "Post Bokeh beat-switch study reel", type: "post" },{ day: "Wed", task: "Engage \u2014 reply to comments, share vibes", type: "engage" },{ day: "Thu", task: "Film Rainy Window desk setup content", type: "create" },{ day: "Fri", task: "Post 'study or sleep?' poll + desk vid", type: "post" },{ day: "Sat", task: "Engage \u2014 share beats in lo-fi communities", type: "engage" },{ day: "Sun", task: "Plan next week + review analytics", type: "plan" }],
}

const ALL_STATS = {
  "Indie Pop":   { monthlyListeners: "34,200", listenersChange: "+8.2%", followers: "12,800", followersChange: "+3.1%", playlistReach: "89K", playlistChange: "+12%" },
  "Hip-Hop":     { monthlyListeners: "52,400", listenersChange: "+14.6%", followers: "28,300", followersChange: "+5.8%", playlistReach: "134K", playlistChange: "+18%" },
  "Electronic":  { monthlyListeners: "41,800", listenersChange: "+11.3%", followers: "19,200", followersChange: "+4.2%", playlistReach: "112K", playlistChange: "+9%" },
  "R&B":         { monthlyListeners: "28,600", listenersChange: "+6.7%", followers: "15,400", followersChange: "+2.9%", playlistReach: "76K", playlistChange: "+11%" },
  "Alt Rock":    { monthlyListeners: "22,100", listenersChange: "+5.4%", followers: "9,800", followersChange: "+2.1%", playlistReach: "54K", playlistChange: "+7%" },
  "Lo-Fi":       { monthlyListeners: "47,900", listenersChange: "+12.1%", followers: "22,600", followersChange: "+6.3%", playlistReach: "203K", playlistChange: "+22%" },
}

const ALL_ALERTS = {
  "Indie Pop":  { title: "Blurface beat-switch", stat: "43K videos in just 1 day with +890% growth", desc: "Artists who post in the first 48 hours get 3-5x more algorithmic distribution." },
  "Hip-Hop":    { title: "Southside Anthem chant", stat: "51K videos in 1 day with +1,100% growth", desc: "The chant format is built for crew videos \u2014 early adopters are getting massive reach." },
  "Electronic": { title: "Deep Channel vocal chop", stat: "38K videos in 1 day with +940% growth", desc: "Hypnotic loop content is surging. Simple repeating visuals synced to the chop are winning." },
  "R&B":        { title: "Velvet Room piano intro", stat: "34K videos in 1 day with +1,050% growth", desc: "Soft-life aesthetic is peaking right now. The piano intro fits perfectly." },
  "Alt Rock":   { title: "Nerve Ending breakdown", stat: "29K videos in 1 day with +870% growth", desc: "Raw energy content is trending \u2014 messy jam sessions outperform polished clips." },
  "Lo-Fi":      { title: "Bokeh beat switch", stat: "31K videos in 1 day with +950% growth", desc: "Study vs. chaos format is blowing up. Simple to film, high save rate." },
}

const typeColors = {
  create: { bg: "#2D1B69", text: "#C4B5FD", dot: "#A78BFA" },
  post: { bg: "#1B3A2D", text: "#86EFAC", dot: "#4ADE80" },
  engage: { bg: "#3A2A1B", text: "#FCD34D", dot: "#FBBF24" },
  plan: { bg: "#1B2D3A", text: "#93C5FD", dot: "#60A5FA" },
}
const platformColors = { TikTok: "#FF004F", Reels: "#E1306C", "YouTube Shorts": "#FF0000" }
const moodStyles = { dreamy: { bg: "#312E81", text: "#C4B5FD" }, nostalgic: { bg: "#713F12", text: "#FDE68A" }, melancholic: { bg: "#1E3A5F", text: "#93C5FD" }, playful: { bg: "#14532D", text: "#86EFAC" }, experimental: { bg: "#4C1D95", text: "#DDD6FE" }, aggressive: { bg: "#5B1A1A", text: "#FCA5A5" }, energetic: { bg: "#1B3A2D", text: "#86EFAC" }, dark: { bg: "#1F1F2E", text: "#A5B4FC" }, hypnotic: { bg: "#312E81", text: "#DDD6FE" }, sensual: { bg: "#4C1130", text: "#F9A8D4" } }
const ideaTypeStyles = { "Trend Ride": { color: "#F472B6", bg: "rgba(244,114,182,0.12)" }, "Original": { color: "#60A5FA", bg: "rgba(96,165,250,0.12)" }, "Engagement": { color: "#FBBF24", bg: "rgba(251,191,36,0.12)" }, "Evergreen": { color: "#4ADE80", bg: "rgba(74,222,128,0.12)" } }

function MoodTag({ mood }) {
  const s = moodStyles[mood] || { bg: "#374151", text: "#D1D5DB" }
  return <span style={{ background: s.bg, color: s.text, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, letterSpacing: "0.02em" }}>{mood}</span>
}
function PlatformBadge({ platform }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, color: platformColors[platform] || "#ccc" }}><span style={{ width: 5, height: 5, borderRadius: 99, background: platformColors[platform] || "#ccc" }} />{platform}</span>
}

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Indie Pop")
  const [expandedSound, setExpandedSound] = useState(null)
  const [expandedIdea, setExpandedIdea] = useState(null)
  const [activeTab, setActiveTab] = useState("brief")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [calendarDone, setCalendarDone] = useState({})

  const sounds = ALL_SOUNDS[selectedGenre]
  const ideas = ALL_IDEAS[selectedGenre]
  const stats = ALL_STATS[selectedGenre]
  const alert = ALL_ALERTS[selectedGenre]
  const calendarTemplate = ALL_CALENDARS[selectedGenre]

  const handleGenreChange = (genre) => { setSelectedGenre(genre); setExpandedSound(null); setExpandedIdea(null) }
  const toggleCalendar = (i) => { const k = selectedGenre + "-" + i; setCalendarDone(prev => ({ ...prev, [k]: !prev[k] })) }
  const handleWaitlist = (e) => { e.preventDefault(); if (email.trim()) setSubmitted(true) }

  const tabs = [{ id: "brief", label: "Daily brief" }, { id: "trends", label: "Trending sounds" }, { id: "calendar", label: "This week" }]

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>
      <div style={{ padding: "28px 20px 0", background: "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#A78BFA", letterSpacing: "-0.02em" }}>SoundPulse</span>
              <span style={{ fontSize: 10, background: "rgba(167,139,250,0.15)", color: "#A78BFA", padding: "2px 6px", borderRadius: 4, fontWeight: 500 }}>BETA</span>
            </div>
            <p style={{ fontSize: 13, color: "#8B8680", margin: 0 }}>Your weekly marketing strategist</p>
          </div>
          <select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
            {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", padding: "10px 16px", fontSize: 13, fontWeight: activeTab === t.id ? 500 : 400, color: activeTab === t.id ? "#A78BFA" : "#6B6560", cursor: "pointer", borderBottom: activeTab === t.id ? "2px solid #A78BFA" : "2px solid transparent", fontFamily: "inherit", transition: "all 0.15s" }}>{t.label}</button>)}
        </div>
      </div>

      <div style={{ padding: "20px 20px 40px" }}>
        {activeTab === "brief" && <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {[{ label: "Monthly listeners", value: stats.monthlyListeners, change: stats.listenersChange }, { label: "Followers", value: stats.followers, change: stats.followersChange }, { label: "Playlist reach", value: stats.playlistReach, change: stats.playlistChange }].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 10px" }}>
                <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 4, letterSpacing: "0.03em" }}>{s.label}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: "#E8E6E1" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#4ADE80", marginTop: 3 }}>{s.change}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#F472B6", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: "#F9A8D4", letterSpacing: "0.04em", textTransform: "uppercase" }}>Hot opportunity</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D4D0CB" }}><strong style={{ color: "#E8E6E1" }}>{alert.title}</strong> {"\u2014"} {alert.stat}. {alert.desc}</p>
          </div>
          <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: "0 0 12px", letterSpacing: "0.04em", textTransform: "uppercase" }}>This week{"'"}s content ideas</h3>
          {ideas.map(idea => { const ts = ideaTypeStyles[idea.type] || ideaTypeStyles["Evergreen"]; return (
            <div key={idea.id} onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)} style={{ background: expandedIdea === idea.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid", borderColor: expandedIdea === idea.id ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s" }}>
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
                <span style={{ fontSize: 18, color: "#6B6560", transform: expandedIdea === idea.id ? "rotate(180deg)" : "none", transition: "transform 0.15s", lineHeight: 1 }}>{"\u2304"}</span>
              </div>
              {expandedIdea === idea.id && <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.7, color: "#A8A49E" }}>{idea.description}</p>
                {idea.timing && <div style={{ background: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.15)", borderRadius: 8, padding: "7px 10px", marginBottom: 10, fontSize: 11, color: "#F9A8D4" }}>{idea.timing}</div>}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{idea.tags.map(tag => <span key={tag} style={{ fontSize: 10, color: "#8B8680", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 99 }}>{tag}</span>)}</div>
              </div>}
            </div>
          )})}
        </div>}

        {activeTab === "trends" && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trending in {selectedGenre}</h3>
            <span style={{ fontSize: 11, color: "#6B6560" }}>Updated 2h ago</span>
          </div>
          {sounds.map((sound, i) => (
            <div key={sound.id} onClick={() => setExpandedSound(expandedSound === sound.id ? null : sound.id)} style={{ background: expandedSound === sound.id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid", borderColor: sound.daysActive <= 2 ? "rgba(244,114,182,0.2)" : "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "all 0.15s" }}>
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
              {expandedSound === sound.id && <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 10, fontSize: 11, color: "#8B8680" }}><span>{sound.bpm} BPM</span><span>Hook: {sound.hook}</span></div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: "#6B6560", marginBottom: 5 }}>7-day growth</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>{[12, 18, 25, 35, 52, 78, 100].map((h, j) => <div key={j} style={{ flex: 1, height: h + "%", background: j === 6 ? "#A78BFA" : "rgba(167,139,250,0.3)", borderRadius: "3px 3px 0 0" }} />)}</div>
                </div>
                <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: "#A78BFA", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>How to use this for YOUR music</div>
                  <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "#C4B5FD" }}>{sound.suggestion}</p>
                </div>
              </div>}
            </div>
          ))}
        </div>}

        {activeTab === "calendar" && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ fontSize: 12, fontWeight: 500, color: "#8B8680", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>Week of April 7{"\u2013"}13</h3>
            <div style={{ display: "flex", gap: 8 }}>{Object.entries(typeColors).map(([type, c]) => <span key={type} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: c.text }}><span style={{ width: 5, height: 5, borderRadius: 99, background: c.dot }} />{type}</span>)}</div>
          </div>
          {calendarTemplate.map((item, i) => { const c = typeColors[item.type]; const done = !!calendarDone[selectedGenre + "-" + i]; return (
            <div key={selectedGenre + "-" + i} onClick={() => toggleCalendar(i)} style={{ display: "flex", alignItems: "center", gap: 12, background: done ? "rgba(255,255,255,0.01)" : c.bg + "44", border: "1px solid", borderColor: done ? "rgba(255,255,255,0.03)" : c.dot + "22", borderRadius: 12, padding: "12px 14px", marginBottom: 5, cursor: "pointer", transition: "all 0.15s", opacity: done ? 0.5 : 1 }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, border: "2px solid " + (done ? "#4ADE80" : c.dot), background: done ? "rgba(74,222,128,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{done && <span style={{ color: "#4ADE80", fontSize: 11, fontWeight: 700 }}>{"\u2713"}</span>}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: done ? "#6B6560" : "#E8E6E1", textDecoration: done ? "line-through" : "none" }}>{item.task}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: c.text, opacity: 0.7, minWidth: 28, textAlign: "right" }}>{item.day}</div>
            </div>
          )})}
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#A8A49E", marginBottom: 6 }}>Your weekly rhythm</div>
            <div style={{ fontSize: 11, lineHeight: 1.8, color: "#6B6560" }}><span style={{ color: typeColors.create.text }}>Create</span> on Mon/Thu {"\u2014"} batch your filming. <span style={{ color: typeColors.post.text }}>Post</span> on Tue/Fri {"\u2014"} optimal algorithm windows. <span style={{ color: typeColors.engage.text }}>Engage</span> on Wed/Sat {"\u2014"} community building. <span style={{ color: typeColors.plan.text }}>Plan</span> on Sunday {"\u2014"} review and prep.</div>
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.1)", borderRadius: 12, padding: "12px 14px" }}>
            <span style={{ fontSize: 12, color: "#A8A49E" }}>Estimated time this week</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#A78BFA" }}>~4.5 hrs</span>
          </div>
        </div>}

        <div style={{ marginTop: 32, background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
          {!submitted ? <>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E6E1", marginBottom: 6 }}>Get early access</div>
            <p style={{ fontSize: 12, color: "#8B8680", margin: "0 0 16px", lineHeight: 1.6 }}>SoundPulse is launching soon. Join the waitlist and be first to know when we go live.</p>
            <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 8 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#E8E6E1", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <button type="submit" style={{ background: "#7C3AED", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>Join waitlist</button>
            </form>
          </> : <div>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{"\u2713"}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#4ADE80", marginBottom: 4 }}>You{"'"}re on the list</div>
            <p style={{ fontSize: 12, color: "#8B8680", margin: 0 }}>We{"'"}ll reach out when SoundPulse is ready for you.</p>
          </div>}
        </div>
      </div>
    </div>
  )
}
