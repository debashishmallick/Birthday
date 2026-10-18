import { motion } from 'framer-motion'
import { Delete, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'

type LockScreenProps = {
  onUnlock: () => void
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const tryUnlock = useCallback(
    (value: string) => {
      if (value.length < 4) return
      if (value === siteConfig.pinCode) {
        setCelebrate(true)
        onUnlock()
      } else {
        setShake(true)
        window.setTimeout(() => {
          setShake(false)
          setPin('')
        }, 520)
      }
    },
    [onUnlock],
  )

  const pushDigit = useCallback(
    (digit: string) => {
      if (celebrate || pin.length >= 4) return
      const nextPin = pin + digit
      setPin(nextPin)
      if (nextPin.length === 4) tryUnlock(nextPin)
    },
    [celebrate, pin, tryUnlock],
  )

  const clearPin = () => setPin('')
  const deleteOne = () => setPin((p) => p.slice(0, -1))

  const handleKey = (key: (typeof KEYS)[number]) => {
    if (key === 'del') deleteOne()
    else if (key !== '') pushDigit(key)
  }

  return (
    <motion.section
      className="fixed inset-0 z-[90] flex min-h-[100svh] flex-col bg-midnight lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative h-[42svh] shrink-0 lg:h-auto lg:min-h-[100svh] lg:w-[52%]">
        <PhotoImage
          {...photos.lockScreen}
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-midnight/20 lg:bg-gradient-to-r lg:from-transparent lg:via-midnight/10 lg:to-midnight" />
        <div className="gradient-readability-bottom absolute inset-0 lg:hidden" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 py-10 lg:px-14">
        <div className="grain-overlay absolute inset-0 opacity-40" aria-hidden />
        <p className="font-display text-2xl text-ivory sm:text-3xl">
          A little surprise is waiting for you.
        </p>
        <p className="mt-2 font-body text-sm text-ivory/65">Enter the secret code</p>

        <motion.div
          className="mt-8 flex gap-3"
          animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          role="group"
          aria-label="PIN entry progress"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full border transition-colors ${
                pin.length > i
                  ? celebrate
                    ? 'border-champagne bg-champagne shadow-[0_0_12px_rgb(232_213_196/0.6)]'
                    : 'border-rose-accent bg-rose-accent'
                  : 'border-ivory/30 bg-transparent'
              }`}
            />
          ))}
        </motion.div>

        <div className="mt-8 grid max-w-xs grid-cols-3 gap-3">
          {KEYS.map((key, idx) => {
            if (key === '') {
              return (
                <button
                  key={`empty-${idx}`}
                  type="button"
                  className="min-h-14 rounded-2xl"
                  aria-hidden
                  tabIndex={-1}
                  disabled
                />
              )
            }
            const isDel = key === 'del'
            return (
              <motion.button
                key={key}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => handleKey(key)}
                className="flex min-h-14 items-center justify-center rounded-2xl border border-glass-border bg-glass font-body text-lg text-ivory transition hover:border-champagne/35"
                aria-label={isDel ? 'Delete digit' : `Digit ${key}`}
              >
                {isDel ? <Delete className="h-5 w-5" strokeWidth={1.5} /> : key}
              </motion.button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={clearPin}
          className="mt-4 flex max-w-xs items-center justify-center gap-2 rounded-full py-2 font-body text-xs uppercase tracking-widest text-ivory/50 hover:text-champagne"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </button>

        {celebrate ? (
          <motion.p
            className="mt-6 font-display text-xl text-champagne"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome in ✦
          </motion.p>
        ) : null}
      </div>
    </motion.section>
  )
}
