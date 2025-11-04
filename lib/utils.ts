import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function stripHtml(html: string): string {
  // Remove HTML tags and decode common entities
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export function addTargetBlankToLinks(html: string): string {
  // Add target="_blank" and rel="noopener noreferrer" to all links
  return html.replace(
    /<a\s+([^>]*href=["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      // Check if target attribute already exists
      if (/target\s*=/i.test(attrs)) {
        return match
      }
      // Check if rel attribute already exists
      const hasRel = /rel\s*=/i.test(attrs)
      if (hasRel) {
        // Add to existing rel
        attrs = attrs.replace(/rel\s*=\s*["']([^"']*)["']/i, 'rel="$1 noopener noreferrer"')
      } else {
        // Add new rel attribute
        attrs += ' rel="noopener noreferrer"'
      }
      return `<a ${attrs} target="_blank">`
    }
  )
}
