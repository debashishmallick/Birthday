import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { polaroidPhotos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { useMediaQuery } from '../hooks/useMediaQuery'

export function PolaroidSection() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [stackIndex, setStackIndex] = useState(0)

  if (!isDesktop) {
    const photo = polaroidPhotos[stackIndex % polaroidPhotos.length]
    return (
      <section className="px-6 py-20">
        <h2 className="text-center font-display text-3xl text-ivory">Floating memories</h2>
        <p className="mt-2 text-center font-body text-sm text-ivory/60">Swipe the stack</p>
        <div className="mx-auto mt-10 max-w-xs">
          <motion.div
            key={photo.src}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 80) {
                setStackIndex((i) => i + 1)
              }
            }}
            className="rotate-[-2deg] rounded-sm bg-ivory p-3 pb-10 shadow-[0_20px_50px_rgb(0_0_0/0.35)]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <PhotoImage {...photo} />
            </div>
            <p className="mt-4 text-center font-display text-lg text-midnight/80">{photo.caption}</p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[520px] px-6 py-20">
      <h2 className="text-center font-display text-3xl text-ivory">Floating memories</h2>
      <p className="mt-2 text-center font-body text-sm text-ivory/60">Drag them gently</p>
      <div className="relative mx-auto mt-12 h-[420px] max-w-4xl">
        {polaroidPhotos.map((photo, i) => (
          <DraggablePolaroid key={photo.src} photo={photo} index={i} />
        ))}
      </div>
    </section>
  )
}

function DraggablePolaroid({
  photo,
  index,
}: {
  photo: (typeof polaroidPhotos)[number]
  index: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-120, 120], [-8, 8])

  const positions = [
    { left: '8%', top: '10%', rot: -6 },
    { left: '55%', top: '5%', rot: 4 },
    { left: '20%', top: '45%', rot: 3 },
    { left: '60%', top: '42%', rot: -4 },
  ]
  const pos = positions[index] ?? positions[0]

  return (
    <motion.div
      drag
      dragElastic={0.12}
      style={{ x, y, rotate, left: pos.left, top: pos.top }}
      className="absolute w-52 cursor-grab rounded-sm bg-ivory p-3 pb-10 shadow-[0_24px_60px_rgb(0_0_0/0.4)] active:cursor-grabbing"
      initial={{ rotate: pos.rot }}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <PhotoImage {...photo} />
      </div>
      <p className="mt-3 text-center font-display text-base text-midnight/75">{photo.caption}</p>
    </motion.div>
  )
}
