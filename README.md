# The Theatre Podcast with Alan Seales - Website

A modern, beautiful website for "The Theatre Podcast with Alan Seales" - one of the top interview-style, theatre-focused podcasts in the world.

## Features

- 🎭 **Theatrical Design**: Dark theme with warm spotlight accents
- 🎵 **Persistent Audio Player**: Listen to episodes while browsing
- 📱 **Fully Responsive**: Beautiful on all devices
- ⚡ **Lightning Fast**: Built with Next.js 14 and optimized for performance
- 🔍 **SEO Optimized**: Episode pages rank for guest names and show titles
- 🎨 **Modern UI**: TailwindCSS with custom animations
- 🎧 **Listen Anywhere Hub**: Native platform links (Apple, Spotify, YouTube, BPN, RSS)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Fonts**: Inter & Playfair Display (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── audio/            # Audio player components
│   ├── home/             # Home page sections
│   └── layout/           # Header, Footer, etc.
├── lib/                   # Utilities and types
│   ├── constants.ts      # Site configuration
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/               # Static assets

```

## Key Pages

- **Home** (`/`): Hero, latest episode, featured guests, about preview
- **Episodes** (`/episodes`): Filterable, searchable episode index
- **Featured Guests** (`/guests`): Visual grid with awards and credits
- **About** (`/about`): Podcast mission and tone
- **For Publicists** (`/booking`): Booking information and CTA
- **Listen Anywhere** (`/listen`): Platform links hub
- **Contact** (`/contact`): Contact form

## Megaphone Integration

The site is designed to integrate with the Megaphone API for automatic episode updates:

1. Set `MEGAPHONE_API_KEY` in `.env`
2. Set `MEGAPHONE_PODCAST_ID` in `.env`
3. Episodes will be fetched automatically via API routes

## Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
```

## License

© 2024 The Theatre Podcast with Alan Seales. All rights reserved.
