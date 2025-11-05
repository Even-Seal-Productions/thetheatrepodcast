import { MetadataRoute } from 'next'
import { getAllEpisodes } from '@/lib/rss'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetheatrepodcast.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/episodes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guests`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/listen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    // Dynamic episode pages
    const episodes = await getAllEpisodes()
    const episodePages: MetadataRoute.Sitemap = episodes.map((episode) => ({
      url: `${baseUrl}/episodes/${episode.slug}`,
      lastModified: new Date(episode.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...staticPages, ...episodePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the static pages if episode fetching fails
    return staticPages
  }
}
