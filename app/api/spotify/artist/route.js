import { analyzeArtistProfile } from '@/lib/spotify'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')?.trim()

  if (!url) {
    return Response.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return Response.json(
      { error: 'Spotify credentials not configured' },
      { status: 503 }
    )
  }

  try {
    const profile = await analyzeArtistProfile(url)
    return Response.json(profile)
  } catch (err) {
    console.error('[Spotify artist]', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
