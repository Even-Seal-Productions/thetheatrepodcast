'use client'

import { Play, Pause, Calendar, Clock, Loader2 } from 'lucide-react'
import { formatDate, formatDuration, stripHtml } from '@/lib/utils'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Episode } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function LatestEpisode() {
  const { playEpisode, currentEpisode, isPlaying, isLoading: audioLoading } = useAudioPlayer()
  const { data, error, isLoading: dataLoading } = useSWR<{ episode: Episode | null }>(
    '/api/episodes?type=latest',
    fetcher,
    { refreshInterval: 300000 } // Refresh every 5 minutes
  )

  if (dataLoading) {
    return (
      <section className="-mt-16 pb-20 relative pt-12" data-section="latest-episode">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative z-10">
            <h2 className="section-title">Latest Episode</h2>
            <p className="text-gray-400 text-lg bg-transparent">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !data?.episode) {
    return (
      <section className="-mt-16 pb-20 relative pt-12" data-section="latest-episode">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative z-10">
            <h2 className="section-title">Latest Episode</h2>
            <p className="text-gray-400 text-lg bg-transparent">Unable to load episode</p>
          </div>
        </div>
      </section>
    )
  }

  const latestEpisode = data.episode
  const isThisEpisodePlaying = currentEpisode?.id === latestEpisode.id && isPlaying
  const isThisEpisodeLoading = currentEpisode?.id === latestEpisode.id && audioLoading

  return (
    <section className="-mt-16 pb-20 relative pt-12" data-section="latest-episode">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-10">
          <h2 className="section-title">Latest Episode</h2>
          <p className="text-gray-400 text-lg bg-transparent">
            Fresh conversations, delivered weekly
          </p>
        </div>

        <div className="max-w-5xl mx-auto glass-card p-6 sm:p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Episode Image - Click to play */}
            <div
              className="relative group cursor-pointer"
              onClick={() => playEpisode(latestEpisode)}
              title="Click to play"
            >
              <div className="aspect-square relative overflow-hidden rounded-lg">
                {/* Play/Pause/Loading overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="bg-spotlight-500 rounded-full p-6 transform group-hover:scale-110 transition-transform">
                    {isThisEpisodeLoading ? (
                      <Loader2 className="h-12 w-12 text-white animate-spin" />
                    ) : isThisEpisodePlaying ? (
                      <Pause className="h-12 w-12 text-white fill-white" />
                    ) : (
                      <Play className="h-12 w-12 text-white fill-white" />
                    )}
                  </div>
                </div>
                {latestEpisode.imageUrl ? (
                  <Image
                    src={latestEpisode.imageUrl}
                    alt={latestEpisode.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-spotlight-500/20 to-theatrical-800" />
                )}
              </div>
            </div>

            {/* Episode Info */}
            <div>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(latestEpisode.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(latestEpisode.duration)}</span>
                </div>
              </div>

              <Link href={`/episodes/${latestEpisode.slug}`} className="group/title">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6 group-hover/title:text-spotlight-400 transition-colors">
                  {latestEpisode.title}
                </h3>
              </Link>

              <Link href={`/episodes/${latestEpisode.slug}`} className="group/desc block">
                <p className="text-sm sm:text-base text-gray-400 mb-6 line-clamp-3 sm:line-clamp-4 group-hover/desc:text-gray-300 transition-colors">
                  {stripHtml(latestEpisode.description)}
                </p>
              </Link>

              <div className="flex justify-center sm:justify-start">
                <button
                  onClick={() => playEpisode(latestEpisode)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {isThisEpisodePlaying ? (
                    <>
                      <Pause className="h-5 w-5 fill-white" />
                      <span>Pause Episode</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 fill-white" />
                      <span>Play Episode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
