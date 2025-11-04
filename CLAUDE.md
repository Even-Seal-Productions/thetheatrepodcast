# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 website for "The Theatre Podcast with Alan Seales" - a theatre-focused interview podcast. The site features a persistent audio player, episode browsing, and platform links.

## Development Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS with custom theatrical theme
- **Fonts**: Montserrat (sans), Playfair Display (display)

### Path Aliases
- `@/*` maps to the project root (configured in tsconfig.json)
- Example: `import { Episode } from '@/lib/types'`

### Design System

**Brand Colors** (tailwind.config.ts):
- `spotlight-*`: Gold/yellow accent colors (primary CTA color: #E5B830)
- `theatrical-*`: Deep red brand colors (dark background: theatrical-950)
- `accent-*`: Teal/cyan accent (#00CED1)

**Custom CSS Classes** (app/globals.css):
- `.spotlight-glow`: Animated radial gradient effect
- `.glass-card`: Frosted glass effect with backdrop blur
- `.btn-primary`: Gold button with hover effects
- `.btn-secondary`: Red theatrical button
- `.section-title`: Gradient text effect for headings

### Application Structure

**Layout System**:
- Root layout (app/layout.tsx) wraps all pages with `AudioPlayerProvider`
- Header and Footer are persistent across all pages
- Uses `dark` class on `<html>` tag for dark mode

**Audio Player Architecture**:
- `AudioPlayerProvider` (components/audio/AudioPlayerProvider.tsx): Global React Context for audio state
- Context manages: `currentEpisode`, `isPlaying`, `playEpisode()`, `pause()`, `resume()`
- `AudioPlayer` component renders when an episode is playing
- Audio player is persistent across page navigation
- Usage: Import `useAudioPlayer()` hook in any component to control playback

**Type System** (lib/types.ts):
- `Episode`: Core podcast episode data structure with guests, duration, audioUrl, imageUrl
- `Guest`: Guest information with bio, credits, awards, social links
- `Platform`: Podcast platform links (Apple, Spotify, YouTube, BPN, RSS)
- `PodcastMetadata`: Show-level metadata
- `ChapterMarker`: Episode timestamp markers

**Configuration** (lib/constants.ts):
- `PODCAST_PLATFORMS`: Array of platform objects with icons and colors
- `SITE_CONFIG`: Podcast name, description, host, contact info, social links
- `NAV_ITEMS`: Navigation menu structure

### Pages

All pages use Next.js App Router file-based routing:
- `/` (app/page.tsx): Home - Hero, latest episode, featured guests, about preview
- `/episodes` (app/episodes/page.tsx): Episode index with filtering/search
- `/guests` (app/guests/page.tsx): Featured guests grid
- `/about` (app/about/page.tsx): About the podcast
- `/booking` (app/booking/page.tsx): For publicists
- `/listen` (app/listen/page.tsx): Platform links hub
- `/contact` (app/contact/page.tsx): Contact form

### Component Organization

```
components/
├── audio/          # Audio player and provider
├── home/           # Home page sections (Hero, LatestEpisode, FeaturedGuests, etc.)
└── layout/         # Header, Footer
```

### Image Configuration

Next.js image domains are configured in next.config.js for Megaphone CDN:
- `images.megaphone.fm`
- `www.megaphone.fm`

### Megaphone API Integration (Planned)

The site is designed to integrate with Megaphone podcast hosting:
- Set `MEGAPHONE_API_KEY` and `MEGAPHONE_PODCAST_ID` in `.env`
- API routes would fetch episodes automatically
- No API routes currently implemented (app/api/ does not exist yet)

### Styling Conventions

- Dark theme with theatrical (red) background
- Spotlight (gold) for CTAs and highlights
- Use `font-display` (Playfair) for headings, `font-sans` (Montserrat) for body
- Responsive design with mobile-first approach
- Custom scrollbar styling for dark theme
- Glass morphism effects on cards

## Key Implementation Notes

1. **Client Components**: AudioPlayerProvider and related audio components must be client components (`'use client'`)
2. **Episode Display**: Episodes show guest information, duration (formatted via `formatDuration()`), and publish date (formatted via `formatDate()`)
3. **Navigation**: Header component should highlight current page based on route
4. **SEO**: Metadata is configured in layout.tsx with OpenGraph and Twitter card support
5. **Icons**: Use Lucide React for all icons

## Remaining Work to Complete

**Current Status**: ✅ The site has full data integration with Megaphone RSS feed, complete audio player with all features, search with autocomplete, and infinite scroll. The core functionality is complete and working locally.

### ✅ COMPLETED (2025-10-27)

**Episode Data Integration** - DONE:
- ✅ Created API routes at `app/api/episodes/route.ts` for fetching episode data
- ✅ Implemented RSS feed parsing from Megaphone (https://feeds.megaphone.fm/thetheatrepodcast)
- ✅ Guest extraction from episode titles (format: #XXX - GUEST NAME: TITLE, excluding BONUS episodes)
- ✅ All components now use real data via SWR:
  - `components/home/RecentEpisodes.tsx` - loads 8 recent episodes
  - `components/home/LatestEpisode.tsx` - loads latest episode
  - `components/home/FeaturedGuests.tsx` - reverted to placeholder cards for now
- ✅ SWR configured with 5-minute cache refresh

**Audio Player** - FULLY COMPLETE:
- ✅ Complete AudioPlayer with all controls (components/audio/AudioPlayer.tsx)
- ✅ Progress bar with seek functionality
- ✅ Volume control with mute button
- ✅ Playback speed selector (0.5x - 2x)
- ✅ Skip forward/back 15 seconds
- ✅ Keyboard shortcuts (Space/K = play/pause, Arrow keys = seek, M = mute)
- ✅ localStorage persistence (saves playback position every 5 seconds)
- ✅ Loading states with spinner indicators
- ✅ Playing indicators on episode cards (spinner while loading, animated bars when playing)
- ✅ Consistent UX: image click = play audio, text click = navigate to details

**Episode Pages** - DONE:
- ✅ Dynamic episode detail pages at `app/episodes/[id]/page.tsx`
- ✅ SEO metadata generation for each episode
- ✅ Static generation for first 50 episodes
- ✅ Episodes list page with infinite scroll (20 episodes per load)
- ✅ Episodes sorted reverse chronologically (latest first)

**Search Functionality** - FULLY COMPLETE:
- ✅ Autocomplete search component (components/common/AutocompleteSearch.tsx)
- ✅ Shows up to 8 matching episodes as you type
- ✅ Keyboard navigation (Arrow Up/Down, Enter, Escape)
- ✅ Auto-scroll selected item into view
- ✅ Clear button (X) for quick reset
- ✅ Integrated in hero and episodes page
- ✅ Click suggestion = go to episode details
- ✅ Press Enter = see all search results

**UI/UX Improvements** - DONE:
- ✅ Hero "Play Latest Episode" button plays audio immediately (not navigate)
- ✅ Episode cards show 4 lines of description (was 2)
- ✅ Episode card images widened (256px) to show full square graphics
- ✅ Episode cards changed from "Play Episode" button to "Learn More" link
- ✅ "Learn More" positioned at bottom of card with arrow animation on hover
- ✅ Removed "Showing X episodes" text (irrelevant with infinite scroll)

### Priority 1: Deployment & Production

**Vercel Deployment** (READY):
- Site is ready to deploy to Vercel
- Follow instructions in `DEPLOYMENT.md`
- Configure environment variable: `NEXT_PUBLIC_SITE_URL`
- Test build locally first: `npm run build`
- Push to GitHub and connect to Vercel
- ISR is configured (5-minute revalidation)
- Image optimization configured for Megaphone CDN

**Production Testing Checklist**:
- Test audio player on Safari, Chrome, Firefox
- Verify RSS feed fetching works in production
- Test infinite scroll with real data
- Verify search autocomplete performance
- Check mobile responsive design
- Test keyboard shortcuts
- Verify localStorage persistence across sessions

### Priority 2: Video Clips Feature (Planned)

**Video Clips Integration**:
- Create directory: `public/video-clips/` for 9:16 vertical video clips
- Create API route: `app/api/video-clips/route.ts` to fetch random video clip
- Create modal component: `components/home/VideoClipModal.tsx` with theatrical styling
  - Dark theatrical backdrop with glass-card styling
  - 9:16 aspect ratio video player
  - Close button (X) in top-right corner
  - Click outside modal to close
  - ESC key to close
  - Video autoplay on modal open
- Update Hero component to make logo clickable
  - Add onClick handler to logo/title
  - Open VideoClipModal with random clip
  - Add subtle hover effect to indicate clickability

### Priority 3: Forms & Interactivity

**Contact Form** (`app/contact/page.tsx`):
- Implement form with validation (consider react-hook-form + zod)
- Set up email service: Resend, SendGrid, or Nodemailer with SMTP
- Add rate limiting to prevent spam
- Create API route at `app/api/contact/route.ts`

**Guest Booking Form** (`app/booking/page.tsx`):
- Similar form setup with publicist-specific fields
- Optional: integrate with a CRM or Google Sheets

**Newsletter Signup**:
- Add newsletter signup component (likely in Footer)
- Integrate with Mailchimp, ConvertKit, or Buttondown

### Priority 4: Content Management

Choose a content strategy:
- **Option A (CMS)**: Sanity, Contentful, or Strapi for full content control
- **Option B (RSS)**: Parse RSS feed from podcast host (simpler, automated)
- **Option C (Hybrid)**: RSS for episodes + CMS for guests/featured content

If using CMS:
- Define schemas for episodes, guests, show metadata, and video clips
- Video clip schema should include: file URL, title, duration, upload date
- Create admin interface for content updates
- Add video clip uploader in CMS for easy management
- Set up webhooks for automatic deployment on content changes

### Priority 5: SEO & Analytics

**SEO**:
- Add dynamic metadata to episode pages (title, description, OG image)
- Generate `sitemap.xml` using Next.js built-in support
- Create `robots.txt` in `public/`
- Implement JSON-LD structured data for podcast episodes (schema.org/PodcastEpisode)
- Ensure all images have proper alt text

**Analytics**:
- Add Google Analytics 4 or Plausible Analytics
- Track: page views, episode plays, search queries, form submissions, video clip views
- Consider podcast-specific analytics (listen duration, completion rate)
- Track video clip engagement (views, completion rate, which clips are most popular)

### Priority 6: Social & Sharing

- Update `PODCAST_PLATFORMS` in `lib/constants.ts` with real URLs
- Add social sharing buttons to episode pages (Twitter, Facebook, LinkedIn)
- Implement Twitter/X card meta tags with episode artwork
- Create shareable quote cards or audiograms (optional, advanced)

### Priority 7: Production Readiness

**Environment Setup**:
- Create `.env.example` file with all required variables
- Document environment variables needed for production
- Set up different configs for development vs. production

**Error Handling**:
- Add error boundaries for graceful error recovery
- Create custom 404 page at `app/not-found.tsx`
- Create custom error page at `app/error.tsx`
- Add loading states with `loading.tsx` files in route folders

**Performance**:
- Optimize images (Next.js Image already configured)
- Implement ISR (Incremental Static Regeneration) for episode pages
- Add appropriate caching headers for API routes
- Consider CDN for audio files (if self-hosting)

**Testing**:
- Test responsive design on mobile, tablet, desktop
- Test audio player across browsers (Safari, Chrome, Firefox)
- Verify accessibility (keyboard navigation, screen readers)
- Test form submissions and error states

### Priority 8: Deployment

**Hosting Setup** (Vercel recommended):
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up custom domain and SSL (automatic with Vercel)
4. Configure build settings (should work with defaults)
5. Test preview deployments before going to production

**Post-Deployment**:
- Set up monitoring (Vercel Analytics, Sentry for errors)
- Create CI/CD pipeline for automated testing
- Schedule regular backups if using a database
- Monitor Core Web Vitals and podcast download metrics

### Implementation Order

1. **Weeks 1-2**: Episode data integration + API routes
2. **Week 3**: Audio player completion + episode detail pages
3. **Week 4**: Forms (contact, booking) + newsletter
4. **Week 5**: SEO optimization + analytics setup
5. **Week 6**: Testing, polish, and deployment

### Quick Wins

If you need to launch quickly, prioritize:
1. RSS feed parsing for episodes (automates content updates)
2. Basic audio player (play/pause + progress bar)
3. Contact form with email forwarding
4. Deploy to Vercel with custom domain
5. Add Google Analytics

Everything else can be added iteratively post-launch.
- The format of my episode titles is always #XXX - GUEST NAME: TITLE unless it is a BONUS episode (which can be ignored by the system parsing guests.