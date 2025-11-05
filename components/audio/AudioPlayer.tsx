'use client'

import { useEffect, useState, RefObject } from 'react'
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Gauge, Loader2, Minimize2, Maximize2, X } from 'lucide-react'
import { Episode } from '@/lib/types'
import { formatDuration } from '@/lib/utils'
import { areCookiesAllowed } from '@/components/common/CookieConsent'
import Image from 'next/image'
import { Tooltip } from './Tooltip'

interface AudioPlayerProps {
  episode: Episode
  isPlaying: boolean
  isLoading: boolean
  audioRef: RefObject<HTMLAudioElement>
  onPlayPause: () => void
  onCanPlay: () => void
  onWaiting: () => void
  onPlaying: () => void
  onClose: () => void
}

export function AudioPlayer({ episode, isPlaying, isLoading, audioRef, onPlayPause, onCanPlay, onWaiting, onPlaying, onClose }: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

  // Load saved playback position from localStorage (if functional cookies allowed)
  useEffect(() => {
    if (!areCookiesAllowed('functional')) return

    const savedPosition = localStorage.getItem(`episode-${episode.id}`)
    if (savedPosition && audioRef.current) {
      audioRef.current.currentTime = parseFloat(savedPosition)
    }
  }, [episode.id, audioRef])

  // Save playback position periodically (if functional cookies allowed)
  useEffect(() => {
    if (!areCookiesAllowed('functional')) return

    const interval = setInterval(() => {
      if (audioRef.current && currentTime > 0) {
        localStorage.setItem(`episode-${episode.id}`, currentTime.toString())
      }
    }, 5000) // Save every 5 seconds

    return () => clearInterval(interval)
  }, [episode.id, currentTime])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('playing', onPlaying)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('playing', onPlaying)
    }
  }, [audioRef, onCanPlay, onWaiting, onPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, audioRef])

  // Handle episode changes - load and play new audio
  useEffect(() => {
    if (audioRef.current && episode.audioUrl) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
        })
      }
    }
  }, [episode.audioUrl, episode.id])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const changeSpeed = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      setPlaybackRate(speed)
      setShowSpeedMenu(false)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          onPlayPause()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skip(-15)
          break
        case 'ArrowRight':
          e.preventDefault()
          skip(30)
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onPlayPause])

  return (
    <>
      <audio ref={audioRef} src={episode.audioUrl} />

      {isMinimized ? (
        // Minimized Player - Bottom Left Corner
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 bg-theatrical-900 border border-theatrical-700 rounded-lg shadow-2xl sm:w-64">
          <div className="p-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {episode.imageUrl && (
                  <Image
                    src={episode.imageUrl}
                    alt={episode.title}
                    width={40}
                    height={40}
                    className="rounded flex-shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate text-xs">
                    {episode.title}
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Tooltip text="Rewind 15 seconds">
                <button
                  onClick={() => skip(-15)}
                  className="p-1.5 hover:bg-theatrical-800 rounded-full transition-colors relative"
                  aria-label="Rewind 15 seconds"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold mt-0.5">15</span>
                </button>
              </Tooltip>

              <Tooltip text={isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}>
                <button
                  onClick={onPlayPause}
                  className="p-2 bg-spotlight-500 hover:bg-spotlight-600 rounded-full transition-colors"
                  aria-label={isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
              </Tooltip>

              <Tooltip text="Skip forward 30 seconds">
                <button
                  onClick={() => skip(30)}
                  className="p-1.5 hover:bg-theatrical-800 rounded-full transition-colors relative"
                  aria-label="Skip forward 30 seconds"
                >
                  <RotateCw className="h-4 w-4" />
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold mt-0.5">30</span>
                </button>
              </Tooltip>

              {/* Playback Speed */}
              <div className="relative">
                <Tooltip text="Playback speed">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-0.5 px-2 py-1 hover:bg-theatrical-800 rounded-lg transition-colors text-xs"
                    aria-label="Playback speed"
                  >
                    <Gauge className="h-3 w-3" />
                    <span>{playbackRate}x</span>
                  </button>
                </Tooltip>

                {showSpeedMenu && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-theatrical-800 border border-theatrical-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`block w-full px-3 py-1.5 text-xs text-left hover:bg-theatrical-700 transition-colors ${
                          speed === playbackRate ? 'bg-theatrical-700 text-spotlight-400' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Tooltip text="Expand player">
                <button
                  onClick={() => setIsMinimized(false)}
                  className="p-1 hover:bg-theatrical-800 rounded transition-colors"
                  aria-label="Expand player"
                >
                  <Maximize2 className="h-4 w-4 text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip text="Close player">
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-theatrical-800 rounded transition-colors"
                  aria-label="Close player"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      ) : (
        // Full Player - Bottom Bar
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-theatrical-900 border-t border-theatrical-700 shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          {/* Progress bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-theatrical-700 rounded-lg appearance-none cursor-pointer accent-spotlight-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(Math.floor(duration))}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            {/* Episode info - Left column */}
            <div className="flex items-center gap-3 min-w-0 justify-start md:justify-start justify-center order-2 md:order-1">
              {episode.imageUrl && (
                <Image
                  src={episode.imageUrl}
                  alt={episode.title}
                  width={48}
                  height={48}
                  className="rounded flex-shrink-0 hidden md:block"
                />
              )}
              <div className="min-w-0 flex-1 text-center md:text-left">
                <h4 className="font-semibold text-white truncate text-sm">
                  {episode.title}
                </h4>
              </div>
            </div>

            {/* Centered Controls - Center column */}
            <div className="relative flex items-center justify-center gap-2 order-1 md:order-2">
              {/* Rewind button */}
              <Tooltip text="Rewind 15 seconds">
                <button
                  onClick={() => skip(-15)}
                  className="p-2 hover:bg-theatrical-800 rounded-full transition-colors relative"
                  aria-label="Rewind 15 seconds"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold mt-0.5">15</span>
                </button>
              </Tooltip>

              {/* Play/Pause button - always centered */}
              <Tooltip text={isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}>
                <button
                  onClick={onPlayPause}
                  className="p-3 bg-spotlight-500 hover:bg-spotlight-600 rounded-full transition-colors"
                  aria-label={isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play'}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
              </Tooltip>

              {/* Skip forward button */}
              <Tooltip text="Skip forward 30 seconds">
                <button
                  onClick={() => skip(30)}
                  className="p-2 hover:bg-theatrical-800 rounded-full transition-colors relative"
                  aria-label="Skip forward 30 seconds"
                >
                  <RotateCw className="h-5 w-5" />
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold mt-0.5">30</span>
                </button>
              </Tooltip>

              {/* Playback Speed - positioned to the right of skip button on desktop */}
              <div className="relative hidden lg:block">
                <Tooltip text="Playback speed">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1 px-3 py-1.5 hover:bg-theatrical-800 rounded-lg transition-colors text-sm"
                    aria-label="Playback speed"
                  >
                    <Gauge className="h-4 w-4" />
                    <span>{playbackRate}x</span>
                  </button>
                </Tooltip>

                {showSpeedMenu && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-theatrical-800 border border-theatrical-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-theatrical-700 transition-colors ${
                          speed === playbackRate ? 'bg-theatrical-700 text-spotlight-400' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Volume & Actions - Right column */}
            <div className="flex items-center gap-2 justify-end order-3 md:order-3">
              {/* Mobile controls - Playback speed, Minimize, Close */}
              <div className="flex md:hidden items-center gap-1">
                {/* Playback Speed - mobile only */}
                <div className="relative">
                  <Tooltip text="Playback speed">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="flex items-center gap-1 px-2 py-1 hover:bg-theatrical-800 rounded-lg transition-colors text-xs"
                      aria-label="Playback speed"
                    >
                      <Gauge className="h-4 w-4" />
                      <span>{playbackRate}x</span>
                    </button>
                  </Tooltip>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-theatrical-800 border border-theatrical-700 rounded-lg shadow-xl overflow-hidden z-50">
                      {speeds.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => changeSpeed(speed)}
                          className={`block w-full px-3 py-1.5 text-xs text-left hover:bg-theatrical-700 transition-colors ${
                            speed === playbackRate ? 'bg-theatrical-700 text-spotlight-400' : ''
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Tooltip text="Minimize player">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-theatrical-800 rounded transition-colors"
                    aria-label="Minimize player"
                  >
                    <Minimize2 className="h-4 w-4 text-gray-400" />
                  </button>
                </Tooltip>
                <Tooltip text="Close player">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-theatrical-800 rounded transition-colors"
                    aria-label="Close player"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </Tooltip>
              </div>

              {/* Desktop controls - Volume, Minimize, Close */}
              <div className="hidden md:flex items-center gap-2">
                <Tooltip text={isMuted || volume === 0 ? 'Unmute' : 'Mute'}>
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:bg-theatrical-800 rounded transition-colors"
                    aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </Tooltip>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-theatrical-700 rounded-lg appearance-none cursor-pointer accent-spotlight-500"
                />
              </div>

              <div className="hidden md:flex items-center gap-1">
                <Tooltip text="Minimize player">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-theatrical-800 rounded transition-colors"
                    aria-label="Minimize player"
                  >
                    <Minimize2 className="h-4 w-4 text-gray-400" />
                  </button>
                </Tooltip>
                <Tooltip text="Close player">
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-theatrical-800 rounded transition-colors"
                    aria-label="Close player"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
