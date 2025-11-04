import { Mic2, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'

export function AboutPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">About the Podcast</h2>
          </div>

          <div className="glass-card p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                  <Mic2 className="h-8 w-8 text-spotlight-400" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  Unscripted
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Authentic conversations that flow naturally
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                  <Star className="h-8 w-8 text-spotlight-400" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  Unfiltered
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Real stories from the heart
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                  <MapPin className="h-8 w-8 text-spotlight-400" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  Unforgettable
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Moments that stay with you
                </p>
              </div>
            </div>

            <div className="text-center">
              {/* Host Image */}
              <div className="mb-6 sm:mb-8">
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-spotlight-500">
                  <Image
                    src="/images/alan-seales.jpg"
                    alt="Alan Seales"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                {SITE_CONFIG.description}
              </p>
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
                Hosted by <span className="text-spotlight-400 font-semibold">{SITE_CONFIG.host}</span>, 
                recorded in-studio in {SITE_CONFIG.location} and virtually.
              </p>
              <Link
                href="/about"
                className="btn-secondary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
