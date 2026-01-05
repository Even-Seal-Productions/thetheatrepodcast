import { SITE_CONFIG, PODCAST_PLATFORMS } from '@/lib/constants'

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thetheatrepodcast.com'

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: siteUrl,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.host,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/episodes?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Podcast Series schema
  const podcastSchema = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: siteUrl,
    webFeed: PODCAST_PLATFORMS.find(p => p.name === 'RSS Feed')?.url,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.host,
      url: siteUrl,
    },
    genre: ['Theatre', 'Performing Arts', 'Interviews', 'Broadway'],
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'ListenAction',
      target: PODCAST_PLATFORMS.map(platform => ({
        '@type': 'EntryPoint',
        urlTemplate: platform.url,
        actionPlatform: platform.name,
      })),
    },
  }

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-transparent-simple.png`,
    sameAs: [
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.tiktok,
      PODCAST_PLATFORMS.find(p => p.name === 'YouTube')?.url,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'Customer Service',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
