import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollectionById, getAllCollections } from '@/lib/collections'
import { CollectionDetailClient } from './CollectionDetailClient'

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  const collections = getAllCollections()
  return collections.map((collection) => ({
    id: collection.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getCollectionById(params.id)

  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: collection.title,
    description: collection.description,
  }
}

export default function CollectionPage({ params }: Props) {
  const collection = getCollectionById(params.id)
  const allCollections = getAllCollections()

  if (!collection) {
    notFound()
  }

  // Find current index and calculate next/previous
  const currentIndex = allCollections.findIndex(c => c.id === params.id)
  const prevCollection = currentIndex > 0 ? allCollections[currentIndex - 1] : allCollections[allCollections.length - 1]
  const nextCollection = currentIndex < allCollections.length - 1 ? allCollections[currentIndex + 1] : allCollections[0]

  return (
    <CollectionDetailClient
      collection={collection}
      prevCollection={prevCollection}
      nextCollection={nextCollection}
    />
  )
}
