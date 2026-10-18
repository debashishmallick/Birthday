import { motion } from 'framer-motion'
import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'

type CakeFallback2DProps = {
  onComplete?: () => void
}

export function CakeFallback2D({ onComplete }: CakeFallback2DProps) {
  const [lit, setLit] = useState([true, true, true])
  const [done, setDone] = useState(false)

  const blow = () => {
    const idx = lit.findIndex(Boolean)
    if (idx === -1) return
    const next = [...lit]
    next[idx] = false
    setLit(next)
    if (next.every((candle) => !candle)) {
      window.setTimeout(() => {
        setDone(true)
        onComplete?.()
      }, 400)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-56">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute bottom-24 flex flex-col items-center"
            style={{ left: `${30 + i * 28}%` }}
          >
            {lit[i] ? (
              <motion.span
                className="mb-1 h-4 w-2 rounded-full bg-gradient-to-t from-amber-600 to-amber-200"
                animate={{ scaleY: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
              />
            ) : (
              <motion.span
                className="mb-1 h-3 w-3 rounded-full bg-ivory/35"
                initial={{ opacity: 0.7, y: 0, scale: 0.7 }}
                animate={{ opacity: 0, y: -16, scale: 1.4 }}
                transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.3 }}
              />
            )}
            <span className="h-8 w-1 bg-champagne/60" />
          </div>
        ))}
        <div className="absolute bottom-8 h-20 w-full rounded-lg bg-[#5c3d45]" />
        <div className="absolute bottom-16 h-16 w-[92%] left-[4%] rounded-lg bg-[#7a4f5a]" />
        <div className="absolute bottom-24 h-14 w-[84%] left-[8%] rounded-lg bg-[#9a6570]" />
      </div>
      {!done ? (
        <button
          type="button"
          onClick={blow}
          className="mt-8 min-h-12 rounded-full border border-champagne/40 px-8 font-body text-sm text-champagne"
        >
          Make a wish — tap to blow out the candles
        </button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
          <p className="font-display text-3xl text-champagne">Happy Birthday to You my Dear </p>
          <p className="mt-2 font-display text-2xl text-ivory">{siteConfig.girlfriendName}</p>
        </motion.div>
      )}
    </div>
  )
}
