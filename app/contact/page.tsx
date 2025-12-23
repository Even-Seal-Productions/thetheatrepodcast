'use client'

import { useState, useEffect } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

interface ReCaptcha {
  getResponse: () => string
  reset: () => void
}

declare global {
  interface Window {
    grecaptcha: ReCaptcha | undefined
    onRecaptchaSuccess: () => void
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Load Google reCAPTCHA v2 script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    // Define callback for reCAPTCHA
    window.onRecaptchaSuccess = () => {
      setIsVerified(true)
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!isVerified) {
      setError('Please verify that you are human by completing the reCAPTCHA.')
      setLoading(false)
      return
    }

    // Get reCAPTCHA response token
    const recaptchaToken = window.grecaptcha?.getResponse()

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setIsVerified(false)
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
        // Keep the success message visible indefinitely
      } else {
        setError(data.message || 'Failed to send message. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or want to collaborate? We&apos;d love to hear from you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-spotlight-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-theatrical-800 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-theatrical-800 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-theatrical-800 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-theatrical-800 border border-theatrical-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spotlight-500 resize-none"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <div
                    className="g-recaptcha"
                    data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    data-callback="onRecaptchaSuccess"
                    style={{ transform: 'scale(0.85)', transformOrigin: '0 0', width: '100%', maxWidth: '304px' }}
                  ></div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !isVerified}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
