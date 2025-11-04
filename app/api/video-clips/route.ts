import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const videoClipsDir = path.join(process.cwd(), 'public', 'video-clips')

    // Check if directory exists
    try {
      await fs.access(videoClipsDir)
    } catch {
      return NextResponse.json({
        clip: null,
        error: 'No video clips directory found'
      })
    }

    // Read all files from the video-clips directory
    const files = await fs.readdir(videoClipsDir)

    // Filter for video files (mp4, webm, mov)
    const videoFiles = files.filter(file =>
      /\.(mp4|webm|mov)$/i.test(file) && !file.startsWith('.')
    )

    if (videoFiles.length === 0) {
      return NextResponse.json({
        clip: null,
        error: 'No video clips available'
      })
    }

    // Select a random video
    const randomIndex = Math.floor(Math.random() * videoFiles.length)
    const selectedVideo = videoFiles[randomIndex]

    return NextResponse.json({
      clip: {
        url: `/video-clips/${selectedVideo}`,
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
