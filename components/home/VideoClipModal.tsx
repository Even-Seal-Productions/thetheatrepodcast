'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Loader2, AlertCircle, ChevronLeft, ChevronRight, Share2, Copy, Check } from 'lucide-react'

interface VideoClipModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoClipModal({ isOpen, onClose }: VideoClipModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchRandomClip()
    } else {
      // Reset state when modal closes
      setVideoUrl(null)
      setIsLoading(true)
      setError(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    // Autoplay when video URL is loaded
    if (videoUrl && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error autoplaying video:', err)
      })
    }
  }, [videoUrl])

  const fetchRandomClip = async () => {
    setIsLoading(true)
    setError(null)
    setShowShareMenu(false)
    setCopied(false)

    try {
      const response = await fetch('/api/video-clips')
      const data = await response.json()

      if (data.clip) {
        setVideoUrl(data.clip.url)
      } else {
        setError(data.error || 'No video clips available')
      }
    } catch (err) {
      console.error('Error fetching video clip:', err)
      setError('Failed to load video clip')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyLink = async () => {
    if (videoUrl) {
      try {
        // Create full URL with protocol and domain
        const fullUrl = `${window.location.origin}${videoUrl}`
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleShare = (platform: string) => {
    if (!videoUrl) return

    // Create full URL with protocol and domain
    const fullUrl = `${window.location.origin}${videoUrl}`
    const shareUrl = encodeURIComponent(fullUrl)
    const shareText = encodeURIComponent('Check out this clip from The Theatre Podcast!')

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-theatrical-800 to-theatrical-900 rounded-xl sm:rounded-2xl shadow-2xl border border-spotlight-500/20 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-spotlight-500/10 to-spotlight-600/10 border-b border-spotlight-500/20 px-4 sm:px-6 py-3 sm:py-4">
          <h3 className="text-lg sm:text-xl font-light text-white text-center">
            Enjoy some podcast content!
          </h3>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-theatrical-900/80 hover:bg-theatrical-800 border border-spotlight-500/30 transition-all hover:scale-110"
          aria-label="Close video"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Video container - 9:16 aspect ratio */}
        <div className="px-3 sm:px-6 py-4 sm:py-6">
          <div className="relative w-full bg-black overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: '9/16' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-theatrical-900">
              <Loader2 className="h-12 w-12 text-spotlight-400 animate-spin" />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-theatrical-900 text-center p-6">
              <AlertCircle className="h-12 w-12 text-spotlight-400 mb-4" />
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={fetchRandomClip}
                className="px-6 py-2 bg-spotlight-500 hover:bg-spotlight-600 text-white rounded-lg transition-colors font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              playsInline
              className="w-full h-full object-contain"
              onLoadedData={() => setIsLoading(false)}
            />
          )}
          </div>
        </div>

        {/* Controls */}
        <div className="px-3 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
          {/* Navigation buttons */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={fetchRandomClip}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-theatrical-700 hover:bg-theatrical-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all border border-spotlight-500/20 hover:border-spotlight-500/40"
            >
              <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="font-semibold text-sm sm:text-base">Previous</span>
            </button>
            <button
              onClick={fetchRandomClip}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-theatrical-700 hover:bg-theatrical-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all border border-spotlight-500/20 hover:border-spotlight-500/40"
            >
              <span className="font-semibold text-sm sm:text-base">Next</span>
              <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
            </button>
          </div>

          {/* Share section */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              disabled={!videoUrl || isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-gradient-to-r from-spotlight-500 to-spotlight-600 hover:from-spotlight-600 hover:to-spotlight-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all font-semibold shadow-lg text-sm sm:text-base"
            >
              <Share2 className="h-4 sm:h-5 w-4 sm:w-5" />
              <span>Share Video</span>
            </button>

            {/* Share menu dropdown */}
            {showShareMenu && videoUrl && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-theatrical-800 rounded-lg shadow-xl border border-spotlight-500/30 overflow-hidden animate-slide-up">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theatrical-700 text-white transition-colors border-b border-spotlight-500/20"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theatrical-700 text-white transition-colors border-b border-spotlight-500/20"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Share on X</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theatrical-700 text-white transition-colors border-b border-spotlight-500/20"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Share on Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theatrical-700 text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>Share on LinkedIn</span>
                </button>
              </div>
            )}
          </div>

          {/* Helper text */}
          <p className="text-xs text-center text-gray-400">
            Press ESC or click outside to close
          </p>
        </div>
      </div>
    </div>
  )
}
