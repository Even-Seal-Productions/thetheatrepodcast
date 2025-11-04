import { getAllCollections } from '@/lib/collections'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'

export const metadata = {
  title: 'Collections',
  description: 'Explore curated collections of episodes from The Theatre Podcast',
}

export default function CollectionsPage() {
  const collections = getAllCollections()

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">Episode Collections</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Curated collections featuring cast and creative teams from your favorite shows
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative overflow-hidden rounded-lg transition-all hover:scale-105"
            >
              <div className="aspect-square relative">
                {/* Collection Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-spotlight-500/20 to-theatrical-800">
                  {collection.imageUrl && (
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <div className="w-16 h-16 rounded-full bg-spotlight-500 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
