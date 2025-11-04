'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  text: string
  delay?: number
}

export function Tooltip({ children, text, delay = 1000 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    // Start the delay timer
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseMove = () => {
    // Reset the timer on mouse movement
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current)
    }
    setIsVisible(false)

    // Restart the delay timer after movement stops
    moveTimeoutRef.current = setTimeout(() => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }, 100) // Wait 100ms after last movement
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-theatrical-800 text-white text-xs rounded shadow-lg whitespace-nowrap border border-theatrical-700 pointer-events-none z-50">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-theatrical-800" />
        </div>
      )}
    </div>
  )
}
