# Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)
- Your code pushed to a GitHub repository

### Steps

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your live URL (e.g., `your-project.vercel.app`)

5. **Custom Domain (Optional)**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Automatic Deployments

Every git push to `main` will trigger an automatic deployment.

## Performance Optimizations

The site is configured with:
- **ISR (Incremental Static Regeneration)**: Episode pages revalidate every 5 minutes
- **Static Generation**: Most pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **API Caching**: RSS feed cached for 5 minutes

## Monitoring

After deployment:
1. Check build logs in Vercel dashboard
2. Monitor performance with Vercel Analytics (free tier available)
3. Set up error tracking with Sentry (optional)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Test locally with `npm run build`

### Images Not Loading
- Verify `megaphone.imgix.net` is in `next.config.js` remotePatterns
- Check Megaphone RSS feed is accessible

### RSS Feed Issues
- Test feed URL: https://feeds.megaphone.fm/thetheatrepodcast
- Check API route at `/api/episodes`

## Future Enhancements

Ready to implement:
- Contact form (add Resend API key)
- Newsletter signup (add Mailchimp credentials)
- Analytics (add Google Analytics ID)
- Video clips modal (add videos to `public/video-clips/`)
