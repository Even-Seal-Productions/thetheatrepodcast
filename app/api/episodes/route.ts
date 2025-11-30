import { NextResponse } from 'next/server'
import { getAllEpisodes, getLatestEpisode, getRecentEpisodes, searchEpisodes } from '@/lib/rss'

export const revalidate = 300 // Revalidate every 5 minutes
export const dynamic = 'force-dynamic' // Mark as dynamic route

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const query = searchParams.get('query')

    // Search episodes
    if (query) {
      const episodes = await searchEpisodes(query)
      return NextResponse.json({ episodes, hasMore: false })
    }

    // Get latest episode
    if (type === 'latest') {
      const episode = await getLatestEpisode()
      return NextResponse.json({ episode })
    }

    // Get recent episodes with limit
    if (type === 'recent') {
      const episodeLimit = limit ? parseInt(limit) : 10
      const episodes = await getRecentEpisodes(episodeLimit)
      return NextResponse.json({ episodes })
    }

    // Get all episodes with pagination (default)
    const allEpisodes = await getAllEpisodes()
    const sort = searchParams.get('sort') // 'oldest' for oldest first, default is newest first

    // Sort episodes if needed
    const sortedEpisodes = sort === 'oldest'
      ? [...allEpisodes].reverse()
      : allEpisodes

    const episodeOffset = offset ? parseInt(offset) : 0
    const episodeLimit = limit ? parseInt(limit) : 20
    const paginatedEpisodes = sortedEpisodes.slice(episodeOffset, episodeOffset + episodeLimit)
    const hasMore = episodeOffset + episodeLimit < sortedEpisodes.length

    return NextResponse.json({
      episodes: paginatedEpisodes,
      hasMore,
      total: allEpisodes.length
    })
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    )
  }
}
