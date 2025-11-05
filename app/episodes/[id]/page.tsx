import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEpisodeByIdOrSlug, getAllEpisodes } from '@/lib/rss'
import { EpisodeDetailClient } from './EpisodeDetailClient'

type Props = {
  params: { id: string }
}

export const revalidate = 300 // Revalidate every 5 minutes

export async function generateStaticParams() {
  const episodes = await getAllEpisodes()
  // Generate static pages for the most recent 50 episodes using slugs
  return episodes.slice(0, 50).map((episode) => ({
    id: episode.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const episode = await getEpisodeByIdOrSlug(params.id)

  if (!episode) {
    return {
      title: 'Episode Not Found',
    }
  }

  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      title: episode.title,
      description: episode.description,
      images: episode.imageUrl ? [episode.imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: episode.description,
      images: episode.imageUrl ? [episode.imageUrl] : [],
    },
  }
}

export default async function EpisodePage({ params }: Props) {
  const episode = await getEpisodeByIdOrSlug(params.id)

  if (!episode) {
    notFound()
  }

  // Get all episodes to find previous/next
  const allEpisodes = await getAllEpisodes()
  const currentIndex = allEpisodes.findIndex(ep => ep.id === episode.id)

  const previousEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null
  const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null

  // Structured data for the episode
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetheatrepodcast.com'
  const episodeSchema = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    url: `${siteUrl}/episodes/${episode.slug}`,
    name: episode.title,
    description: episode.description,
    datePublished: episode.publishedAt,
    duration: `PT${episode.duration}S`,
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: episode.audioUrl,
    },
    image: episode.imageUrl,
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'The Theatre Podcast with Alan Seales',
      url: siteUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Alan Seales',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
      />
      <EpisodeDetailClient
        episode={episode}
        previousEpisode={previousEpisode}
        nextEpisode={nextEpisode}
      />
    </>
  )
}
