import fs from 'fs'
import path from 'path'

export interface VideoClip {
  slug: string
  title: string
  videoUrl: string
  thumbnailUrl?: string
  description?: string
  fileName: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.mp4$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function getAllVideoClips(): Promise<VideoClip[]> {
  const videoClipsDir = path.join(process.cwd(), 'public', 'video-clips')

  try {
    const files = fs.readdirSync(videoClipsDir)

    const clips: VideoClip[] = files
      .filter(file => file.endsWith('.mp4'))
      .map(file => {
        const title = file.replace('.mp4', '')
        const slug = slugify(file)

        return {
          slug,
          title,
          fileName: file,
          videoUrl: `/video-clips/${encodeURIComponent(file)}`,
          // You can add thumbnails later by checking for matching image files
          thumbnailUrl: undefined,
          description: `Watch "${title}" from The Theatre Podcast with Alan Seales`,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))

    return clips
  } catch (error) {
    console.error('Error reading video clips:', error)
    return []
  }
}

export async function getVideoClipBySlug(slug: string): Promise<VideoClip | null> {
  const clips = await getAllVideoClips()
  return clips.find(clip => clip.slug === slug) || null
}
