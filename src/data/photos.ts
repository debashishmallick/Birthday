/**
 * Central photo map — replace files in /public/images/ (same filenames).
 * objectPosition hints keep faces visible; adjust per photo after you swap assets.
 */

export type PhotoKey =
  | 'lockScreen'
  | 'hero'
  | 'intro'
  | 'letter'
  | 'finale'
  | 'music'
  | 'gift'
  | 'scratch'
  | 'easterEgg'
  | 'voice'

export type PhotoMeta = {
  src: string
  alt: string
  objectPosition?: string
}

const base = (name: string) => `/images/${name}.jpeg`

export const photos: Record<PhotoKey, PhotoMeta> = {
  lockScreen: {
    src: base('lockScreen'),
    alt: 'Jyoshna — lock screen portrait',
    objectPosition: '50% 20%',
  },
  hero: {
    src: base('hero'),
    alt: 'Jyoshna — hero portrait',
    objectPosition: '50% 25%',
  },
  intro: {
    src: base('intro'),
    alt: 'Jyoshna — cinematic intro',
    objectPosition: '50% 30%',
  },
  letter: {
    src: base('letter'),
    alt: 'Jyoshna — letter companion photo',
    objectPosition: '50% 35%',
  },
  finale: {
    src: base('finale'),
    alt: 'Jyoshna — final surprise portrait',
    objectPosition: '50% 28%',
  },
  music: {
    src: base('music'),
    alt: 'Album cover memory',
    objectPosition: '50% 40%',
  },
  gift: {
    src: base('gift'),
    alt: 'Gift surprise memory',
    objectPosition: '50% 35%',
  },
  scratch: {
    src: base('scratch'),
    alt: 'Hidden scratch memory',
    objectPosition: '50% 30%',
  },
  easterEgg: {
    src: base('easter-egg'),
    alt: 'Secret memory',
    objectPosition: '50% 32%',
  },
  voice: {
    src: base('voice'),
    alt: 'Voice message memory',
    objectPosition: '50% 30%',
  },
}

export const timelinePhotos = [
  { src: base('timeline-01'), alt: 'Memory one', objectPosition: '50% 25%' },
  { src: base('timeline-02'), alt: 'Memory two', objectPosition: '50% 30%' },
  { src: base('timeline-03'), alt: 'Memory three', objectPosition: '50% 28%' },
  { src: base('timeline-04'), alt: 'Memory four', objectPosition: '50% 32%' },
] as const

export const galleryPhotos = [
  { src: base('gallery-01'), alt: 'Gallery 1', objectPosition: '50% 30%' },
  { src: base('gallery-02'), alt: 'Gallery 2', objectPosition: '50% 25%' },
  { src: base('gallery-03'), alt: 'Gallery 3', objectPosition: '50% 35%' },
  { src: base('gallery-04'), alt: 'Gallery 4', objectPosition: '50% 28%' },
  { src: base('gallery-05'), alt: 'Gallery 5', objectPosition: '50% 32%' },
  { src: base('gallery-06'), alt: 'Gallery 6', objectPosition: '50% 30%' },
  { src: base('gallery-07'), alt: 'Gallery 7', objectPosition: '50% 26%' },
  { src: base('gallery-08'), alt: 'Gallery 8', objectPosition: '50% 34%' },
] as const

export const polaroidPhotos = [
  { src: base('polaroid-01'), alt: 'Polaroid 1', caption: 'That laugh', objectPosition: '50% 30%' },
  { src: base('polaroid-02'), alt: 'Polaroid 2', caption: 'After Random Fight', objectPosition: '50% 28%' },
  // { src: base('polaroid-03'), alt: 'Polaroid 3', caption: 'Coffee & chaos', objectPosition: '50% 32%' },
  { src: base('polaroid-04'), alt: 'Polaroid 4', caption: 'Us, simply', objectPosition: '50% 30%' },
] as const

export const collagePhotos = [
  { src: base('collage-01'), alt: 'Collage 1', objectPosition: '50% 30%' },
  { src: base('collage-02'), alt: 'Collage 2', objectPosition: '50% 28%' },
  { src: base('collage-03'), alt: 'Collage 3', objectPosition: '50% 32%' },
  { src: base('collage-04'), alt: 'Collage 4', objectPosition: '50% 30%' },
  { src: base('collage-05'), alt: 'Collage 5', objectPosition: '50% 26%' },
  { src: base('collage-06'), alt: 'Collage 6', objectPosition: '50% 34%' },
] as const

export const quizPhotos = [
  { src: base('quiz-01'), alt: 'Quiz memory 1', objectPosition: '50% 30%' },
  { src: base('quiz-02'), alt: 'Quiz memory 2', objectPosition: '50% 28%' },
  { src: base('quiz-03'), alt: 'Quiz memory 3', objectPosition: '50% 32%' },
] as const

/** URLs to preload during loading screen */
export const preloadPhotoUrls = [
  photos.lockScreen.src,
  photos.hero.src,
  photos.intro.src,
  photos.finale.src,
]
