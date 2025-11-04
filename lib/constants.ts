import { Platform } from './types'

export const PODCAST_PLATFORMS: Platform[] = [
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/the-theatre-podcast-with-alan-seales/id1440397001',
    icon: 'apple',
    color: '#A855F7',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/1pjVrJ7H9E2Qpyss8ksLVS',
    icon: 'spotify',
    color: '#1DB954',
  },
  {
    name: 'YouTube',
    url: 'http://youtube.com/thetheatrepodcast',
    icon: 'youtube',
    color: '#FF0000',
  },
  {
    name: 'Pandora',
    url: 'https://www.pandora.com/podcast/the-theatre-podcast-with-alan-seales/PC:9093?part=PC:9093&corr=podcast_organic_external&TID=Brand:SCO:PC9093:podcast_organic_external',
    icon: 'radio',
    color: '#3668FF',
  },
  {
    name: 'Castbox',
    url: 'https://castbox.fm/channel/The-Theatre-Podcast-with-Alan-Seales-id2192849?country=us',
    icon: 'radio',
    color: '#F55B23',
  },
  {
    name: 'Broadway Podcast Network',
    url: 'https://broadwaypodcastnetwork.com/podcasts/the-theatre-podcast-with-alan-seales',
    icon: 'radio',
    color: '#F59E0B',
  },
  {
    name: 'iHeartRadio',
    url: 'https://www.iheart.com/podcast/263-the-theatre-podcast-with-a-30730229',
    icon: 'radio',
    color: '#C6002B',
  },
  {
    name: 'RSS Feed',
    url: 'https://feeds.megaphone.fm/thetheatrepodcast',
    icon: 'rss',
    color: '#F97316',
  },
]

export const SITE_CONFIG = {
  name: 'The Theatre Podcast with Alan Seales',
  description: 'One of the top interview-style, theatre-focused podcasts in the world. Unscripted. Unfiltered. Unforgettable.',
  tagline: 'Unscripted. Unfiltered. Unforgettable.',
  host: 'Alan Seales',
  email: 'booking@thetheatrepodcast.com',
  location: 'Times Square, NYC',
  socialLinks: {
    instagram: 'https://www.instagram.com/theatre_podcast/',
    facebook: 'https://www.facebook.com/officialtheatrepodcast',
    tiktok: 'https://www.tiktok.com/@thetheatrepodcast',
  },
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Episodes', href: '/episodes' },
  { label: 'Collections', href: '/collections' },
  // { label: 'Featured Guests', href: '/guests' },
  { label: 'About', href: '/about' },
  { label: 'For Publicists', href: '/booking' },
  { label: 'Listen Anywhere', href: '/listen' },
  { label: 'Contact', href: '/contact' },
]
