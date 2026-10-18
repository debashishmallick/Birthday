import { motion } from 'framer-motion'
import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'

/* ---------- Premium White Rose (realistic, layered petals) ---------- */
function WhiteRoseBloom({
  onBloomComplete,
  className,
}: {
  onBloomComplete?: () => void
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 40, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onBloomComplete}
      aria-hidden
    >
      <svg
        viewBox="0 0 220 280"
        className="h-full w-full overflow-visible"
        style={{ filter: 'drop-shadow(0 20px 30px rgba(25, 6, 16, 0.45))' }}
      >
        <defs>
          {/* Petal gradients — warm ivory with pearl highlights and blush shadows */}
          <radialGradient id="wr-p1" cx="30%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fefbf9" />
            <stop offset="68%" stopColor="#f6e9e2" />
            <stop offset="90%" stopColor="#e8d2c7" />
            <stop offset="100%" stopColor="#d9b9ab" />
          </radialGradient>
          <radialGradient id="wr-p2" cx="65%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fcf5f0" />
            <stop offset="72%" stopColor="#f0ddd4" />
            <stop offset="92%" stopColor="#e0c5b9" />
            <stop offset="100%" stopColor="#cfa99b" />
          </radialGradient>
          <radialGradient id="wr-p3" cx="45%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#fffefc" />
            <stop offset="50%" stopColor="#f8ece5" />
            <stop offset="82%" stopColor="#ebd4ca" />
            <stop offset="100%" stopColor="#d8bcae" />
          </radialGradient>
          <radialGradient id="wr-core" cx="50%" cy="48%" r="65%">
            <stop offset="0%" stopColor="#fffaf4" />
            <stop offset="45%" stopColor="#f6e1d5" />
            <stop offset="80%" stopColor="#e5c4b5" />
            <stop offset="100%" stopColor="#c99e8e" />
          </radialGradient>
          <radialGradient id="wr-shadow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#b98a7c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#b98a7c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wr-leaf" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#9fd0a8" />
            <stop offset="45%" stopColor="#5ea475" />
            <stop offset="100%" stopColor="#2c6642" />
          </linearGradient>
          <linearGradient id="wr-stem" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3a7550" />
            <stop offset="50%" stopColor="#5c9c6e" />
            <stop offset="100%" stopColor="#2f5f43" />
          </linearGradient>
          <filter id="wr-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <filter id="wr-blur-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        {/* ---- Stem & leaves ---- */}
        <motion.g
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <path
            d="M110 168 C108 196 106 224 112 268"
            fill="none"
            stroke="url(#wr-stem)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M109 194 C86 176 62 180 60 196 C76 212 96 208 109 198 Z"
            fill="url(#wr-leaf)"
          />
          <path d="M109 196 L78 194 M96 204 L74 198" fill="none" stroke="#c7ebc9" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
          <path
            d="M111 222 C134 202 160 206 162 222 C146 240 124 236 111 224 Z"
            fill="url(#wr-leaf)"
          />
          <path d="M111 224 L142 220 M124 230 L148 224" fill="none" stroke="#c7ebc9" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
          <path d="M88 168 C95 156 105 160 110 170 C115 160 125 156 132 168 C122 176 98 176 88 168 Z" fill="#4d8a5f" />
          <path d="M110 170 L104 156 M110 170 L116 156" fill="none" stroke="#3d724d" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </motion.g>

        {/* ---- Rose head ---- */}
        <motion.g
          initial={{ scale: 0.15, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.95, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <ellipse cx="110" cy="120" rx="52" ry="46" fill="url(#wr-shadow)" />

          {/* OUTER PETALS */}
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.65, ease: 'easeOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <path d="M110 58 C78 52 56 74 60 100 C48 112 56 138 82 140 C92 152 110 148 110 132 Z" fill="url(#wr-p1)" />
            <path d="M110 58 C142 52 164 74 160 100 C172 112 164 138 138 140 C128 152 110 148 110 132 Z" fill="url(#wr-p2)" />
            <path d="M82 140 C56 138 48 112 60 100 C52 88 62 68 84 68 C96 60 110 66 110 82 C110 100 96 138 82 140 Z" fill="url(#wr-p3)" />
            <path d="M138 140 C164 138 172 112 160 100 C168 88 158 68 136 68 C124 60 110 66 110 82 C110 100 124 138 138 140 Z" fill="url(#wr-p1)" />
            <path d="M110 148 C84 148 70 132 78 116 C82 106 96 108 110 120 C124 108 138 106 142 116 C150 132 136 148 110 148 Z" fill="url(#wr-p2)" />
            <path d="M84 78 C76 96 82 118 96 130" fill="none" stroke="#d8bcae" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            <path d="M136 78 C144 96 138 118 124 130" fill="none" stroke="#d8bcae" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            <path d="M74 116 C88 130 132 130 146 116" fill="none" stroke="#d8bcae" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
          </motion.g>

          {/* MID PETALS */}
          <motion.g
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <path d="M110 74 C88 70 74 86 80 104 C74 116 86 130 102 124 C100 136 112 138 110 124 Z" fill="url(#wr-p3)" />
            <path d="M110 74 C132 70 146 86 140 104 C146 116 134 130 118 124 C120 136 108 138 110 124 Z" fill="url(#wr-p1)" />
            <path d="M110 84 C94 82 86 96 92 108 C88 118 98 126 108 120 C112 128 122 124 120 114 C128 108 124 92 110 84 Z" fill="url(#wr-p2)" />
            <path d="M92 92 C88 104 94 116 104 120" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
            <path d="M128 92 C132 104 126 116 116 120" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
            <path d="M96 88 C100 100 120 100 124 88" fill="none" stroke="#d3ae9f" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" filter="url(#wr-blur-sm)" />
          </motion.g>

          {/* INNER BUD */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <path d="M110 88 C98 88 92 100 96 110 C92 118 100 126 110 122 C120 126 128 118 124 110 C128 100 122 88 110 88 Z" fill="url(#wr-core)" />
            <path d="M110 94 C102 94 98 102 102 108 C100 114 106 118 110 114 C114 118 120 114 118 108 C122 102 118 94 110 94 Z" fill="url(#wr-p1)" />
            <path d="M106 100 C104 106 108 112 112 110" fill="none" stroke="#c9a294" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
            <path d="M110 102 C106 102 105 106 108 107 C106 110 110 112 112 110" fill="none" stroke="#b98a7c" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
            <ellipse cx="106" cy="100" rx="3.5" ry="2.2" fill="#ffffff" opacity="0.95" transform="rotate(-20 106 100)" />
          </motion.g>

          <path d="M86 70 C94 64 104 62 110 64" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
          <path d="M134 70 C126 64 116 62 110 64" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
          <path d="M78 104 C74 110 76 118 82 122" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M142 104 C146 110 144 118 138 122" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </motion.g>
      </svg>
    </motion.div>
  )
}

/* ---------- Confetti ---------- */
function ConfettiBurst() {
  const pieces = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-2 w-1 rounded-sm bg-champagne"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: ((i * 47) % 280) - 140,
            y: ((i * 31) % 280) - 140,
            opacity: 0,
            rotate: (i * 53) % 360,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/* ---------- Gift Box ---------- */
export function GiftBox() {
  const [open, setOpen] = useState(false)
  const [blooming, setBlooming] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-24 text-center">
      <p className="font-body text-xs uppercase tracking-[0.35em] text-champagne/80">One more thing…</p>
      {!open ? (
        <motion.button
          type="button"
          className="relative mx-auto mt-10 block disabled:cursor-default"
          onClick={() => {
            if (prefersReducedMotion) {
              setOpen(true)
              return
            }
            setBlooming(true)
          }}
          disabled={blooming}
          whileTap={{ scale: 0.96 }}
          aria-label={blooming ? 'A white rose is blooming' : 'Open gift box'}
        >
          {/* Box stage — clip everything to the box footprint so the rose never spills out */}
          <div className="relative mx-auto h-52 w-40 overflow-hidden">
            {/* Rose sits BEHIND the box and is revealed only through the lid opening.
                We anchor it low so its head peeks just above the box base. */}
            {blooming && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
                <WhiteRoseBloom
                  className="h-44 w-32 translate-y-6"
                  onBloomComplete={() => setOpen(true)}
                />
              </div>
            )}

            {/* Gift box sits in front of the rose */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-40">
              {/* Box base */}
              <div className="absolute bottom-0 h-28 w-full rounded-lg bg-burgundy shadow-[0_20px_60px_rgb(92_36_56/0.5)]" />
              {/* Lid — lifts and tilts back to reveal the rose tucked inside */}
              <motion.div
                className="absolute left-0 top-8 h-16 w-full origin-bottom rounded-t-lg bg-burgundy-glow"
                animate={{ rotateX: blooming ? -125 : 0, y: blooming ? -6 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ transformPerspective: 500 }}
              />
              {/* Ribbon */}
              <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-champagne/80" />
              <div className="absolute left-0 top-1/2 h-4 w-full -translate-y-1/2 bg-champagne/80" />
              {/* Bow */}
              <div className="absolute -top-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-champagne shadow-lg" />
            </div>
          </div>
          <span className="mt-6 block font-display text-xl text-ivory">
            {blooming ? 'A white rose for you' : 'Tap the gift'}
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto mt-10 max-w-md"
        >
          <ConfettiBurst />
          <div className="overflow-hidden rounded-2xl border border-glass-border">
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#3a2440] via-[#5a3d5c] to-[#241a2e]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(255_245_235/0.22),transparent_60%)]" />
              <WhiteRoseBloom className="absolute left-1/2 top-1/2 h-72 w-48 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="bg-glass px-6 py-6 text-left">
              <p className="font-display text-2xl text-champagne">{siteConfig.giftReveal.title}</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ivory/85">
                {siteConfig.giftReveal.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}