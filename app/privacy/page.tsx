import { Metadata } from 'next'
import { Cookie, Shield, Eye, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and Cookie Usage for The Theatre Podcast',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title mb-8">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-8">
            {/* Introduction */}
            <section className="glass-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="h-6 w-6 text-spotlight-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Your Privacy Matters</h2>
                  <p className="text-gray-300 mb-4">
                    The Theatre Podcast with Alan Seales ("we", "us", or "our") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="glass-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Eye className="h-6 w-6 text-spotlight-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Information We Collect</h2>

                  <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-300 mb-4">
                    When you visit our website, we automatically collect certain information about your device, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address (anonymized for analytics)</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-2">Information You Provide</h3>
                  <p className="text-gray-300 mb-4">
                    We collect information that you voluntarily provide when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Subscribe to the newsletter</li>
                    <li>Contact us through our contact form</li>
                    <li>Submit booking inquiries</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Usage */}
            <section className="glass-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Cookie className="h-6 w-6 text-spotlight-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Cookie Usage</h2>
                  <p className="text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to enhance your browsing experience.
                    You can manage your cookie preferences at any time.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-theatrical-800/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Necessary Cookies</h3>
                      <p className="text-gray-300 text-sm">
                        Essential for the website to function properly. These cookies cannot be disabled.
                      </p>
                    </div>

                    <div className="bg-theatrical-800/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Enable enhanced functionality such as:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                        <li>Remembering your playback positions for each episode</li>
                        <li>Saving your volume and playback speed preferences</li>
                        <li>Storing your cookie consent preferences</li>
                      </ul>
                    </div>

                    <div className="bg-theatrical-800/50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                      <p className="text-gray-300 text-sm">
                        Help us understand how visitors interact with our website by collecting and
                        reporting information anonymously. This helps us improve our content and user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="glass-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <Lock className="h-6 w-6 text-spotlight-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Data Security</h2>
                  <p className="text-gray-300 mb-4">
                    We implement appropriate technical and organizational security measures to protect your
                    personal information. However, no method of transmission over the Internet is 100% secure.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Your Rights</h2>

              <h3 className="text-xl font-semibold text-white mb-2">GDPR Rights (EU Residents)</h3>
              <p className="text-gray-300 mb-4">
                If you are a resident of the European Economic Area, you have certain data protection rights:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2">CCPA Rights (California Residents)</h3>
              <p className="text-gray-300 mb-4">
                If you are a California resident, you have rights under the California Consumer Privacy Act:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information</li>
                <li>Right to access your personal information</li>
                <li>Right to equal service and price, even if you exercise your privacy rights</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-300 mb-4">
                Our website may contain links to third-party websites and services, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Podcast hosting platforms (Megaphone)</li>
                <li>Social media platforms (Twitter, Instagram, Facebook)</li>
                <li>Podcast directories (Apple Podcasts, Spotify, etc.)</li>
              </ul>
              <p className="text-gray-300">
                We are not responsible for the privacy practices of these third-party services.
                Please review their privacy policies separately.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-300">
                Our website is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            {/* Contact */}
            <section className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="text-gray-300">
                <p className="mb-2">Email: <a href="mailto:booking@thetheatrepodcast.com" className="text-spotlight-400 hover:text-spotlight-300">booking@thetheatrepodcast.com</a></p>
                <p>Or visit our <a href="/contact" className="text-spotlight-400 hover:text-spotlight-300">Contact Page</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
