// Episode collections data
export interface Collection {
  id: string
  title: string
  description: string
  imageUrl: string
  episodeIds: string[] // Array of episode IDs or slugs
  color?: string
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'harry-potter-takeover',
    title: "'Harry Potter and the Cursed Child' Takeover",
    description: 'Episodes featuring the cast and creative team of Harry Potter and the Cursed Child',
    imageUrl: '/images/collections/harry-potter-and-the-cursed-child-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['401', '402', '403', '404', '405', '406', '407'],
    color: '#740001'
  },
  {
    id: 'outsiders-takeover',
    title: "'The Outsiders' Takeover",
    description: 'Episodes featuring the cast and creative team of The Outsiders',
    imageUrl: '/images/collections/the-outsiders-takeover-the-theatre-podcast-1-400x400.jpg',
    episodeIds: ['323', '324', '325', '326', '327', '328', '329', 'bonus-the-outsiders-press-junket-with-cast-and-cre'],
    color: '#1a5f7a'
  },
  {
    id: 'kite-runner-takeover',
    title: "'The Kite Runner' Takeover",
    description: 'Episodes featuring the cast and creative team of The Kite Runner',
    imageUrl: '/images/collections/the-kite-runner-takeover-the-theatre-podcast-1-400x400.jpg',
    episodeIds: ['210', '221', '222', '223', '224', '225', '226'],
    color: '#c41e3a'
  },
  {
    id: 'back-to-the-future-takeover',
    title: "'Back to the Future' Takeover",
    description: 'Episodes featuring the cast and creative team of Back to the Future',
    imageUrl: '/images/collections/back-to-the-future-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['290', '291', '292', '293', '350', '352'],
    color: '#ff6b35'
  },
  {
    id: 'juliet-takeover',
    title: "'& Juliet' Takeover",
    description: 'Episodes featuring the cast and creative team of & Juliet',
    imageUrl: '/images/collections/juliet-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['265', '266', '267', '268', '269'],
    color: '#e91e63'
  },
  {
    id: 'up-here-takeover',
    title: "'Up Here' Takeover",
    description: 'Episodes featuring the cast and creative team of Hulu\'s Up Here',
    imageUrl: '/images/collections/hulu-s-up-here-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['259', '260', '261', '262'],
    color: '#f4a261'
  },
  {
    id: 'wicked-takeover',
    title: "'Wicked' Takeover",
    description: 'Episodes featuring the cast and creative team of Wicked',
    imageUrl: '/images/collections/wicked-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['229', '230', '233', '234'],
    color: '#2d6a4f'
  },
  {
    id: 'hadestown-takeover',
    title: "'Hadestown' Takeover",
    description: 'Episodes featuring the cast and creative team of Hadestown',
    imageUrl: '/images/collections/hadestown-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['193', '194', '196', '198', '199'],
    color: '#8b4513'
  },
  {
    id: 'freestyle-love-supreme-takeover',
    title: "'Freestyle Love Supreme' Takeover",
    description: 'Episodes featuring the cast of Freestyle Love Supreme',
    imageUrl: '/images/collections/freestyle-love-supreme-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['164', '165', '166', '167'],
    color: '#4a90e2'
  },
  {
    id: 'bleeding-love-takeover',
    title: "'Bleeding Love' Takeover",
    description: 'Episodes featuring the cast and creative team of Bleeding Love',
    imageUrl: '/images/collections/bleeding-love-takeover-the-theatre-podcast-with-alan-seales-3-400x400.jpg',
    episodeIds: ['95', '96', '97', '98', '99'],
    color: '#d32f2f'
  },
  {
    id: 'six-takeover',
    title: "'SIX' Quaranqueen Takeover",
    description: 'Episodes featuring the queens of SIX the Musical',
    imageUrl: '/images/collections/six-quaranqueen-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['86', '87', '88', '89', '90', '91', '92', '93'],
    color: '#9c27b0'
  },
  {
    id: 'moulin-rouge-takeover',
    title: "'Moulin Rouge' Takeover",
    description: 'Episodes featuring the cast and creative team of Moulin Rouge',
    imageUrl: '/images/collections/moulin-rouge-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['72', '73', '74', '75', '76'],
    color: '#c41e3a'
  },
  {
    id: 'beetlejuice-takeover',
    title: "'Beetlejuice' Takeover",
    description: 'Episodes featuring the cast and creative team of Beetlejuice',
    imageUrl: '/images/collections/beetlejuice-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['51', '52', 'ep52-alex-timbers-part-2-tony-nominated-director-w', '53', '54', 'ep54-alex-brightman-part-2-beetlejuice-school-of-r'],
    color: '#4a148c'
  },
  {
    id: 'prom-takeover',
    title: "'The Prom' Takeover",
    description: 'Episodes featuring the cast and creative team of The Prom',
    imageUrl: '/images/collections/the-prom-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['31', '33', '34', '35', '36'],
    color: '#e91e63'
  },
  {
    id: 'frozen-takeover',
    title: "'Frozen' Takeover",
    description: 'Episodes featuring the cast and creative team of Frozen',
    imageUrl: '/images/collections/frozen-takeover-the-theatre-podcast-with-alan-seales-1-400x400.jpg',
    episodeIds: ['21', '22', '24', '25'],
    color: '#64b5f6'
  },
  {
    id: 'tonys-2019',
    title: 'Inside the 2019 Awards Season',
    description: 'Episodes covering the 2019 Tony Awards season',
    imageUrl: '/images/collections/inside-the-2019-awards-season-1-400x400.jpg',
    episodeIds: [
      "Cereal: Part of a Broadway-Lover",
    ],
    color: '#ffd700'
  },
]

export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find(c => c.id === id)
}

export function getAllCollections(): Collection[] {
  return COLLECTIONS
}
