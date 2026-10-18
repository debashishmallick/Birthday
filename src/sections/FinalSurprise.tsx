import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { Particles } from '../components/ui/Particles'

type FinalSurpriseProps = {
  onReplay: () => void
  onViewMemories: () => void
}

/* ---------- Falling hearts & rose petals ---------- */
type FallItem = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  spin: number
  opacity: number
  kind: 'heart' | 'petal' | 'spark'
  hue: string
}

function HeartRoseRain({ count = 28 }: { count?: number }) {
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
        delay: -((i * 0.9) % 14),
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
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      <style>{`
        @keyframes finale-fall {
          0%   { transform: translate3d(0, -12vh, 0) rotate(0deg); }
          50%  { transform: translate3d(var(--drift), 55vh, 0) rotate(calc(var(--spin) / 2)); }
          100% { transform: translate3d(0, 112vh, 0) rotate(var(--spin)); }
        }
        @keyframes finale-sway {
          0%, 100% { transform: translateX(-6px); }
          50%      { transform: translateX(6px); }
        }
        .finale-rain { animation: finale-fall linear infinite; }
        .finale-rain > * { animation: finale-sway ease-in-out infinite alternate; }
      `}</style>

      {items.map((it) => (
        <span
          key={it.id}
          className="finale-rain absolute top-0 block"
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
                <path d="M12 2C7 4 3 8 3 13c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-11z" fill={it.hue} />
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
                <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" fill={it.hue} />
              </svg>
            )}
          </span>
        </span>
      ))}
    </div>
  )
}

export function FinalSurprise({ onReplay, onViewMemories }: FinalSurpriseProps) {
  // WhatsApp CTA — visitor-initiated, opens with a prefilled message they can edit/send.
  const waNumber = '9668563648' // country code assumed; adjust if needed (e.g. 91 for India)
  const waText = encodeURIComponent(
    `Happy Birthday ${siteConfig.girlfriendName}! 💖 I just went through the memories you shared.`,
  )
  const waHref = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <section
      id="finale"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-midnight"
    >
      <Particles count={40} />
      <HeartRoseRain count={30} />

      <div className="absolute inset-0">
        <PhotoImage {...photos.finale} priority className="absolute inset-0 min-h-full" />
        <div className="absolute inset-0 gradient-readability-bottom" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/20" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-2xl px-6 pb-16 pt-32 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-xs uppercase tracking-[0.4em] text-champagne/85">Happy Birthday</p>
        <h2 className="font-display mt-4 text-5xl text-ivory sm:text-6xl">{siteConfig.girlfriendName}</h2>
        <p className="text-balance mx-auto mt-6 font-body text-base leading-relaxed text-ivory/90">
          {siteConfig.finalMessage}
        </p>
        <p className="mt-8 font-body text-sm text-ivory/75">
          Thank you for being part of these memories.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton onClick={onReplay}>Replay Our Story</PrimaryButton>
          <PrimaryButton variant="ghost" onClick={onViewMemories}>
            View Memories Again
          </PrimaryButton>
        </div>

        <div className="mt-6">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-5 py-2 font-body text-sm text-champagne/90 transition hover:border-champagne/70 hover:text-champagne"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M20.5 3.5A11 11 0 0 0 3.1 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.7.8-2.8-.2-.3A9 9 0 1 1 12 20.5Zm5.1-6.7c-.3-.1-1.6-.8-1.9-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.6a.5.5 0 0 0 0-.5c0-.1-.7-1.7-.9-2.3s-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3c.2.2 2.2 3.4 5.4 4.7 2.7 1.1 3.3.9 3.9.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3Z" />
            </svg>
            Send a WhatsApp message
          </a>
        </div>

        <p className="mt-16 font-body text-xs text-ivory/45">{siteConfig.creditLine}</p>
      </motion.div>
    </section>
  )
}