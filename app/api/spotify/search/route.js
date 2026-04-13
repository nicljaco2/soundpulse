import { searchWithFeatures } from '@/lib/spotify'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query) {
    return Response.json({ error: 'Missing query parameter: q' }, { status: 400 })
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return Response.json(
      { error: 'Spotify credentials not configured. Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local' },
      { status: 503 }
    )
  }

  try {
    const tracks = await searchWithFeatures(query, 5)
    return Response.json({ tracks })
  } catch (err) {
    console.error('[Spotify search]', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
