import { Briefcase, Users, Mic2, Calendar, CheckCircle, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export default function BookingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Book Your Client</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Position your clients on one of NYC's premier arts & entertainment podcasts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-spotlight-400">~500</div>
            <div className="text-sm text-gray-400 mt-2">Episodes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-spotlight-400">1M+</div>
            <div className="text-sm text-gray-400 mt-2">Listeners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-spotlight-400">A-List</div>
            <div className="text-sm text-gray-400 mt-2">Guests</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-spotlight-400">NYC</div>
            <div className="text-sm text-gray-400 mt-2">TXSQ Studio or Remote</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Why Appear?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Engaged Audience', desc: 'Over 1 million passionate listeners' },
                { title: 'Industry Reach', desc: 'Heard by fans and industry professionals' },
                { title: 'SEO Benefits', desc: 'Episodes rank for guest names' },
                { title: 'Long-Form Format', desc: 'Unscripted, genuine conversations' },
                { title: 'Professional Production', desc: 'Times Square studio or virtual' },
                { title: 'Global Distribution', desc: 'Everywhere podcasts are found' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-spotlight-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <Calendar className="h-8 w-8 text-spotlight-400 mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-3">Easy Scheduling</h3>
              <p className="text-gray-400 text-sm">Flexible times, in-studio or virtual</p>
            </div>
            <div className="glass-card p-6">
              <Mic2 className="h-8 w-8 text-spotlight-400 mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-3">45-60 Minutes</h3>
              <p className="text-gray-400 text-sm">Unscripted, authentic conversations</p>
            </div>
            <div className="glass-card p-6">
              <CheckCircle className="h-8 w-8 text-spotlight-400 mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-3">Quick Turnaround</h3>
              <p className="text-gray-400 text-sm">Published within 1-2 days, if needed</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12">
            <Mail className="h-12 w-12 text-spotlight-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Book?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Contact us to discuss booking your client for an upcoming episode
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
