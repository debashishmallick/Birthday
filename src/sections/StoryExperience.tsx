import type { RefObject } from 'react'
import { HeroSection } from './HeroSection'
import { MemoryTimeline } from './MemoryTimeline'
import { PolaroidSection } from './PolaroidSection'
import { AppreciationSection } from './AppreciationSection'
import { ScratchCard } from './ScratchCard'
import { GiftBox } from './GiftBox'
import { LetterSection } from './LetterSection'
import { MusicPlayerSection } from './MusicPlayerSection'
import { VoiceMessageSection } from './VoiceMessageSection'
import { BirthdayCakeSection } from './BirthdayCakeSection'
import { CountdownSection } from './CountdownSection'
import { PhotoCollage } from './PhotoCollage'
import { FinalSurprise } from './FinalSurprise'
import { ChapterHeader } from '../components/ui/ChapterHeader'

type StoryExperienceProps = {
  onReplay: () => void
  audioRef: RefObject<HTMLAudioElement | null>
  musicPlaybackError: boolean
}

export function StoryExperience({
  onReplay,
  audioRef,
  musicPlaybackError,
}: StoryExperienceProps) {
  const scrollToMemories = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative bg-midnight">
      <div className="grain-overlay pointer-events-none fixed inset-0 z-[1] opacity-30" aria-hidden />
      <HeroSection />
      <MemoryTimeline />
      {/* <PhotoGallery /> */}
      <PolaroidSection />
      <PhotoCollage />
      <AppreciationSection />
      {/* <MemoryQuiz /> */}
      <ScratchCard />
      <GiftBox />
      <LetterSection />
      <MusicPlayerSection audioRef={audioRef} initialPlaybackError={musicPlaybackError} />
      <VoiceMessageSection />
      <CountdownSection />
      <section className="px-6 py-12">
        <ChapterHeader chapter="05" title="One Last Surprise" subtitle="Wish. Blow. Smile." />
      </section>
      <BirthdayCakeSection />
      <FinalSurprise onReplay={onReplay} onViewMemories={scrollToMemories} />
    </main>
  )
}
