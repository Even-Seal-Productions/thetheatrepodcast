'use client'

import { Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Placeholder data - will be replaced with real guest data later
const featuredGuests = [
  {
    name: 'Featured Guest 1',
    role: 'Tony Award Winner',
    credits: ['Hamilton', 'Wicked', 'The Lion King'],
    imageUrl: null,
  },
  {
    name: 'Featured Guest 2',
    role: 'Emmy & Tony Winner',
    credits: ['Broadway Show', 'TV Series', 'Film'],
    imageUrl: null,
  },
  {
    name: 'Featured Guest 3',
    role: 'Theater Legend',
    credits: ['Classic Show', 'Revival', 'New Musical'],
    imageUrl: null,
  },
  {
    name: 'Featured Guest 4',
    role: 'Rising Star',
    credits: ['Recent Hit', 'Off-Broadway', 'Regional'],
    imageUrl: null,
  },
]

export function FeaturedGuests() {
  return (
    <section className="py-20 bg-theatrical-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Guests</h2>
          <p className="text-gray-400 text-lg">
            A-list performers sharing their stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredGuests.map((guest, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:border-spotlight-500/50 transition-all group cursor-pointer"
            >
              {/* Guest Image Placeholder */}
              <div className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-spotlight-500/20 to-theatrical-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="h-16 w-16 text-spotlight-500/50" />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-spotlight-400 transition-colors">
                {guest.name}
              </h3>
              
              <p className="text-spotlight-400 text-sm font-semibold mb-3">
                {guest.role}
              </p>

              <div className="text-gray-400 text-sm">
                <p className="line-clamp-2">
                  {guest.credits.join(' • ')}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/guests"
            className="inline-flex items-center gap-2 btn-secondary group"
          >
            <span>View More Guests</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
