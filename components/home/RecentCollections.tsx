'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { COLLECTIONS } from '@/lib/collections'

export function RecentCollections() {
  // Get the 4 most recent collections (first 4 in the array)
  const recentCollections = COLLECTIONS.slice(0, 4)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Recent Collections</h2>
          <p className="text-gray-400 text-lg">
            Curated series featuring iconic shows
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {recentCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="glass-card overflow-hidden hover:border-spotlight-500/50 transition-all group"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={collection.imageUrl}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {collection.color && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: collection.color }}
                  />
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-spotlight-400 transition-colors line-clamp-2">
                  {collection.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-spotlight-400 text-xs sm:text-sm font-semibold">
                  <span>{collection.episodeIds.length} Episodes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 btn-primary group"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
