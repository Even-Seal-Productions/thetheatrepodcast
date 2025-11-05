'use client'

import { Play, Calendar, Clock, ArrowRight, Loader2, Pause } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { Episode } from '@/lib/types'
import { formatDate, formatDuration, stripHtml } from '@/lib/utils'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function RecentEpisodes() {
  const { playEpisode, currentEpisode, isPlaying, isLoading: audioLoading } = useAudioPlayer()
  const { data, error, isLoading: dataLoading } = useSWR<{ episodes: Episode[] }>(
    '/api/episodes?type=recent&limit=8',
    fetcher,
    { refreshInterval: 300000 } // Refresh every 5 minutes
  )

  const recentEpisodes = data?.episodes || []
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Recent Episodes</h2>
          <p className="text-gray-400 text-lg">
            {dataLoading ? 'Loading...' : 'Catch up the the latest conversations'}
          </p>
        </div>

        {error && (
          <div className="text-center text-gray-400 mb-12">
            Unable to load episodes. Please try again later.
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {recentEpisodes.map((episode) => {
            const isThisEpisodePlaying = currentEpisode?.id === episode.id && isPlaying
            const isThisEpisodeLoading = currentEpisode?.id === episode.id && audioLoading

            return (
              <div key={episode.id} className="glass-card p-3 sm:p-4 hover:border-spotlight-500/50 transition-all group">
                {/* Episode Image - Click to play */}
                <div
                  className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-theatrical-700 to-theatrical-900 relative overflow-hidden cursor-pointer"
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
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <Image
                          src="/images/logo-transparent.png"
                          alt={episode.title}
                          width={96}
                          height={96}
                          className="object-contain opacity-30"
                        />
                      </div>
                    </div>
                  )}
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                    <div className="w-12 h-12 rounded-full bg-spotlight-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                      {isThisEpisodeLoading ? (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      ) : isThisEpisodePlaying ? (
                        <Pause className="h-6 w-6 text-white fill-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Episode Info - Click to navigate */}
                <Link href={`/episodes/${episode.slug}`}>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-3 hover:text-spotlight-400 transition-colors line-clamp-2 cursor-pointer">
                    {episode.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(episode.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDuration(episode.duration)}
                  </span>
                </div>

                <Link href={`/episodes/${episode.slug}`}>
                  <p className="text-gray-400 text-sm line-clamp-2 hover:text-gray-300 transition-colors cursor-pointer">
                    {stripHtml(episode.description)}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 btn-primary group"
          >
            <span>View All Episodes</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
