import { getTrendingByGenre } from '@/lib/youtube'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const genre      = searchParams.get('genre')?.trim()
  const regionCode = searchParams.get('region')?.trim().toUpperCase() || undefined
  const language   = searchParams.get('language')?.trim().toLowerCase() || undefined

  if (!genre) return Response.json({ error: 'Missing genre parameter' }, { status: 400 })
  if (!process.env.YOUTUBE_API_KEY) return Response.json({ error: 'YouTube API not configured' }, { status: 503 })

  try {
    const { data, fetchedAt } = await getTrendingByGenre(genre, 8, regionCode, language)
    return Response.json(
      { videos: data, fetchedAt, regionCode, language },
      { headers: { 'Cache-Control': 's-maxage=21600, stale-while-revalidate=86400' } }
    )
  } catch (err) {
    console.error('[YouTube trending]', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
