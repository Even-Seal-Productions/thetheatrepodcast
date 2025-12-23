// VIDEO FUNCTIONALITY TEMPORARILY DISABLED
// This file is modified to return empty arrays to prevent filesystem reads during build

// import fs from 'fs'
// import path from 'path'

export interface VideoClip {
  slug: string
  title: string
  videoUrl: string
  thumbnailUrl?: string
  description?: string
  fileName: string
}

/*
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.mp4$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
*/

export async function getAllVideoClips(): Promise<VideoClip[]> {
  // DISABLED: Return empty array to prevent filesystem reads
  return []

  /*
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
  */
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getVideoClipBySlug(slug: string): Promise<VideoClip | null> {
  // DISABLED: Return null to prevent filesystem reads
  return null

  /*
  const clips = await getAllVideoClips()
  return clips.find(clip => clip.slug === slug) || null
  */
}
