import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { EasterEggStar } from './components/EasterEggStar'
import { CinematicIntro } from './sections/CinematicIntro'
import { LoadingScreen } from './sections/LoadingScreen'
import { LockScreen } from './sections/LockScreen'
import { StoryExperience } from './sections/StoryExperience'
import { siteConfig } from './config/siteConfig'

type Phase = 'loading' | 'lock' | 'intro' | 'story'

function App() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [musicPlaybackError, setMusicPlaybackError] = useState(false)
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)

  const unlock = useCallback(() => {
    const audio = backgroundMusicRef.current
    if (audio) {
      void audio.play().catch(() => setMusicPlaybackError(true))
    }
    window.setTimeout(() => setPhase('intro'), 900)
  }, [])

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPhase('intro')
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <>
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <LoadingScreen key="loading" onComplete={() => setPhase('lock')} />
          ) : null}
          {phase === 'lock' ? (
            <LockScreen key="lock" onUnlock={unlock} />
          ) : null}
          {phase === 'intro' ? (
            <CinematicIntro key="intro" onBegin={() => setPhase('story')} />
          ) : null}
        </AnimatePresence>

        {phase === 'story' ? (
          <StoryExperience
            onReplay={replay}
            audioRef={backgroundMusicRef}
            musicPlaybackError={musicPlaybackError}
          />
        ) : null}

        {phase !== 'loading' ? <EasterEggStar /> : null}
        <audio
          ref={backgroundMusicRef}
          src={siteConfig.audioTracks.audioFile}
          preload="auto"
          loop
          aria-hidden="true"
        />
      </>
    </MotionConfig>
  )
}

export default App
