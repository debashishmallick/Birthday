import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { appreciationItems } from '../data/appreciation'
import { ChapterHeader } from '../components/ui/ChapterHeader'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function AppreciationSection() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    const cards = rootRef.current.querySelectorAll('[data-appreciation]')
    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={rootRef} className="px-6 py-24">
      <ChapterHeader
        chapter="03"
        title="Things I Appreciate About You"
        subtitle="One line at a time"
      />
      <ul className="mx-auto mt-14 flex max-w-xl flex-col gap-5">
        {appreciationItems.map((item) => (
          <li
            key={item.id}
            data-appreciation
            className="rounded-2xl border border-glass-border bg-glass px-6 py-5"
          >
            <h3 className="font-display text-2xl text-champagne">{item.title}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-ivory/80">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
