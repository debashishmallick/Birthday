export type MemoryItem = {
  id: string
  date: string
  title: string
  description: string
  photoIndex: number
}

export const memories: MemoryItem[] = [
  {
    id: 'm1',
    date: 'First hello as Physicaly after Long Time',
    title: 'When we actually talked',
    description:
      'I remember thinking you were easy to be around — no pressure, just warmth.',
    photoIndex: 0,
  },
  {
    id: 'm2',
    date: 'A random afternoon',
    title: 'Ordinary turned special',
    description:
      'Nothing was planned, and somehow that is the photo I still look at.',
    photoIndex: 1,
  },
  {
    id: 'm3',
    date: 'Your smile',
    title: 'The one that fixes the day',
    description:
      'You do not even know you are doing it — and that makes it better.',
    photoIndex: 2,
  },
  {
    id: 'm4',
    date: 'Us now',
    title: 'Still choosing each other',
    description:
      'Not perfect — just real. And real is what I want more of with you.',
    photoIndex: 3,
  },
]
