# Video Clips Directory

This directory contains video clips for The Theatre Podcast website.

## Important Notes

- **Video files (.mp4, .mov) are NOT committed to the Git repository** due to GitHub's file size limitations
- Video files are excluded via `.gitignore`
- For production deployment, video files should be hosted externally using one of these options:

## Recommended Hosting Solutions

### Option 1: Vercel Blob Storage (Recommended)
- Upload videos to Vercel Blob: https://vercel.com/docs/storage/vercel-blob
- Reference videos via Blob URLs in the application
- Automatic CDN distribution
- Pay-as-you-go pricing

### Option 2: External CDN
- Upload to a CDN service (Cloudflare R2, AWS S3, etc.)
- Update video URLs in the application code
- Better performance for large media files

### Option 3: YouTube/Vimeo Embedding
- Upload videos to YouTube or Vimeo
- Embed via iframe or use their APIs
- Free hosting with professional video player

## Local Development

For local development:
1. Keep video files in this directory
2. They will work locally but won't be pushed to GitHub
3. Update application code to use external URLs for production

## Current Setup

- Local development: Videos served from `/public/video-clips/`
- Production: Videos should be served from external CDN/blob storage
