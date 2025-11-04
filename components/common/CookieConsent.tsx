'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Settings } from 'lucide-react'
import Link from 'next/link'

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    functional: true,
    analytics: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        // Invalid data, show banner
        setShowBanner(true)
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())

    // Make preferences available globally
    if (typeof window !== 'undefined') {
      (window as any).cookiePreferences = prefs
    }

    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
    }
    setPreferences(necessaryOnly)
    savePreferences(necessaryOnly)
  }

  const saveCustom = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto glass-card border-2 border-spotlight-500/30 shadow-2xl">
          <div className="p-6 md:p-8">
            {!showSettings ? (
              // Main Banner
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-spotlight-500/20 flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-spotlight-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    We use cookies to enhance your browsing experience, remember your playback positions,
                    and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                    <Link href="/privacy" className="text-spotlight-400 hover:text-spotlight-300 underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-theatrical-800 hover:bg-theatrical-700 text-white font-semibold rounded-lg transition-all border border-theatrical-600"
                  >
                    <Settings className="h-4 w-4" />
                    Customize
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-6 py-3 bg-theatrical-800 hover:bg-theatrical-700 text-white font-semibold rounded-lg transition-all border border-theatrical-600"
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-3 bg-spotlight-500 hover:bg-spotlight-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              // Settings Panel
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Cookie Preferences</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-theatrical-800/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="mt-1 h-5 w-5 rounded border-gray-600 bg-theatrical-700 cursor-not-allowed"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Necessary Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Required for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-theatrical-800/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="mt-1 h-5 w-5 rounded border-gray-600 bg-theatrical-700 text-spotlight-500 focus:ring-spotlight-500"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Functional Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Enable enhanced functionality like remembering your playback positions and preferences.
                      </p>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-theatrical-800/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="mt-1 h-5 w-5 rounded border-gray-600 bg-theatrical-700 text-spotlight-500 focus:ring-spotlight-500"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Analytics Cookies</h4>
                      <p className="text-sm text-gray-400">
                        Help us understand how visitors interact with our website to improve your experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={saveCustom}
                    className="flex-1 px-6 py-3 bg-spotlight-500 hover:bg-spotlight-600 text-white font-semibold rounded-lg transition-all shadow-lg"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-3 bg-theatrical-800 hover:bg-theatrical-700 text-white font-semibold rounded-lg transition-all border border-theatrical-600"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

// Utility function to check if cookies are allowed
export function areCookiesAllowed(type: 'necessary' | 'functional' | 'analytics'): boolean {
  if (typeof window === 'undefined') return false

  const consent = localStorage.getItem('cookie-consent')
  if (!consent) return type === 'necessary' // Only necessary cookies by default

  try {
    const preferences = JSON.parse(consent)
    return preferences[type] === true
  } catch (e) {
    return type === 'necessary'
  }
}
