import { NextResponse } from 'next/server'
import { getEpisodeById } from '@/lib/rss'

export const revalidate = 300 // Revalidate every 5 minutes

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const episode = await getEpisodeById(params.id)

    if (!episode) {
      return NextResponse.json(
        { error: 'Episode not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ episode })
  } catch (error) {
    console.error('Error fetching episode:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episode' },
      { status: 500 }
    )
  }
}
