import Parser from 'rss-parser'
import { Episode, Guest, PodcastMetadata } from './types'

const parser = new Parser({
  customFields: {
    item: [
      ['itunes:duration', 'duration'],
      ['itunes:image', 'image'],
      ['itunes:explicit', 'explicit'],
      ['itunes:episode', 'episodeNumber'],
      ['itunes:season', 'season'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
})

const RSS_FEED_URL = 'https://feeds.megaphone.fm/thetheatrepodcast'

export async function fetchPodcastFeed() {
  try {
    const feed = await parser.parseURL(RSS_FEED_URL)
    return feed
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    throw error
  }
}

export async function getPodcastMetadata(): Promise<PodcastMetadata> {
  const feed = await fetchPodcastFeed()

  return {
    title: feed.title || 'The Theatre Podcast with Alan Seales',
    description: feed.description || '',
    author: feed.itunes?.author || 'Alan Seales',
    imageUrl: feed.itunes?.image || feed.image?.url || '',
    categories: feed.itunes?.categories || [],
    language: feed.language || 'en',
    explicit: feed.itunes?.explicit === 'yes',
  }
}

function parseDuration(duration: string | undefined): number {
  if (!duration) return 0

  // Handle formats like "1:23:45" or "23:45" or just seconds
  const parts = duration.split(':').map(Number)

  if (parts.length === 3) {
    // hours:minutes:seconds
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  } else if (parts.length === 2) {
    // minutes:seconds
    return parts[0] * 60 + parts[1]
  } else {
    // assume seconds
    return parts[0] || 0
  }
}

function cleanDescription(description: string): string {
  // Remove ad choices text with various possible formats (plain text, HTML, etc.)
  let cleaned = description
  
  // Pattern 1: Plain text or with HTML tags
  cleaned = cleaned.replace(/Learn\s+more\s+about\s+your\s+ad\s+choices\.\s*Visit\s+megaphone\.fm\/adchoices/gi, '')
  
  // Pattern 2: With HTML paragraph tags
  cleaned = cleaned.replace(/<p[^>]*>\s*Learn\s+more\s+about\s+your\s+ad\s+choices\.\s*Visit\s+megaphone\.fm\/adchoices\s*<\/p>/gi, '')
  
  // Pattern 3: With links
  cleaned = cleaned.replace(/Learn\s+more\s+about\s+your\s+ad\s+choices\.\s*Visit\s+<a[^>]*>megaphone\.fm\/adchoices<\/a>/gi, '')
  
  // Pattern 4: Entire sentence as a link
  cleaned = cleaned.replace(/<a[^>]*>\s*Learn\s+more\s+about\s+your\s+ad\s+choices\.\s*Visit\s+megaphone\.fm\/adchoices\s*<\/a>/gi, '')
  
  // Clean up any double line breaks or extra whitespace left behind
  cleaned = cleaned.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>')
  cleaned = cleaned.replace(/(<p>\s*<\/p>)/gi, '')
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n')
  
  return cleaned.trim()
}

function generateSlug(title: string, episodeNumber?: number): string {
  // Extract guest name from title
  const episodePattern = /^(?:#|Ep)?(\d+)\s*-\s*([^:()]+)(?::\s*(.+)|(\s*\([^)]+\)))?$/i
  const match = title.match(episodePattern)
  
  let slug = ''
  
  if (match) {
    const guestName = match[2].trim()
    const epNum = episodeNumber || parseInt(match[1])
    
    // Convert guest name to slug format
    const guestSlug = guestName
      .replace(/\s+(?:and|&)\s+/gi, '-')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
    
    slug = `${guestSlug}-${epNum}`
  } else {
    // Fallback: use title
    slug = title
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
      .substring(0, 50)
    
    if (episodeNumber) {
      slug = `${slug}-${episodeNumber}`
    }
  }
  
  return slug
}

function extractGuestsFromTitle(title: string): Guest[] {
  // Skip BONUS episodes
  if (title.toUpperCase().includes('BONUS')) {
    return []
  }

  // Format: #XXX - GUEST NAME: TITLE
  // or: EpXXX - GUEST NAME: TITLE
  // or: EpXXX - GUEST NAME (from the vault)
  const episodePattern = /^(?:#|Ep)?(\d+)\s*-\s*([^:()]+)(?::\s*(.+)|(\s*\([^)]+\)))?$/i
  const match = title.match(episodePattern)

  if (match) {
    const guestName = match[2].trim()

    // Handle multiple guests separated by common delimiters
    const guestNames = guestName
      .split(/\s+(?:and|&|,)\s+/i)
      .map(name => name.trim())
      .filter(name => name.length > 0)

    return guestNames.map(name => ({
      name,
    }))
  }

  // Fallback: try "with [Guest Name]" or "featuring [Guest Name]"
  const fallbackMatch = title.match(/(?:with|featuring)\s+([^|:]+)/i)
  if (fallbackMatch) {
    const guestNames = fallbackMatch[1].split(/,|&|\sand\s/).map(name => name.trim())
    return guestNames.map(name => ({
      name,
    }))
  }

  return []
}

export async function getAllEpisodes(): Promise<Episode[]> {
  const feed = await fetchPodcastFeed()

  if (!feed.items) return []

  const episodes = feed.items.map((item: any, index: number) => {
    const guests = extractGuestsFromTitle(item.title || '')
    const episodeNumber = item.episodeNumber ? parseInt(item.episodeNumber) : undefined
    const slug = generateSlug(item.title || '', episodeNumber)

    const rawDescription = item.contentEncoded || item.content || item.contentSnippet || ''
    const cleanedDescription = cleanDescription(rawDescription)

    return {
      id: item.guid || `episode-${index}`,
      slug,
      title: item.title || 'Untitled Episode',
      description: cleanedDescription,
      publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
      duration: parseDuration(item.duration),
      audioUrl: item.enclosure?.url || '',
      imageUrl: item.image?.url || item.itunes?.image || feed.itunes?.image || '',
      guests,
      episodeNumber,
      season: item.season ? parseInt(item.season) : undefined,
    }
  })

  // Sort by published date, most recent first
  return episodes.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return dateB - dateA
  })
}

export async function getLatestEpisode(): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.length > 0 ? episodes[0] : null
}

export async function getRecentEpisodes(limit: number = 10): Promise<Episode[]> {
  const episodes = await getAllEpisodes()
  return episodes.slice(0, limit)
}

export async function getEpisodeById(id: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.id === id) || null
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.slug === slug) || null
}

export async function getEpisodeByIdOrSlug(idOrSlug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  // Try slug first, then fall back to ID
  return episodes.find(ep => ep.slug === idOrSlug || ep.id === idOrSlug) || null
}

export async function searchEpisodes(query: string): Promise<Episode[]> {
  const episodes = await getAllEpisodes()
  const lowerQuery = query.toLowerCase()

  return episodes.filter(episode =>
    episode.title.toLowerCase().includes(lowerQuery) ||
    episode.description.toLowerCase().includes(lowerQuery) ||
    episode.guests.some(guest => guest.name.toLowerCase().includes(lowerQuery))
  )
}
