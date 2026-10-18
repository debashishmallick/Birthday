import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { memories } from '../data/memories'
import { timelinePhotos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { ChapterHeader } from '../components/ui/ChapterHeader'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function MemoryTimeline() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    const items = rootRef.current.querySelectorAll('[data-memory-item]')
    const ctx = gsap.context(() => {
      items.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={rootRef} id="timeline" className="relative px-6 py-24">
      <ChapterHeader chapter="01" title="The Beginning" subtitle="Moments that stayed" />
      <ol className="relative mx-auto mt-16 max-w-5xl">
        <div
          className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-champagne/40 via-rose-accent/30 to-transparent md:left-1/2 md:block"
          aria-hidden
        />
        {memories.map((memory, index) => {
          const photo = timelinePhotos[memory.photoIndex] ?? timelinePhotos[0]
          const isLeft = index % 2 === 0
          return (
            <li
              key={memory.id}
              data-memory-item
              className={`relative mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-center ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="md:w-1/2 md:px-8">
                <div className="overflow-hidden rounded-2xl shadow-[0_24px_80px_rgb(0_0_0/0.45)]">
                  <div className="aspect-[4/5] sm:aspect-[5/6]">
                    <PhotoImage src={photo.src} alt={photo.alt} objectPosition={photo.objectPosition} />
                  </div>
                </div>
              </div>
              <div className={`md:w-1/2 md:px-8 ${isLeft ? 'md:text-right' : ''}`}>
                <p className="font-body text-xs uppercase tracking-[0.3em] text-champagne/75">
                  Memory {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-body text-sm text-rose-accent/90">{memory.date}</p>
                <h3 className="font-display mt-3 text-3xl text-ivory">{memory.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ivory/75">
                  {memory.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
