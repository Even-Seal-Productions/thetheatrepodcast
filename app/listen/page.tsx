import { PODCAST_PLATFORMS } from '@/lib/constants'
import { ExternalLink } from 'lucide-react'
import * as Icons from 'lucide-react'
import { NewsletterSignup } from '@/components/common/NewsletterSignup'

export default function ListenPage() {
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      apple: Icons.Smartphone,
      spotify: Icons.Music,
      youtube: Icons.Youtube,
      radio: Icons.Radio,
      rss: Icons.Rss,
    }
    const IconComponent = iconMap[iconName] || Icons.Headphones
    return <IconComponent className="h-12 w-12" />
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-title">Listen Anywhere</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Subscribe and listen on your favorite podcast platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PODCAST_PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-8 hover:border-spotlight-500/50 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <div style={{ color: platform.color }}>
                    {getIcon(platform.icon)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-spotlight-400 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-gray-400 text-sm">Listen now</p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-spotlight-400 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
