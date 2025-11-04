# Environment Setup Guide

This guide explains how to configure environment variables for local development, staging, and production environments.

## Environment Variables

### Required Variables

#### `NEXT_PUBLIC_SITE_URL`
**Required for video clip sharing and Open Graph metadata**

- **Local**: `http://localhost:3000`
- **Staging**: `https://staging.thetheatrepodcast.com`
- **Production**: `https://thetheatrepodcast.com`

This variable is used to generate absolute URLs for:
- Open Graph meta tags (social media sharing)
- Video clip sharing URLs
- Twitter card metadata
- Canonical URLs

#### `EMAILOCTOPUS_API_KEY`
Your EmailOctopus API key for newsletter signups.

#### `EMAILOCTOPUS_LIST_ID`
Your EmailOctopus list ID where subscribers will be added.

#### `RESEND_API_KEY`
Your Resend API key for sending contact form emails. Get your API key from: https://resend.com/api-keys

#### `CONTACT_EMAIL`
The email address where contact form submissions will be sent (default: `booking@thetheatrepodcast.com`).

## Local Development Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your values:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   EMAILOCTOPUS_API_KEY=your_actual_api_key
   EMAILOCTOPUS_LIST_ID=your_actual_list_id
   RESEND_API_KEY=your_actual_resend_key
   CONTACT_EMAIL=booking@thetheatrepodcast.com
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Vercel Deployment

### Setting Up Staging Environment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables with **Preview** scope:
   ```
   NEXT_PUBLIC_SITE_URL = https://staging.thetheatrepodcast.com
   EMAILOCTOPUS_API_KEY = [your_api_key]
   EMAILOCTOPUS_LIST_ID = [your_list_id]
   RESEND_API_KEY = [your_resend_key]
   CONTACT_EMAIL = booking@thetheatrepodcast.com
   ```

4. Set up custom domain for staging:
   - Go to **Settings** → **Domains**
   - Add `staging.thetheatrepodcast.com`
   - Configure DNS as instructed by Vercel

### Setting Up Production Environment

1. In Vercel project settings, add these variables with **Production** scope:
   ```
   NEXT_PUBLIC_SITE_URL = https://thetheatrepodcast.com
   EMAILOCTOPUS_API_KEY = [your_api_key]
   EMAILOCTOPUS_LIST_ID = [your_list_id]
   RESEND_API_KEY = [your_resend_key]
   CONTACT_EMAIL = booking@thetheatrepodcast.com
   ```

2. Set up production domain:
   - Go to **Settings** → **Domains**
   - Add `thetheatrepodcast.com` and `www.thetheatrepodcast.com`
   - Configure DNS records as instructed by Vercel

## Environment Variable Scopes in Vercel

- **Production**: Used for your main production deployment (main branch)
- **Preview**: Used for preview deployments (pull requests, staging branch)
- **Development**: Used for local development with `vercel dev` command

## DNS Configuration

### For staging.thetheatrepodcast.com:
Add a CNAME record:
```
Name: staging
Type: CNAME
Value: cname.vercel-dns.com
```

### For thetheatrepodcast.com:
Add these records:
```
Name: @
Type: A
Value: 76.76.21.21

Name: www
Type: CNAME
Value: cname.vercel-dns.com
```

## Testing Video Clip Sharing

After deployment, test the video clip sharing:

1. Navigate to `/clips` to see all video clips
2. Click on a clip to view its page
3. Copy the URL and paste it into:
   - Twitter post composer
   - Facebook post composer
   - LinkedIn post composer
   - iMessage or other messaging apps

You should see a rich preview with:
- Video thumbnail
- Title and description
- Inline video player (on supported platforms)

## Troubleshooting

### Video clips not showing rich previews

1. Verify `NEXT_PUBLIC_SITE_URL` is set correctly (must be https:// for production)
2. Check that the URL is publicly accessible
3. Use Facebook's Sharing Debugger: https://developers.facebook.com/tools/debug/
4. Use Twitter's Card Validator: https://cards-dev.twitter.com/validator

### Environment variables not updating

1. After changing environment variables in Vercel, you need to redeploy
2. Go to **Deployments** → find latest deployment → **Redeploy**
3. Or push a new commit to trigger a fresh deployment

## Security Notes

- Never commit `.env.local` to version control (it's in `.gitignore`)
- Keep your EmailOctopus API keys secure
- Rotate API keys if they're accidentally exposed
- Use Vercel's encrypted environment variables for sensitive data
