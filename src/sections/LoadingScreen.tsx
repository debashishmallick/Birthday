import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { preloadPhotoUrls } from '../data/photos'
import { preloadImages } from '../utils/preloadImages'
import { Particles } from '../components/ui/Particles'

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const initials = siteConfig.girlfriendName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  useEffect(() => {
    let mounted = true
    let frame = 0
    const start = performance.now()
    const minDuration = 1400

    const tick = (now: number) => {
      if (!mounted) return
      const elapsed = now - start
      const eased = Math.min(92, (elapsed / minDuration) * 92)
      setProgress(eased)
      if (elapsed < minDuration) {
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)

    preloadImages(preloadPhotoUrls).then(() => {
      if (!mounted) return
      setProgress(100)
      window.setTimeout(onComplete, 450)
    })

    return () => {
      mounted = false
      cancelAnimationFrame(frame)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Particles count={18} />
      <div className="grain-overlay absolute inset-0 opacity-60" aria-hidden />
      <motion.div
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-champagne/30 font-display text-xl text-champagne"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        aria-hidden
      >
        {initials}
      </motion.div>
      <p className="relative mt-8 font-body text-xs uppercase tracking-[0.35em] text-ivory/60">
        Preparing your surprise
      </p>
      <div className="relative mt-8 w-48">
        <div className="h-px w-full bg-ivory/10" />
        <motion.div
          className="absolute left-0 top-0 h-px bg-champagne"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="relative mt-3 font-body text-sm tabular-nums text-champagne/80">
        {Math.round(progress)}%
      </p>
    </motion.div>
  )
}
