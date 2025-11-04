'use client'

import { useState } from 'react'
import { Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const url = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=theatre_podcast`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const handleFacebookShare = () => {
    const url = window.location.href
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Share this clip</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-theatrical-800 hover:bg-theatrical-700 text-white rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="h-5 w-5" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <button
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
        >
          <Twitter className="h-5 w-5" />
          <span>Twitter</span>
        </button>

        <button
          onClick={handleFacebookShare}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg transition-colors"
        >
          <Facebook className="h-5 w-5" />
          <span>Facebook</span>
        </button>
      </div>
    </div>
  )
}
