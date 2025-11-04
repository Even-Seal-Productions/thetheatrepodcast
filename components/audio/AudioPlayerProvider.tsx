'use client'

import { createContext, useContext, useState, useRef, ReactNode } from 'react'
import { Episode } from '@/lib/types'
import { AudioPlayer } from './AudioPlayer'

interface AudioPlayerContextType {
  currentEpisode: Episode | null
  isPlaying: boolean
  isLoading: boolean
  playEpisode: (episode: Episode) => void
  pause: () => void
  resume: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  }
  return context
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playEpisode = (episode: Episode) => {
    // If same episode, just toggle play
    if (currentEpisode?.id === episode.id) {
      if (isPlaying) {
        pause()
      } else {
        resume()
      }
      return
    }

    // New episode - show loading
    setCurrentEpisode(episode)
    setIsLoading(true)
    setIsPlaying(true)
  }

  const pause = () => {
    setIsPlaying(false)
    audioRef.current?.pause()
  }

  const resume = () => {
    setIsPlaying(true)
    audioRef.current?.play()
  }

  const handleCanPlay = () => {
    setIsLoading(false)
  }

  const handleWaiting = () => {
    setIsLoading(true)
  }

  const handlePlaying = () => {
    setIsLoading(false)
  }

  const closePlayer = () => {
    pause()
    setCurrentEpisode(null)
  }

  return (
    <AudioPlayerContext.Provider
      value={{ currentEpisode, isPlaying, isLoading, playEpisode, pause, resume }}
    >
      {children}
      {currentEpisode && (
        <AudioPlayer
          episode={currentEpisode}
          isPlaying={isPlaying}
          isLoading={isLoading}
          audioRef={audioRef}
          onPlayPause={() => (isPlaying ? pause() : resume())}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onClose={closePlayer}
        />
      )}
    </AudioPlayerContext.Provider>
  )
}
