'use client'

import { Play, Loader2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { EpisodeSearch } from './EpisodeSearch'
import { useAudioPlayer } from '@/components/audio/AudioPlayerProvider'
// import { VideoClipModal } from './VideoClipModal'
import useSWR from 'swr'
import { Episode } from '@/lib/types'
// import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Hero() {
  const { playEpisode, currentEpisode, isPlaying } = useAudioPlayer()
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const { data, isLoading } = useSWR<{ episode: Episode | null }>(
    '/api/episodes?type=latest',
    fetcher,
    { refreshInterval: 300000 }
  )

  const latestEpisode = data?.episode
  const isLatestEpisodePlaying = latestEpisode && currentEpisode?.id === latestEpisode.id && isPlaying

  const handlePlayLatest = () => {
    if (latestEpisode) {
      playEpisode(latestEpisode)

      // Scroll to the Latest Episode section with smooth behavior
      setTimeout(() => {
        const latestEpisodeSection = document.querySelector('[data-section="latest-episode"]')
        if (latestEpisodeSection) {
          latestEpisodeSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-theatrical-950 via-theatrical-900 to-theatrical-950" />

      {/* Logo behind text with light opacity */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] pointer-events-none">
        <Image
          src="/images/logo-transparent-simple.png"
          alt=""
          width={800}
          height={800}
          className="object-contain opacity-5"
          style={{ width: '100%', height: '100%' }}
          priority
        />
      </div>

      {/* Spotlight effect behind text */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-spotlight-500/10 rounded-full blur-3xl animate-spotlight pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Main heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-slide-up pt-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            The Theatre Podcast
          </span>
          <br />
          <span className="bg-gradient-to-r from-spotlight-400 to-spotlight-600 bg-clip-text text-transparent">
            with Alan Seales
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto font-light animate-slide-up px-4" style={{ animationDelay: '0.1s' }}>
          {SITE_CONFIG.tagline}
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
          Featuring A-list film/TV and acclaimed stage performers sharing pivotal, human stories.
          Recorded in-studio in Times Square and virtually.
        </p>

        {/* Episode Search */}
        <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <EpisodeSearch />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up mb-12" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handlePlayLatest}
            disabled={isLoading || !latestEpisode}
            className="group relative inline-flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isLatestEpisodePlaying ? (
              <div className="h-5 w-5 flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-1 h-5 bg-white rounded-full animate-pulse" />
                  <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            ) : (
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
            )}
            <span>Play Latest Episode</span>
          </button>

          <Link
            href="/listen"
            className="btn-secondary"
          >
            Listen Anywhere
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-theatrical-950 to-transparent" />

      {/* Video Clip Modal - COMMENTED OUT */}
      {/* <VideoClipModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      /> */}
    </section>
  )
}
