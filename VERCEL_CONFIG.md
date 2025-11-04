# Vercel Configuration Quick Reference

## Environment Variables Configuration

Copy and paste these into Vercel's Environment Variables settings.

### Production Environment Variables
**Scope: Production**

```
NEXT_PUBLIC_SITE_URL=https://thetheatrepodcast.com
EMAILOCTOPUS_API_KEY=[your_api_key]
EMAILOCTOPUS_LIST_ID=[your_list_id]
RESEND_API_KEY=[your_resend_key]
CONTACT_EMAIL=booking@thetheatrepodcast.com
```

### Staging/Preview Environment Variables
**Scope: Preview**

```
NEXT_PUBLIC_SITE_URL=https://staging.thetheatrepodcast.com
EMAILOCTOPUS_API_KEY=[your_api_key]
EMAILOCTOPUS_LIST_ID=[your_list_id]
RESEND_API_KEY=[your_resend_key]
CONTACT_EMAIL=booking@thetheatrepodcast.com
```

## Domain Configuration

### Production Domains
1. `thetheatrepodcast.com` (primary)
2. `www.thetheatrepodcast.com` (redirect to primary)

### Staging Domain
1. `staging.thetheatrepodcast.com`

## Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Important: After Setting Environment Variables

**You must redeploy for changes to take effect:**
1. Go to **Deployments** tab
2. Click the three dots (•••) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (faster) or rebuild from scratch

## Testing Checklist

After deploying to staging:

- [ ] Visit `https://staging.thetheatrepodcast.com`
- [ ] Check that the site loads correctly
- [ ] Test newsletter signup
- [ ] Visit `https://staging.thetheatrepodcast.com/clips`
- [ ] Click on a video clip
- [ ] Copy the URL and test sharing on:
  - [ ] Twitter (should show video preview)
  - [ ] Facebook (should show video preview)
  - [ ] LinkedIn (should show video preview)
  - [ ] iMessage (should show preview)

After deploying to production:

- [ ] Visit `https://thetheatrepodcast.com`
- [ ] Verify all functionality works
- [ ] Test video clip sharing from production URLs
- [ ] Verify analytics are tracking (if configured)
- [ ] Test on mobile devices

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

### Environment Variables Not Working
- Ensure the variable name starts with `NEXT_PUBLIC_` for client-side access
- Redeploy after changing environment variables
- Check the deployment logs for environment variable values (sensitive values are hidden)

### Video Sharing Not Working
- Use Facebook's Sharing Debugger to check Open Graph tags
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Ensure the URL is publicly accessible (not behind auth)
- Check that video files are in `public/video-clips/`

## DNS Records (For Domain Registrar)

### For thetheatrepodcast.com:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record (www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### For staging.thetheatrepodcast.com:

**CNAME Record:**
```
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
TTL: 3600
```

## Deployment Workflow

1. **Feature Development**: Work on feature branches
2. **Preview Deployment**: Push to GitHub → Vercel auto-deploys preview
3. **Staging**: Merge to `staging` branch → Vercel deploys to staging domain
4. **Production**: Merge to `main` branch → Vercel deploys to production

## Best Practices

1. Always test on staging before deploying to production
2. Use preview deployments to test PRs
3. Monitor Vercel Analytics for performance insights
4. Set up Vercel's Web Vitals monitoring
5. Enable automatic HTTPS certificate renewal
6. Configure redirect rules if needed (in `vercel.json`)
