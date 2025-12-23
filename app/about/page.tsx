import { Mic2, MapPin, Sparkles, Heart } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">About the Podcast</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold text-white mb-6 text-center">
              The Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {SITE_CONFIG.description}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Each episode features intimate, unscripted conversations with A-list film/TV stars and 
              acclaimed Broadway and stage performers. The podcast dives deep into their pivotal moments, career-defining 
              choices, and the human stories behind the performances that have moved millions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether recorded in the Times Square studio or virtually, every conversation is designed 
              to be authentic, insightful, and unforgettable.
            </p>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">
            What Makes This Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                <Mic2 className="h-8 w-8 text-spotlight-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Unscripted
              </h3>
              <p className="text-gray-400">
                No pre-written questions or rehearsed answers. Just authentic conversations 
                that flow naturally and reveal genuine insights.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                <Heart className="h-8 w-8 text-spotlight-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Unfiltered
              </h3>
              <p className="text-gray-400">
                Real stories from the heart. A safe space is created for guests to share 
                their truth, struggles, and triumphs without filters.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spotlight-500/10 mb-4">
                <Sparkles className="h-8 w-8 text-spotlight-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Unforgettable
              </h3>
              <p className="text-gray-400">
                Moments that stay with you long after the episode ends. Stories that 
                inspire, move, and transform how you see the performing arts.
              </p>
            </div>
          </div>
        </div>

        {/* Host Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Meet Your Host
              </h2>
              <p className="text-2xl text-spotlight-400 font-semibold">
                {SITE_CONFIG.host}
              </p>
            </div>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Alan Seales is a passionate advocate for the performing arts and a skilled 
                interviewer who brings out the best in every guest. With thousands of episodes across hundreds of podcasts
                under his belt, Alan has become known for his ability to create intimate, 
                revealing conversations that go beyond the surface.
              </p>
              <p>
                His genuine curiosity and deep respect for the craft of performance create 
                an environment where guests feel comfortable sharing their most personal 
                stories and insights.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-spotlight-400 mb-2">~500</div>
              <div className="text-gray-400">Episodes</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-spotlight-400 mb-2">1M+</div>
              <div className="text-gray-400">Listeners</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-spotlight-400 mb-2">Top 10</div>
              <div className="text-gray-400">Global Theatre Podcast</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-spotlight-400 mb-2">NYC</div>
              <div className="text-gray-400">Conveniently Located</div>
            </div>
          </div>
        </div>

        {/* Recording Info */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-spotlight-400" />
              <h2 className="font-display text-3xl font-bold text-white">
                Where We Record
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
              Episodes are recorded in our professional studio in the heart of Times Square, NYC,
              at a remote location of your choosing in the NYC area
              as well as virtually to accommodate guests from around the world.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Start Listening Today
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join over a million listeners who tune in for authentic conversations 
              with the biggest names in theater and entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/episodes" className="btn-primary">
                Browse Episodes
              </Link>
              <Link href="/listen" className="btn-secondary">
                Listen Anywhere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
