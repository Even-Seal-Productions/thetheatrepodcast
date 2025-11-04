'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(data.message || 'Failed to subscribe. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-8">
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-spotlight-400 mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Subscribe to the Newsletter
        </h2>
        <p className="text-gray-400">
          Get the latest episodes and exclusive content delivered to your inbox
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-4">
          <CheckCircle className="h-12 w-12 text-spotlight-400 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">Thanks for subscribing!</p>
          <p className="text-gray-400 text-sm">Check your inbox for confirmation</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-theatrical-800 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap w-full sm:w-auto sm:min-w-[200px] sm:px-12 flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
