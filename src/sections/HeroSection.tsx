import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useMemo } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { ScrollCue } from '../components/ui/ScrollCue'
import { Particles } from '../components/ui/Particles'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/* ---------- Falling hearts & rose petals ---------- */
type FallItem = {
  id: number
  left: number      // vw %
  size: number      // px
  delay: number     // s
  duration: number  // s
  drift: number     // px sideways
  spin: number      // deg
  opacity: number
  kind: 'heart' | 'petal' | 'spark'
  hue: string
}

function HeartRoseRain({ count = 26 }: { count?: number }) {
  const items = useMemo<FallItem[]>(() => {
    const palette = {
      heart: ['#ff6f91', '#ff8fab', '#e84a75', '#ff5d8f'],
      petal: ['#ffd6e0', '#ffc2d1', '#ffb3c6', '#f8d5dd'],
      spark: ['#ffe7a8', '#fff3c4', '#f9d976'],
    }
    return Array.from({ length: count }, (_, i) => {
      const kind: FallItem['kind'] =
        i % 5 === 0 ? 'spark' : i % 2 === 0 ? 'heart' : 'petal'
      const colors = palette[kind]
      return {
        id: i,
        left: (i * 37 + 11) % 100,
        size: kind === 'spark' ? 6 + ((i * 7) % 6) : 12 + ((i * 13) % 18),
        delay: -(i * 0.9) % 14,
        duration: 9 + ((i * 3) % 8),
        drift: ((i * 29) % 80) - 40,
        spin: ((i * 53) % 360) - 180,
        opacity: 0.5 + ((i * 17) % 45) / 100,
        kind,
        hue: colors[i % colors.length],
      }
    })
  }, [count])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      <style>{`
        @keyframes fall {
          0%   { transform: translate3d(0, -12vh, 0) rotate(0deg); }
          50%  { transform: translate3d(var(--drift), 55vh, 0) rotate(calc(var(--spin) / 2)); }
          100% { transform: translate3d(0, 112vh, 0) rotate(var(--spin)); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(-6px); }
          50%      { transform: translateX(6px); }
        }
        .rain-item { animation: fall linear infinite; }
        .rain-item > * { animation: sway ease-in-out infinite alternate; }
      `}</style>

      {items.map((it) => (
        <span
          key={it.id}
          className="rain-item absolute top-0 block"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            ['--drift' as string]: `${it.drift}px`,
            ['--spin' as string]: `${it.spin}deg`,
          }}
        >
          <span
            className="block h-full w-full"
            style={{ animationDuration: `${2.4 + (it.id % 5) * 0.4}s` }}
          >
            {it.kind === 'heart' && (
              <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
                <path
                  d="M12 21s-7.5-4.8-9.5-9.2C.9 8.4 2.4 5 5.8 4.4 8 4 10 5 12 7c2-2 4-3 6.2-2.6 3.4.6 4.9 4 3.3 7.4C19.5 16.2 12 21 12 21z"
                  fill={it.hue}
                />
                <ellipse cx="8" cy="9" rx="1.6" ry="1" fill="#fff" opacity="0.55" />
              </svg>
            )}

            {it.kind === 'petal' && (
              <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
                <path
                  d="M12 2C7 4 3 8 3 13c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-11z"
                  fill={it.hue}
                />
                <path
                  d="M12 4C9 6 6 9 6 13c0 3 2.5 6 6 6"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {it.kind === 'spark' && (
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <path
                  d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"
                  fill={it.hue}
                />
              </svg>
            )}
          </span>
        </span>
      ))}
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <PhotoImage {...photos.hero} priority className="absolute inset-0 min-h-[110%]" />
      </div>
      <div className="absolute inset-0 gradient-readability-bottom" />
      <div className="cinematic-vignette absolute inset-0 opacity-50" />

      {/* Base ambient particles */}
      <Particles count={16} />

      {/* Heart + rose petal rain (top → bottom) */}
      {!reduced && <HeartRoseRain count={28} />}

      <div
        ref={titleRef}
        className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-28 pt-24 text-center sm:pb-32"
      >
        <p className="font-body text-xs uppercase tracking-[0.35em] text-champagne/90">
          Happy Birthday
        </p>
        <h1 className="font-display mt-4 text-5xl font-medium leading-none text-ivory sm:text-7xl">
          {siteConfig.girlfriendName}
        </h1>
        <p className="text-balance mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-ivory/85">
          {siteConfig.heroMessage}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollCue />
      </div>
    </section>
  )
}