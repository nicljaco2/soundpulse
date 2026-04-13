import { generateArtistStrategy } from '@/lib/claude'

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'AI not configured' }, { status: 503 })
  }

  let artistData
  try {
    artistData = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!artistData?.name) {
    return Response.json({ error: 'Missing artist data' }, { status: 400 })
  }

  try {
    const strategy = await generateArtistStrategy(artistData)
    return Response.json(strategy)
  } catch (err) {
    console.error('[AI analyze]', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
