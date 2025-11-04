'use client'

import { Collection } from '@/lib/collections'
import { Episode } from '@/lib/types'
import { Play, Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { formatDate, formatDuration, stripHtml } from '@/lib/utils'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface CollectionDetailClientProps {
  collection: Collection
  prevCollection: Collection
  nextCollection: Collection
}

export function CollectionDetailClient({ collection, prevCollection, nextCollection }: CollectionDetailClientProps) {
  const { playEpisode, currentEpisode, isPlaying } = useAudioPlayer()
  
  // Fetch all episodes (with large limit to get everything)
  const { data, isLoading } = useSWR<{ episodes: Episode[] }>(
    '/api/episodes?limit=1000',
    fetcher
  )

  // Filter episodes that are in this collection
  // Match by episode number, slug, or title pattern
  const collectionEpisodes = data?.episodes.filter(ep => {
    // Match by episode number
    if (ep.episodeNumber && collection.episodeIds.includes(String(ep.episodeNumber))) {
      return true
    }
    // Match by slug
    if (collection.episodeIds.includes(ep.slug)) {
      return true
    }
    // Match by partial title (for episodes like Cereal series)
    // Check if any episodeId pattern is contained in the episode title
    if (collection.episodeIds.some(id =>
      !id.match(/^\d+$/) && // Not just a number
      ep.title.includes(id)
    )) {
      return true
    }
    return false
  }) || []

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-spotlight-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Collections</span>
        </Link>

        {/* Collection Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Collection Image */}
            <div className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                {collection.imageUrl ? (
                  <Image
                    src={collection.imageUrl}
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-spotlight-500/20 to-theatrical-800" />
                )}
              </div>
            </div>

            {/* Collection Info */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                {collection.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {collection.description}
              </p>
              <div className="text-gray-400">
                <span className="text-spotlight-400 font-semibold">
                  {collectionEpisodes.length}
                </span>{' '}
                {collectionEpisodes.length === 1 ? 'episode' : 'episodes'} in this collection
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <Link
              href={`/collections/${prevCollection.id}`}
              className="group flex items-center gap-3 text-gray-400 hover:text-spotlight-400 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-theatrical-800 group-hover:bg-spotlight-500/20 transition-colors">
                <ChevronLeft className="h-6 w-6" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Previous</div>
                <div className="text-sm font-semibold">{prevCollection.title}</div>
              </div>
            </Link>

            <Link
              href={`/collections/${nextCollection.id}`}
              className="group flex items-center gap-3 text-gray-400 hover:text-spotlight-400 transition-colors"
            >
              <div className="hidden sm:block text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Next</div>
                <div className="text-sm font-semibold">{nextCollection.title}</div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-theatrical-800 group-hover:bg-spotlight-500/20 transition-colors">
                <ChevronRight className="h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>

        {/* Episodes List */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Episodes</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 text-spotlight-400 animate-spin" />
            </div>
          ) : collectionEpisodes.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-gray-400">No episodes in this collection yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {collectionEpisodes.map((episode) => {
                const isThisEpisodePlaying = currentEpisode?.id === episode.id && isPlaying

                return (
                  <div key={episode.id} className="glass-card p-6 hover:border-spotlight-500/50 transition-all group">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Episode Image */}
                      <div 
                        className="w-full md:w-48 aspect-square rounded-lg flex-shrink-0 cursor-pointer relative overflow-hidden group/play"
                        onClick={() => playEpisode(episode)}
                      >
                        {episode.imageUrl ? (
                          <Image
                            src={episode.imageUrl}
                            alt={episode.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-spotlight-500/20 to-theatrical-800" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/play:opacity-100 transition-opacity bg-black/40">
                          <div className="bg-spotlight-500 rounded-full p-4">
                            <Play className="h-6 w-6 text-white fill-white" />
                          </div>
                        </div>
                      </div>

                      {/* Episode Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(episode.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(episode.duration)}</span>
                          </div>
                        </div>

                        <Link href={`/episodes/${episode.slug}`}>
                          <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-spotlight-400 transition-colors">
                            {episode.title}
                          </h3>
                        </Link>

                        {episode.guests.length > 0 && (
                          <p className="text-gray-300 mb-3">
                            Featuring <span className="text-spotlight-400 font-semibold">
                              {episode.guests.map(g => g.name).join(', ')}
                            </span>
                          </p>
                        )}

                        <p className="text-gray-400 line-clamp-3">
                          {stripHtml(episode.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
