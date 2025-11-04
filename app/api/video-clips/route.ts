// VIDEO FUNCTIONALITY TEMPORARILY DISABLED
// This route is commented out to reduce Vercel deployment size

/*
import { NextResponse } from 'next/server'

// List of video clips hosted on GitHub LFS
// Update this list when you add new videos
const VIDEO_CLIPS = [
  'Audition Gone Wrong- A Lesson in Resilience.mp4',
  'Dream Casting LSOH.mp4',
  'Plot in 60s - Aladdin.mp4',
  'Plot in 60s - CATS.mp4',
  'Plot in 60s - Erika.mp4',
  'The Challenge and Significance of Phantom of the Opera.mp4',
]

// GitHub repository information
const GITHUB_USER = 'drmuzikbpn'
const GITHUB_REPO = 'thetheatrepodcast'
const GITHUB_BRANCH = 'main'

export async function GET() {
  try {
    if (VIDEO_CLIPS.length === 0) {
      return NextResponse.json({
        clip: null,
        error: 'No video clips available'
      })
    }

    // Select a random video
    const randomIndex = Math.floor(Math.random() * VIDEO_CLIPS.length)
    const selectedVideo = VIDEO_CLIPS[randomIndex]

    // Generate GitHub raw content URL for LFS files
    // This URL points to the actual file via GitHub's CDN
    const githubUrl = `https://media.githubusercontent.com/media/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/video-clips/${encodeURIComponent(selectedVideo)}`

    return NextResponse.json({
      clip: {
        url: githubUrl,
        filename: selectedVideo
      }
    })
  } catch (error) {
    console.error('Error fetching video clip:', error)
    return NextResponse.json({
      clip: null,
      error: 'Failed to fetch video clip'
    }, { status: 500 })
  }
}
*/

// Placeholder export to prevent build errors
export async function GET() {
  return new Response('Video functionality is currently disabled', { status: 503 })
}
