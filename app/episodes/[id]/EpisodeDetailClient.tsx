'use client'

import { Episode } from '@/lib/types'
import { Play, Pause, Calendar, Clock, ArrowLeft, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate, formatDuration, addTargetBlankToLinks } from '@/lib/utils'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'
import Image from 'next/image'
import Link from 'next/link'

interface EpisodeDetailClientProps {
  episode: Episode
  previousEpisode: Episode | null
  nextEpisode: Episode | null
}

export function EpisodeDetailClient({ episode, previousEpisode, nextEpisode }: EpisodeDetailClientProps) {
  const { playEpisode, currentEpisode, isPlaying } = useAudioPlayer()

  // Check if this episode is currently playing
  const isThisEpisodePlaying = currentEpisode?.id === episode.id && isPlaying

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/episodes"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-spotlight-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Episodes</span>
        </Link>

        {/* Episode Header */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12 relative">
            {/* Previous Episode Arrow */}
            {previousEpisode && (
              <Link
                href={`/episodes/${previousEpisode.slug}`}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-theatrical-800 hover:bg-theatrical-700 border border-spotlight-500/20 hover:border-spotlight-500/40 transition-all group z-10"
                title={`Previous: ${previousEpisode.title}`}
              >
                <ChevronLeft className="h-6 w-6 text-spotlight-400 group-hover:text-spotlight-300" />
              </Link>
            )}

            {/* Next Episode Arrow */}
            {nextEpisode && (
              <Link
                href={`/episodes/${nextEpisode.slug}`}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-theatrical-800 hover:bg-theatrical-700 border border-spotlight-500/20 hover:border-spotlight-500/40 transition-all group z-10"
                title={`Next: ${nextEpisode.title}`}
              >
                <ChevronRight className="h-6 w-6 text-spotlight-400 group-hover:text-spotlight-300" />
              </Link>
            )}

            {/* Episode Image */}
            <div
              className="relative group cursor-pointer"
              onClick={() => playEpisode(episode)}
            >
              <div className="aspect-square relative overflow-hidden rounded-lg">
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
              </div>
              {/* Play/Pause Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="bg-spotlight-500 rounded-full p-6">
                  {isThisEpisodePlaying ? (
                    <Pause className="h-8 w-8 text-white fill-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white fill-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Episode Info */}
            <div className="flex flex-col justify-center">
              {/* Episode Number */}
              {episode.episodeNumber && (
                <div className="text-spotlight-400 text-sm font-semibold mb-2">
                  Episode {episode.episodeNumber}
                  {episode.season && ` • Season ${episode.season}`}
                </div>
              )}

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                {episode.title}
              </h1>

              {/* Guest Names */}
              {episode.guests.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Featuring</p>
                  <p className="text-spotlight-400 text-lg sm:text-xl font-semibold">
                    {episode.guests.map(g => g.name).join(', ')}
                  </p>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(episode.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(episode.duration)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => playEpisode(episode)}
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
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: episode.title,
                        text: episode.description,
                        url: window.location.href,
                      })
                    }
                  }}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Episode Description */}
          <div className="glass-card p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              About This Episode
            </h2>
            <div
              className="text-gray-300 leading-relaxed prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-strong:text-white prose-a:text-spotlight-400 prose-ul:text-gray-300 prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: addTargetBlankToLinks(episode.description) }}
            />
          </div>

          {/* Previous/Next Navigation - Mobile */}
          <div className="flex gap-3 mb-6 lg:hidden">
            {previousEpisode ? (
              <Link
                href={`/episodes/${previousEpisode.slug}`}
                className="flex-1 glass-card p-4 hover:border-spotlight-500/40 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChevronLeft className="h-4 w-4 text-spotlight-400" />
                  <span className="text-xs text-gray-400">Previous</span>
                </div>
                <h3 className="font-display text-sm font-bold text-white group-hover:text-spotlight-400 transition-colors line-clamp-2">
                  {previousEpisode.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {nextEpisode ? (
              <Link
                href={`/episodes/${nextEpisode.slug}`}
                className="flex-1 glass-card p-4 hover:border-spotlight-500/40 transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-xs text-gray-400">Next</span>
                  <ChevronRight className="h-4 w-4 text-spotlight-400" />
                </div>
                <h3 className="font-display text-sm font-bold text-white group-hover:text-spotlight-400 transition-colors line-clamp-2">
                  {nextEpisode.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Previous/Next Navigation - Desktop */}
          <div className="hidden lg:flex gap-4 mb-12">
            {previousEpisode ? (
              <Link
                href={`/episodes/${previousEpisode.slug}`}
                className="flex-1 glass-card p-6 hover:border-spotlight-500/40 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ChevronLeft className="h-5 w-5 text-spotlight-400" />
                  <span className="text-sm text-gray-400">Previous</span>
                </div>
                <h3 className="font-display text-base lg:text-lg font-bold text-white group-hover:text-spotlight-400 transition-colors line-clamp-2">
                  {previousEpisode.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {nextEpisode ? (
              <Link
                href={`/episodes/${nextEpisode.slug}`}
                className="flex-1 glass-card p-6 hover:border-spotlight-500/40 transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-3 mb-2">
                  <span className="text-sm text-gray-400">Next</span>
                  <ChevronRight className="h-5 w-5 text-spotlight-400" />
                </div>
                <h3 className="font-display text-base lg:text-lg font-bold text-white group-hover:text-spotlight-400 transition-colors line-clamp-2">
                  {nextEpisode.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
