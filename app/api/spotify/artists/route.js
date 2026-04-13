import { searchArtists } from '@/lib/spotify'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return Response.json([])
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return Response.json({ error: 'Spotify credentials not configured' }, { status: 503 })
  }

  try {
    const artists = await searchArtists(q, 5)
    return Response.json(artists)
  } catch (err) {
    console.error('[Spotify artists]', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
