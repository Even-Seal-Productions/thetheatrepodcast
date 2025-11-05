'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Play, Pause, Calendar, Clock, Loader2, ArrowRight } from 'lucide-react'
import { formatDate, formatDuration, stripHtml } from '@/lib/utils'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'
import { Episode } from '@/lib/types'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { AutocompleteSearch } from '@/components/common/AutocompleteSearch'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function EpisodesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const { playEpisode, currentEpisode, isPlaying, isLoading: audioLoading } = useAudioPlayer()
  const observerTarget = useRef<HTMLDivElement>(null)
  const limit = 20

  // Fetch episodes or search results
  const apiUrl = searchQuery.trim()
    ? `/api/episodes?query=${encodeURIComponent(searchQuery)}`
    : `/api/episodes?limit=${limit}&offset=${offset}`

  const { data, error, isLoading } = useSWR<{ episodes: Episode[], hasMore?: boolean }>(
    apiUrl,
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      dedupingInterval: 0,
      keepPreviousData: false // Don't keep stale data
    }
  )

  // Reset state when search params change
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setSearchQuery(urlSearch)
    setOffset(0)
    setEpisodes([])
    setHasMore(true)
    setInitialLoadComplete(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Update episodes when data changes
  useEffect(() => {
    if (data?.episodes) {
      if (offset === 0 || searchQuery.trim()) {
        // Initial load or search - replace episodes
        setEpisodes(data.episodes)
        if (offset === 0 && !searchQuery.trim()) {
          // Small delay to ensure DOM renders before enabling infinite scroll
          setTimeout(() => setInitialLoadComplete(true), 100)
        }
      } else {
        // Load more - append episodes
        setEpisodes(prev => [...prev, ...data.episodes])
      }
      setHasMore(data.hasMore !== false)
      setIsLoadingMore(false)
    }
  }, [data, offset, searchQuery])

  // Handle search submission
  const handleSearch = (query: string) => {
    router.push(`/episodes?search=${encodeURIComponent(query)}`)
  }

  // Infinite scroll observer
  useEffect(() => {
    // Don't trigger infinite scroll until initial load is complete
    if (!observerTarget.current || isLoading || isLoadingMore || !hasMore || searchQuery.trim() || !initialLoadComplete) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true)
          setOffset(prev => prev + limit)
        }
      },
      { threshold: 0.1 }
    )

    // Check if element is already visible before observing
    const rect = observerTarget.current.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      return
    }

    observer.observe(observerTarget.current)

    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, isLoading, searchQuery, initialLoadComplete])

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">All Episodes</h1>
          <p className="text-gray-400 text-lg">
            Explore our complete archive of conversations
          </p>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-12">
          <AutocompleteSearch
            placeholder="Search by guest name, episode title, or keyword..."
            onSubmit={handleSearch}
          />
        </div>

        {/* Episodes Grid */}
        <div className="max-w-5xl mx-auto space-y-6">
          {episodes.map((episode, index) => {
            const isThisEpisodePlaying = currentEpisode?.id === episode.id && isPlaying
            const isThisEpisodeLoading = currentEpisode?.id === episode.id && audioLoading

            return (
              <div
                key={episode.id}
                className="glass-card p-6 hover:border-spotlight-500/50 transition-all group"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Episode Image - Click to play */}
                  <div
                    className="w-full sm:w-48 md:w-64 aspect-square rounded-lg flex-shrink-0 cursor-pointer relative overflow-hidden group/play"
                    onClick={(e) => {
                      e.stopPropagation()
                      playEpisode(episode)
                    }}
                    title="Click to play"
                  >
                    {episode.imageUrl ? (
                      <Image
                        src={episode.imageUrl}
                        alt={episode.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        priority={index < 3}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-spotlight-500/20 to-theatrical-800" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/play:opacity-100 transition-opacity bg-black/40">
                      <div className="bg-spotlight-500 rounded-full p-4">
                        {isThisEpisodeLoading ? (
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        ) : isThisEpisodePlaying ? (
                          <Pause className="h-8 w-8 text-white fill-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white fill-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Episode Info - Click to navigate */}
                  <Link
                    href={`/episodes/${episode.slug}`}
                    className="flex-1 min-w-0 flex flex-col group/link"
                  >
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(episode.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(episode.duration)}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover/link:text-spotlight-400 transition-colors">
                      {episode.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4 group-hover/link:text-gray-300 transition-colors">
                      {stripHtml(episode.description)}
                    </p>

                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-2 text-spotlight-400 font-semibold group-hover/link:gap-3 transition-all text-sm sm:text-base">
                        <span>Learn More</span>
                        <ArrowRight className="h-3 sm:h-4 w-3 sm:w-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}

          {/* Infinite scroll observer target */}
          {!searchQuery.trim() && hasMore && (
            <div ref={observerTarget} className="py-8 flex justify-center">
              {isLoadingMore && (
                <Loader2 className="h-8 w-8 text-spotlight-400 animate-spin" />
              )}
            </div>
          )}
        </div>

        {/* No Results */}
        {!isLoading && episodes.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No episodes found matching your search.' : 'No episodes available.'}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-red-400 text-lg">
              Unable to load episodes. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EpisodesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="section-title">All Episodes</h1>
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <EpisodesContent />
    </Suspense>
  )
}
