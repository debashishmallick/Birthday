import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { Particles } from '../components/ui/Particles'

type CinematicIntroProps = {
  onBegin: () => void
}

type Step = 'line1' | 'line2' | 'reveal' | 'ready'

export function CinematicIntro({ onBegin }: CinematicIntroProps) {
  const [step, setStep] = useState<Step>('line1')

  useEffect(() => {
    const t1 = window.setTimeout(() => setStep('line2'), 2400)
    const t2 = window.setTimeout(() => setStep('reveal'), 4800)
    const t3 = window.setTimeout(() => setStep('ready'), 7200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <motion.section
      className="fixed inset-0 z-[80] flex min-h-[100svh] flex-col bg-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="relative flex-1 overflow-hidden">
        <PhotoImage {...photos.intro} priority className="absolute inset-0 scale-105" />
        <div className="absolute inset-0 gradient-readability-bottom" />
        <div className="cinematic-vignette absolute inset-0 opacity-70" />
        <Particles count={20} />
      </div>

      <div className="relative -mt-24 px-6 pb-12 pt-6 text-center sm:-mt-32">
        <AnimatePresence mode="wait">
          {step === 'line1' && (
            <motion.p
              key="l1"
              className="font-display text-2xl text-ivory sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {siteConfig.introLines[0]}
            </motion.p>
          )}
          {step === 'line2' && (
            <motion.p
              key="l2"
              className="font-display text-2xl text-ivory sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {siteConfig.introLines[1]}
            </motion.p>
          )}
          {(step === 'reveal' || step === 'ready') && (
            <motion.div
              key="rev"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-body text-xs uppercase tracking-[0.4em] text-champagne/80">
                Happy Birthday
              </p>
              <h1 className="font-display mt-3 text-5xl font-medium text-ivory sm:text-6xl">
                {siteConfig.girlfriendName}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {step === 'ready' ? (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PrimaryButton onClick={onBegin}>Begin the Story</PrimaryButton>
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  )
}
