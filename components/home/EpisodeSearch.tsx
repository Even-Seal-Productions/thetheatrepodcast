'use client'

import { AutocompleteSearch } from '@/components/common/AutocompleteSearch'

export function EpisodeSearch() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <AutocompleteSearch placeholder="Search episodes..." />
    </div>
  )
}
