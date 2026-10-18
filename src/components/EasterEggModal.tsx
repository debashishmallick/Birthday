import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from './ui/PhotoImage'

type EasterEggModalProps = {
  open: boolean
  onClose: () => void
}

export function EasterEggModal({ open, onClose }: EasterEggModalProps) {
  const { easterEgg } = siteConfig
  const photo = photos[easterEgg.photoKey]

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-midnight/90 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Secret message"
        >
          <motion.div
            className="max-w-md overflow-hidden rounded-2xl border border-glass-border bg-midnight-soft"
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <div className="relative aspect-[4/3]">
              <PhotoImage {...photo} priority />
            </div>
            <div className="relative p-6 text-left">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 top-0 flex min-h-10 min-w-10 items-center justify-center rounded-full border border-glass-border bg-midnight/60"
                aria-label="Close secret message"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-display text-2xl text-champagne">{easterEgg.title}</p>
              <p className="mt-3 font-body text-sm leading-relaxed text-ivory/85">{easterEgg.message}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
