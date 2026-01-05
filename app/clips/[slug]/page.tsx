import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VideoClipPlayer from '@/components/clips/VideoClipPlayer'
import ShareButtons from '@/components/clips/ShareButtons'
import { getAllVideoClips, getVideoClipBySlug } from '@/lib/videoClips'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const clips = await getAllVideoClips()
  return clips.map((clip) => ({
    slug: clip.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const clip = await getVideoClipBySlug(params.slug)

  if (!clip) {
    return {
      title: 'Video Clip Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thetheatrepodcast.com'
  const clipUrl = `${siteUrl}/clips/${clip.slug}`

  return {
    title: `${clip.title} | The Theatre Podcast`,
    description: clip.description || `Watch this clip from The Theatre Podcast with Alan Seales`,
    alternates: {
      canonical: `/clips/${clip.slug}`,
    },
    openGraph: {
      title: clip.title,
      description: clip.description || `Watch this clip from The Theatre Podcast with Alan Seales`,
      url: clipUrl,
      siteName: 'The Theatre Podcast with Alan Seales',
      type: 'video.other',
      videos: [
        {
          url: `${siteUrl}${clip.videoUrl}`,
          type: 'video/mp4',
        },
      ],
      images: [
        {
          url: clip.thumbnailUrl || `${siteUrl}/images/logo-transparent.png`,
          width: 1200,
          height: 630,
          alt: clip.title,
        },
      ],
    },
    twitter: {
      card: 'player',
      title: clip.title,
      description: clip.description || `Watch this clip from The Theatre Podcast with Alan Seales`,
      images: [clip.thumbnailUrl || `${siteUrl}/images/logo-transparent.png`],
      players: [
        {
          playerUrl: clipUrl,
          streamUrl: `${siteUrl}${clip.videoUrl}`,
          width: 720,
          height: 1280,
        },
      ],
    },
  }
}

export default async function VideoClipPage({ params }: Props) {
  const clip = await getVideoClipBySlug(params.slug)

  if (!clip) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-theatrical-950 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <VideoClipPlayer clip={clip} />

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-white mb-4">{clip.title}</h1>
            {clip.description && (
              <p className="text-gray-400 mb-6">{clip.description}</p>
            )}

            <ShareButtons title={clip.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
