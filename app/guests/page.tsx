'use client'

import { Award, ExternalLink } from 'lucide-react'
import { useState } from 'react'

// Mock data - replace with API call
const mockGuests = Array.from({ length: 16 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Featured Guest ${i + 1}`,
  role: i % 3 === 0 ? 'Tony Award Winner' : i % 3 === 1 ? 'Emmy & Tony Winner' : 'Theater Legend',
  bio: 'An acclaimed performer with a career spanning Broadway, film, and television.',
  credits: ['Hamilton', 'Wicked', 'The Lion King', 'Film Title', 'TV Series'],
  awards: i % 2 === 0 ? ['Tony Award', 'Drama Desk Award'] : ['Emmy Award', 'SAG Award'],
  imageUrl: null,
  episodeId: `${i + 1}`,
}))

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGuests = mockGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.credits.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Featured Guests</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A-list film/TV and acclaimed stage performers who have shared their pivotal, human stories on the show
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search guests by name, role, or credits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-theatrical-900 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500 transition-colors"
          />
        </div>

        {/* Results Count */}
        <div className="max-w-6xl mx-auto mb-6">
          <p className="text-gray-400">
            Showing {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Guests Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="glass-card p-6 hover:border-spotlight-500/50 transition-all group cursor-pointer"
            >
              {/* Guest Image Placeholder */}
              <div className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-spotlight-500/20 to-theatrical-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="h-16 w-16 text-spotlight-500/50" />
                </div>
              </div>

              {/* Guest Info */}
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-spotlight-400 transition-colors">
                {guest.name}
              </h3>
              
              <p className="text-spotlight-400 text-sm font-semibold mb-3">
                {guest.role}
              </p>

              {/* Awards */}
              {guest.awards && guest.awards.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {guest.awards.map((award, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-spotlight-500/10 border border-spotlight-500/20 rounded text-xs text-spotlight-300"
                      >
                        <Award className="h-3 w-3" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Credits */}
              <div className="text-gray-400 text-sm mb-4">
                <p className="line-clamp-2">
                  {guest.credits.slice(0, 3).join(' • ')}
                </p>
              </div>

              {/* View Episode Link */}
              <a
                href={`/episodes#${guest.episodeId}`}
                className="inline-flex items-center gap-2 text-spotlight-400 hover:text-spotlight-300 text-sm font-semibold group-hover:gap-3 transition-all"
              >
                <span>Listen to Episode</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGuests.length === 0 && (
          <div className="max-w-6xl mx-auto text-center py-12">
            <p className="text-gray-400 text-lg">
              No guests found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
