'use client'

import { VideoClip } from '@/lib/videoClips'
import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoClipPlayerProps {
  clip: VideoClip
}

export default function VideoClipPlayer({ clip }: VideoClipPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden max-w-md mx-auto"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        src={clip.videoUrl}
        className="w-full h-full object-contain"
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        loop
      />

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlay}
      >
        {/* Center play/pause button */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="bg-spotlight-500 hover:bg-spotlight-600 rounded-full p-6 transition-all transform hover:scale-110"
              aria-label="Play video"
            >
              <Play className="h-12 w-12 text-white fill-white" />
            </button>
          )}
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-white" />
            ) : (
              <Volume2 className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
