import { Mail, Briefcase } from 'lucide-react'
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-theatrical-950 via-spotlight-500/5 to-theatrical-950" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* For Publicists */}
            <div className="glass-card p-6 sm:p-8 hover:border-spotlight-500/50 transition-all group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-spotlight-500/10 mb-4 group-hover:bg-spotlight-500/20 transition-colors">
                <Briefcase className="h-6 w-6 text-spotlight-400" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                For Publicists
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                Book your clients on one of NYC&apos;s premier arts &amp; entertainment podcasts. 
                Learn about our format, audience, and easy scheduling process.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center text-spotlight-400 hover:text-spotlight-300 font-semibold group-hover:gap-2 transition-all"
              >
                <span>Learn More</span>
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </Link>
            </div>

            {/* Contact */}
            <div className="glass-card p-6 sm:p-8 hover:border-accent-500/50 transition-all group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-500/10 mb-4 group-hover:bg-accent-500/20 transition-colors">
                <Mail className="h-6 w-6 text-accent-400" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                Get in Touch
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                Have questions, feedback, or want to collaborate? 
                We&apos;d love to hear from you. Reach out and let&apos;s connect.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-accent-400 hover:text-accent-300 font-semibold group-hover:gap-2 transition-all"
              >
                <span>Contact Us</span>
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
