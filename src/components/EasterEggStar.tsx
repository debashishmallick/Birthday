import { Star } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { EasterEggModal } from './EasterEggModal'

export function EasterEggStar() {
  const taps = useRef(0)
  const resetTimer = useRef<number | null>(null)
  const [open, setOpen] = useState(false)

  const onTap = useCallback(() => {
    taps.current += 1
    if (resetTimer.current) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => {
      taps.current = 0
    }, 2000)
    if (taps.current >= siteConfig.easterEgg.tapsRequired) {
      taps.current = 0
      setOpen(true)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={onTap}
        className="fixed bottom-5 right-5 z-[60] flex h-8 w-8 items-center justify-center rounded-full text-champagne/25 transition hover:text-champagne/60"
        aria-label="Hidden star"
      >
        <Star className="h-3 w-3" strokeWidth={1.25} />
      </button>
      <EasterEggModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
