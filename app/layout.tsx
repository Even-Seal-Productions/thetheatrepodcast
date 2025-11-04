import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AudioPlayerProvider } from '@/components/audio/AudioPlayerProvider'
import { ScrollRestoration } from '@/components/layout/ScrollRestoration'
import { CookieConsent } from '@/components/common/CookieConsent'
import { SITE_CONFIG } from '@/lib/constants'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['theatre podcast', 'theater', 'Broadway', 'Alan Seales', 'interviews', 'performing arts'],
  authors: [{ name: SITE_CONFIG.host }],
  creator: SITE_CONFIG.host,
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: '@theatrepodcast',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased bg-theatrical-950 text-gray-100`}>
        <AudioPlayerProvider>
          <ScrollRestoration />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsent />
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
