'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theatrical-800 bg-theatrical-950/95 backdrop-blur supports-[backdrop-filter]:bg-theatrical-950/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo-transparent.png"
                alt="The Theatre Podcast with Alan Seales"
                width={40}
                height={40}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="hidden lg:block">
              <span className="font-sans text-lg font-bold">
                <span className="text-white">The Theatre Podcast</span>
                <span className="bg-gradient-to-r from-spotlight-400 to-spotlight-600 bg-clip-text text-transparent"> with Alan Seales</span>
              </span>
            </div>
            <div className="hidden sm:block lg:hidden">
              <span className="font-sans text-lg font-bold text-white">
                The Theatre Podcast
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-spotlight-400 hover:bg-theatrical-800/50 rounded-md transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-theatrical-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-theatrical-800">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-spotlight-400 hover:bg-theatrical-800/50 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
