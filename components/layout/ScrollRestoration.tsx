'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Store scroll position before navigation
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString())
    }

    // Restore scroll position on back/forward navigation
    const handlePopState = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
      if (savedPosition) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'instant' as ScrollBehavior
          })
        })
      }
    }

    // Listen for navigation events
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    // Check if we're returning via back button (navigation type)
    const navigationType = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type
    
    if (navigationType === 'back_forward') {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
      if (savedPosition) {
        // Restore immediately without smooth scrolling
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'instant' as ScrollBehavior
        })
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname])

  // Save scroll position on route change
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString())
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
