'use client'

import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Episode } from '@/lib/types'
import useSWR from 'swr'
import { formatDate } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface AutocompleteSearchProps {
  placeholder?: string
  onSubmit?: (query: string) => void
  className?: string
}

export function AutocompleteSearch({
  placeholder = "Search episodes by guest name, topic, or keyword...",
  onSubmit,
  className = ""
}: AutocompleteSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectedItemRef = useRef<HTMLButtonElement>(null)

  // Fetch search results
  const { data, isLoading } = useSWR<{ episodes: Episode[] }>(
    searchQuery.trim() ? `/api/episodes?query=${encodeURIComponent(searchQuery)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 500
    }
  )

  const results = data?.episodes || []
  const limitedResults = results.slice(0, 8)

  // Show dropdown when there are results
  useEffect(() => {
    setShowDropdown(searchQuery.trim().length > 0 && limitedResults.length > 0)
    setSelectedIndex(-1)
  }, [searchQuery, limitedResults.length])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [selectedIndex])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (onSubmit) {
        onSubmit(searchQuery)
      } else {
        router.push(`/episodes?search=${encodeURIComponent(searchQuery)}`)
      }
      setShowDropdown(false)
      inputRef.current?.blur()
    }
  }

  const handleSelectEpisode = (episodeSlug: string) => {
    router.push(`/episodes/${episodeSlug}`)
    setShowDropdown(false)
    setSearchQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || limitedResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < limitedResults.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < limitedResults.length) {
          handleSelectEpisode(limitedResults[selectedIndex].slug)
        } else {
          handleSearch(e)
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowDropdown(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-4 bg-theatrical-800/50 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotlight-500 focus:border-transparent transition-all"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-theatrical-700 rounded transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-theatrical-800 border border-theatrical-700 rounded-lg shadow-2xl overflow-hidden z-50 max-h-[60vh] sm:max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : limitedResults.length > 0 ? (
            <div>
              {limitedResults.map((episode, index) => (
                <button
                  key={episode.id}
                  ref={selectedIndex === index ? selectedItemRef : null}
                  type="button"
                  onClick={() => handleSelectEpisode(episode.slug)}
                  className={`w-full text-left p-3 sm:p-4 hover:bg-theatrical-700 transition-colors border-b border-theatrical-700 last:border-b-0 ${
                    selectedIndex === index ? 'bg-theatrical-700' : ''
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="font-semibold text-white mb-1 line-clamp-1 text-sm sm:text-base">
                    {episode.title}
                  </div>
                  {episode.guests.length > 0 && (
                    <div className="text-xs sm:text-sm text-spotlight-400 mb-1">
                      {episode.guests.map(g => g.name).join(', ')}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">
                    {formatDate(episode.publishedAt)}
                  </div>
                </button>
              ))}
              {results.length > 8 && (
                <div className="p-3 text-center text-sm text-gray-400 bg-theatrical-750">
                  Showing {limitedResults.length} of {results.length} results. Press Enter to see all.
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">No episodes found</div>
          )}
        </div>
      )}
    </form>
  )
}
