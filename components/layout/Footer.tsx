'use client'

import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'
import Image from 'next/image'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'
import { useState } from 'react'
import { NewsletterModal } from '@/components/common/NewsletterModal'

// TikTok SVG icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)

  return (
    <>
    <footer className="bg-theatrical-950 border-t border-theatrical-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo-transparent.png"
                  alt="The Theatre Podcast"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl font-bold bg-gradient-to-r from-spotlight-400 to-spotlight-600 bg-clip-text text-transparent">
                {SITE_CONFIG.name}
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-spotlight-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-spotlight-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-spotlight-400 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-spotlight-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">More</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-spotlight-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsNewsletterModalOpen(true)}
                  className="text-gray-400 hover:text-spotlight-400 transition-colors text-sm text-left"
                >
                  Newsletter
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-theatrical-800">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <NewsletterModal
      isOpen={isNewsletterModalOpen}
      onClose={() => setIsNewsletterModalOpen(false)}
    />
  </>
  )
}
