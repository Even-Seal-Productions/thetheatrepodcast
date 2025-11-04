import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetheatrepodcast.com'
  const isProduction = siteUrl.includes('thetheatrepodcast.com') && !siteUrl.includes('staging')

  if (isProduction) {
    // Production: Allow all indexing
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    }
  } else {
    // Staging/Dev: Block all indexing
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }
}
