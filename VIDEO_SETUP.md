# Video Clips Setup Guide

This document explains how video clips are configured for The Theatre Podcast website.

## Current Setup: Git LFS + GitHub CDN

Video clips are stored using **Git Large File Storage (LFS)** and served directly from **GitHub's media CDN** - they are NOT bundled in the Vercel deployment.

### Configuration

- **Tracked files**: `public/video-clips/*.mp4`
- **LFS config**: `.gitattributes`
- **Storage**: GitHub LFS
- **Delivery**: GitHub's media CDN (`media.githubusercontent.com`)
- **Cost**: FREE for up to 1GB storage + 1GB bandwidth/month

### Current Usage

- **6 video clips** uploaded (~436 MB)
- Well within free tier limits
- Videos stream directly from GitHub, not from Vercel

---

## Vercel Deployment

### How It Works

Videos are **NOT included** in the Vercel deployment to keep function sizes small (<300MB limit).

Instead:
1. Videos are stored in GitHub LFS
2. API route (`app/api/video-clips/route.ts`) generates GitHub CDN URLs
3. Videos stream directly from `https://media.githubusercontent.com/media/...`
4. Zero bandwidth cost on Vercel
5. Faster deployments (no large files to upload)

### First-Time Setup (Already Done)

If you need to set this up again:

1. Git LFS is already configured (`.gitattributes`)
2. `vercel.json` pulls LFS files during build
3. Videos are automatically deployed with your site

---

## Adding More Videos

### Step 1: Copy videos to directory
```bash
# Copy your .mp4 files to public/video-clips/
cp /path/to/video.mp4 public/video-clips/
```

### Step 2: Add to Git (LFS handles automatically)
```bash
git add public/video-clips/*.mp4
```

Git LFS will automatically track and handle these files. No output is normal!

### Step 3: Update the video list in code
Edit `app/api/video-clips/route.ts` and add your new video to the `VIDEO_CLIPS` array:

```typescript
const VIDEO_CLIPS = [
  'Audition Gone Wrong- A Lesson in Resilience.mp4',
  'Dream Casting LSOH.mp4',
  // ... other videos
  'Your New Video.mp4',  // Add your video filename here
]
```

### Step 4: Verify LFS is tracking
```bash
git lfs ls-files
```

You should see your new files listed with hash IDs and asterisks (`*`).

### Step 5: Commit and push
```bash
git add app/api/video-clips/route.ts
git commit -m "Add new video clips"
git push origin main
```

The files will upload to GitHub LFS (you'll see "Uploading LFS objects" progress).

### Step 6: Deploy
Vercel will automatically:
1. Detect the push to `main` or `dev` branch
2. Deploy instantly (no large files to process!)
3. Videos stream from GitHub CDN

---

## Troubleshooting

### Videos not playing on Vercel

**Problem**: Videos play locally but not on deployed site
**Solution**:

1. Check that the video filename is in the `VIDEO_CLIPS` array in `app/api/video-clips/route.ts`
2. Ensure the video was pushed to GitHub LFS (check `git lfs ls-files`)
3. Verify the GitHub URL is accessible: `https://media.githubusercontent.com/media/drmuzikbpn/thetheatrepodcast/main/public/video-clips/[filename].mp4`
4. Redeploy from Vercel dashboard

### Share links showing relative paths

**Problem**: Share button copies `/video-clips/file.mp4` instead of full URL
**Solution**: Already fixed! Share URLs now include full domain:

```typescript
const fullUrl = `${window.location.origin}${videoUrl}`
```

### LFS bandwidth exceeded

**Problem**: "Error: rate limit exceeded" when pushing
**Solution**: You've exceeded the 1GB/month free bandwidth

**Options**:
1. Wait until next month (bandwidth resets monthly)
2. Purchase LFS Data Pack: $5/month for 50GB storage + 50GB bandwidth
3. Switch to external hosting (see alternatives below)

### Videos too large for GitHub

**Problem**: Individual files over 100MB fail to upload
**Solution**:
- GitHub LFS supports files up to 2GB
- Keep individual clips under 100MB for best performance
- Consider video compression if needed

---

## Video Format Recommendations

**Optimal settings for web**:
- **Format**: MP4 (H.264)
- **Resolution**: 1080x1920 (9:16 vertical)
- **Bitrate**: 5-8 Mbps for good quality
- **File size**: 20-80MB for 30-60 second clips

**Compression tools**:
- HandBrake (free, cross-platform)
- FFmpeg command: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4`

---

## Alternative Hosting Options

If you outgrow Git LFS or need better performance:

### Option 1: Vercel Blob Storage
- **Cost**: $0.15/GB storage + $0.30/GB bandwidth
- **Setup**: Install `@vercel/blob` package
- **Pros**: Integrated with Vercel, CDN included
- **Cons**: More expensive than LFS

### Option 2: Cloudflare R2
- **Cost**: $0.015/GB/month (storage only, FREE egress!)
- **Setup**: Create R2 bucket, update video URLs
- **Pros**: Cheapest option, no bandwidth fees
- **Cons**: Requires code changes

### Option 3: YouTube (Unlisted)
- **Cost**: FREE
- **Setup**: Upload to YouTube as unlisted, embed
- **Pros**: Unlimited storage/bandwidth, professional player
- **Cons**: Must use YouTube player, videos publicly accessible

---

## Current Implementation

### API Route
`app/api/video-clips/route.ts` - Returns random video from directory

### Components
- `components/home/VideoClipModal.tsx` - Modal player with share functionality
- `components/clips/VideoClipPlayer.tsx` - Reusable video player component

### Share Functionality
Videos can be shared via:
- Copy link (full URL with domain)
- Twitter/X
- Facebook
- LinkedIn

All share links now properly include the full domain URL.

---

## Cost Estimate

### Current (6 videos, 436 MB)

**Git LFS Free Tier**:
- Storage: 436 MB / 1 GB (43% used) ✅
- Bandwidth: ~436 MB upload (one-time)
- Monthly bandwidth: Minimal (only when cloning/deploying)
- **Cost**: $0/month ✅

### If you add more videos (up to 1.5 GB total)

- Still within free tier
- **Cost**: $0/month ✅

### If you exceed 1 GB storage

**Git LFS Data Pack**:
- 50 GB storage
- 50 GB bandwidth/month
- **Cost**: $5/month

---

## Summary

✅ Git LFS configured and working
✅ Vercel automatically pulls LFS files
✅ Share links include full URLs
✅ 6 videos deployed successfully
✅ Currently FREE (within limits)

You can add more videos anytime using the process above!
