import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { collagePhotos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function PhotoCollage() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    const items = rootRef.current.querySelectorAll('[data-collage-item]')
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        scale: 0.88,
        rotation: (i) => (i % 2 ? 6 : -6),
        x: (i) => (i % 2 ? -40 : 40),
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  const layout = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
    'col-span-1 row-span-1',
  ]

  return (
    <section ref={rootRef} className="overflow-hidden px-4 py-24 sm:px-6">
      <h2 className="text-center font-display text-3xl text-ivory">You'r Sweet Shadow</h2>
      <p className="mt-2 text-center font-body text-sm text-ivory/60">Keep scrolling — it comes together</p>
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 auto-rows-[100px] gap-2 sm:auto-rows-[120px] sm:gap-3">
        {collagePhotos.map((photo, i) => (
          <div
            key={photo.src}
            data-collage-item
            className={`overflow-hidden rounded-xl shadow-lg ${layout[i] ?? ''}`}
          >
            <PhotoImage {...photo} />
          </div>
        ))}
      </div>
    </section>
  )
}
