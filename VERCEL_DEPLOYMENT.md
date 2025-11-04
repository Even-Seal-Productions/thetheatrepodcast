# Vercel Deployment Guide

This document outlines the exact environment variables and configuration needed to deploy The Theatre Podcast website to Vercel.

## Repository Setup

The project has two branches:
- **`main`** - Production environment (allows search engine indexing)
- **`dev`** - Staging environment (blocks search engine indexing)

GitHub Repository: `https://github.com/drmuzikbpn/thetheatrepodcast.git`

## Vercel Project Setup

1. Import the GitHub repository to Vercel
2. Create **two separate Vercel projects**:
   - Production project (connected to `main` branch)
   - Staging project (connected to `dev` branch)

Alternatively, use Vercel's **preview deployments** feature:
- Production: deploys from `main` branch
- Staging: preview deployments from `dev` branch

## Environment Variables

### Required for ALL Environments (Production + Staging)

These variables must be set in **both** Vercel projects:

#### Site Configuration
```
NEXT_PUBLIC_SITE_URL
```
- **Production value**: `https://thetheatrepodcast.com` (or your custom domain)
- **Staging value**: `https://your-staging-domain.vercel.app`
- **Purpose**: Used by `app/robots.ts` to determine whether to allow or block search engine indexing
- **Note**: Must include protocol (https://)

#### EmailOctopus Configuration (Newsletter Subscriptions)
```
EMAILOCTOPUS_API_KEY=eo_fb477560a2189604f1ba3b13d205ff9ef25d541a4f893da508f4a8cea55a5700
EMAILOCTOPUS_LIST_ID=e79496ae-5417-11ef-9b7a-b59c864d74f7
```
- **Purpose**: Newsletter signup functionality
- **Same values for both environments**

#### Resend Configuration (Contact Form Emails)
```
RESEND_API_KEY=re_NPcx2iLz_KqPZhzKHxE8a15R2SD6KLsZN
CONTACT_EMAIL=booking@thetheatrepodcast.com
```
- **Purpose**: Sends contact form submissions via email
- **Same values for both environments**
- **Note**: Using verified domain `evensealproductions.com` for sender

#### Google reCAPTCHA v2 Configuration

**Production**:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your_production_site_key>
RECAPTCHA_SECRET_KEY=<your_production_secret_key>
```

**Staging/Dev**:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```
- **Purpose**: Spam protection on contact form
- **Note**: Staging uses Google's test keys (always pass verification)
- **Production**: Register your domain at https://www.google.com/recaptcha/admin

---

## Complete Environment Variable List

### Production Environment Variables

Set these in your **Production** Vercel project:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://thetheatrepodcast.com

# EmailOctopus (Newsletter)
EMAILOCTOPUS_API_KEY=eo_fb477560a2189604f1ba3b13d205ff9ef25d541a4f893da508f4a8cea55a5700
EMAILOCTOPUS_LIST_ID=e79496ae-5417-11ef-9b7a-b59c864d74f7

# Resend (Contact Form Emails)
RESEND_API_KEY=re_NPcx2iLz_KqPZhzKHxE8a15R2SD6KLsZN
CONTACT_EMAIL=booking@thetheatrepodcast.com

# Google reCAPTCHA v2 (Get production keys from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your_production_site_key>
RECAPTCHA_SECRET_KEY=<your_production_secret_key>
```

### Staging Environment Variables

Set these in your **Staging** Vercel project (or as preview deployment env vars):

```env
# Site Configuration (IMPORTANT: Use staging URL to block search indexing)
NEXT_PUBLIC_SITE_URL=https://ttp-staging.vercel.app

# EmailOctopus (Newsletter) - Same as production
EMAILOCTOPUS_API_KEY=eo_fb477560a2189604f1ba3b13d205ff9ef25d541a4f893da508f4a8cea55a5700
EMAILOCTOPUS_LIST_ID=e79496ae-5417-11ef-9b7a-b59c864d74f7

# Resend (Contact Form Emails) - Same as production
RESEND_API_KEY=re_NPcx2iLz_KqPZhzKHxE8a15R2SD6KLsZN
CONTACT_EMAIL=booking@thetheatrepodcast.com

# Google reCAPTCHA v2 (Test keys - always pass)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

---

## Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. Go to https://vercel.com/new
2. Import `drmuzikbpn/thetheatrepodcast` repository
3. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2. Configure Production Project

1. **Project Name**: `thetheatrepodcast` (or similar)
2. **Git Branch**: `main`
3. **Environment Variables**: Add all production variables listed above
4. **Custom Domain**: Add your domain (e.g., `thetheatrepodcast.com`)
5. Deploy

### 3. Configure Staging Project (Optional but Recommended)

**Option A: Separate Project**
1. Create new Vercel project from same GitHub repo
2. **Project Name**: `thetheatrepodcast-staging`
3. **Git Branch**: `dev`
4. **Environment Variables**: Add all staging variables listed above
5. Deploy

**Option B: Preview Deployments**
1. Use same production project
2. Set up preview deployment environment variables for `dev` branch
3. Every push to `dev` creates a preview deployment

### 4. Verify robots.txt Configuration

After deployment, verify search engine indexing settings:

**Production** (`https://thetheatrepodcast.com/robots.txt`):
```
User-agent: *
Allow: /

Sitemap: https://thetheatrepodcast.com/sitemap.xml
```

**Staging** (`https://ttp-staging.vercel.app/robots.txt`):
```
User-agent: *
Disallow: /
```

---

## Important Notes

### Search Engine Indexing

The `app/robots.ts` file automatically determines indexing rules based on `NEXT_PUBLIC_SITE_URL`:

- **Production**: If URL contains `thetheatrepodcast.com` and NOT `staging` → Allow indexing
- **Staging**: All other URLs → Block indexing

This prevents staging/preview sites from appearing in search results.

### Video Files

Video files in `public/video-clips/` are **NOT included in the repository** due to GitHub file size limits.

For production deployment, you must:

1. **Option 1 - Vercel Blob Storage** (Recommended):
   - Upload videos to Vercel Blob: https://vercel.com/docs/storage/vercel-blob
   - Update video URLs in the application code
   - Add Vercel Blob environment variable if needed

2. **Option 2 - External CDN**:
   - Upload to Cloudflare R2, AWS S3, or similar
   - Update video URLs in application code

3. **Option 3 - YouTube/Vimeo**:
   - Upload to YouTube or Vimeo
   - Embed via iframe

See `public/video-clips/README.md` for detailed instructions.

### Email Configuration

The contact form uses:
- **Sender**: `The Theatre Podcast <noreply@evensealproductions.com>`
- **Recipient**: `booking@thetheatrepodcast.com`
- **Reply-To**: User's submitted email address

This configuration works with Resend's free tier because `evensealproductions.com` is a verified domain.

### reCAPTCHA Setup for Production

Before going live, register your production domain:

1. Go to https://www.google.com/recaptcha/admin
2. Register a new site:
   - **reCAPTCHA type**: v2 "I'm not a robot"
   - **Domains**: Add `thetheatrepodcast.com` (and any other domains)
3. Copy the **Site Key** and **Secret Key**
4. Update Vercel environment variables:
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = Site Key
   - `RECAPTCHA_SECRET_KEY` = Secret Key
5. Redeploy the project

---

## Testing Checklist

After deployment, test the following:

### Production
- [ ] Site loads at custom domain
- [ ] `/robots.txt` shows "Allow: /"
- [ ] Contact form sends emails to `booking@thetheatrepodcast.com`
- [ ] Newsletter signup adds contacts to EmailOctopus
- [ ] reCAPTCHA works (production keys)
- [ ] Episodes load from Megaphone RSS feed
- [ ] Audio player works
- [ ] Search/autocomplete works
- [ ] All pages render correctly

### Staging
- [ ] Site loads at Vercel preview URL
- [ ] `/robots.txt` shows "Disallow: /"
- [ ] Contact form sends emails (test keys work)
- [ ] All functionality works same as production

---

## Troubleshooting

### Environment Variables Not Working

1. Verify variables are set in correct Vercel project
2. Redeploy after adding/changing variables
3. Check variable names match exactly (case-sensitive)
4. For `NEXT_PUBLIC_*` variables, rebuild is required

### Contact Form Not Sending Emails

1. Check `RESEND_API_KEY` is correct
2. Verify `CONTACT_EMAIL` is spelled correctly
3. Check Vercel function logs for errors
4. Verify sender domain is verified in Resend

### Wrong robots.txt Served

1. Check `NEXT_PUBLIC_SITE_URL` is set correctly
2. Verify URL includes `https://`
3. Clear browser cache
4. Check deployment logs for build errors

### reCAPTCHA Errors

1. Production: Verify domain is registered in reCAPTCHA admin
2. Check site key and secret key match
3. Staging: Use Google's test keys
4. Check browser console for JavaScript errors

---

## Support

For Vercel deployment issues:
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

For application issues:
- Check GitHub repository: https://github.com/drmuzikbpn/thetheatrepodcast
- Review `CLAUDE.md` for architecture details
