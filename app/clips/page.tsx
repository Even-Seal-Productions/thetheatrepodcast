import { Metadata } from 'next'
import Link from 'next/link'
import { getAllVideoClips } from '@/lib/videoClips'
import { Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Video Clips | The Theatre Podcast',
  description: 'Watch video clips from The Theatre Podcast with Alan Seales',
}

export default async function ClipsPage() {
  const clips = await getAllVideoClips()

  return (
    <div className="min-h-screen bg-theatrical-950 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">Video Clips</h1>
          <p className="text-gray-400 text-lg">
            Watch highlights and memorable moments from The Theatre Podcast
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clips.map((clip) => (
            <Link
              key={clip.slug}
              href={`/clips/${clip.slug}`}
              className="glass-card overflow-hidden hover:border-spotlight-500/50 transition-all group"
            >
              <div className="aspect-[9/16] relative bg-theatrical-800 overflow-hidden">
                <video
                  src={clip.videoUrl}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  muted
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-spotlight-500 rounded-full p-4 transform group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-spotlight-400 transition-colors">
                  {clip.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {clips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No video clips available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
