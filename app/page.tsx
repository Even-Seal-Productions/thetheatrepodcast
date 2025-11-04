import { Hero } from '@/components/home/Hero'
import { LatestEpisode } from '@/components/home/LatestEpisode'
// import { FeaturedGuests } from '@/components/home/FeaturedGuests'
import { RecentEpisodes } from '@/components/home/RecentEpisodes'
import { RecentCollections } from '@/components/home/RecentCollections'
import { AboutPreview } from '@/components/home/AboutPreview'
import { CallToAction } from '@/components/home/CallToAction'
import { NewsletterSignup } from '@/components/common/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-spotlight-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-spotlight-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <Hero />
        <LatestEpisode />
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </section>
        {/* <FeaturedGuests /> */}
        <RecentEpisodes />
        <RecentCollections />
        <AboutPreview />
        <CallToAction />
      </div>
    </div>
  )
}
