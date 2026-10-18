import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { galleryPhotos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { ChapterHeader } from '../components/ui/ChapterHeader'
import { useMediaQuery } from '../hooks/useMediaQuery'

export function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStart = useRef<number | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % galleryPhotos.length))
  }, [])
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + galleryPhotos.length) % galleryPhotos.length,
    )
  }, [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, next, prev])

  return (
    <section id="gallery" className="relative px-4 py-24 sm:px-6">
      <ChapterHeader chapter="02" title="Little Moments" subtitle="Tap to immerse" />
      <div className="mx-auto mt-12 max-w-6xl columns-2 gap-3 sm:columns-3 sm:gap-4">
        {galleryPhotos.map((photo, index) => (
          <motion.button
            key={photo.src}
            type="button"
            className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl text-left sm:mb-4"
            whileHover={isDesktop ? { rotate: index % 2 ? -0.6 : 0.6 } : undefined}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo ${index + 1}`}
          >
            <PhotoImage
              src={photo.src}
              alt={photo.alt}
              objectPosition={photo.objectPosition}
              className="transition duration-500 group-hover:scale-[1.02]"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-midnight/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery lightbox"
            onTouchStart={(e) => {
              touchStart.current = e.changedTouches[0]?.clientX ?? null
            }}
            onTouchEnd={(e) => {
              const start = touchStart.current
              const end = e.changedTouches[0]?.clientX
              if (start == null || end == null) return
              const delta = end - start
              if (delta > 50) prev()
              if (delta < -50) next()
            }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-body text-sm text-ivory/70">
                {openIndex + 1} / {galleryPhotos.length}
              </span>
              <button
                type="button"
                onClick={close}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-glass-border"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-8">
              <button
                type="button"
                className="absolute left-2 z-10 hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-glass-border md:flex"
                onClick={prev}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-h-[70svh] max-w-4xl overflow-hidden rounded-2xl"
              >
                <PhotoImage
                  {...galleryPhotos[openIndex]}
                  priority
                  className="max-h-[70svh] w-auto max-w-full object-contain"
                />
              </motion.div>
              <button
                type="button"
                className="absolute right-2 z-10 hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-glass-border md:flex"
                onClick={next}
                aria-label="Next photo"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
