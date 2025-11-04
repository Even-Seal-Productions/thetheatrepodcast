export interface Episode {
  id: string
  slug: string
  title: string
  description: string
  publishedAt: string
  duration: number
  audioUrl: string
  imageUrl: string
  guests: Guest[]
  showTitle?: string
  season?: number
  episodeNumber?: number
  topics?: string[]
  transcript?: string
  chapterMarkers?: ChapterMarker[]
}

export interface Guest {
  name: string
  bio?: string
  imageUrl?: string
  credits?: string[]
  awards?: string[]
  socialLinks?: {
    twitter?: string
    instagram?: string
    website?: string
  }
}

export interface ChapterMarker {
  time: number
  title: string
}

export interface PodcastMetadata {
  title: string
  description: string
  author: string
  imageUrl: string
  categories: string[]
  language: string
  explicit: boolean
}

export interface Platform {
  name: string
  url: string
  icon: string
  color: string
}

export interface VideoClip {
  id: string
  title: string
  videoUrl: string
  duration: number
  uploadedAt: string
  thumbnailUrl?: string
}
