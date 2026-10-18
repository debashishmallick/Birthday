import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { formatTime } from '../utils/formatTime'

export function VoiceMessageSection() {
  const { voiceMessage } = siteConfig
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState<boolean>(voiceMessage.enabled)
  const [playing, setPlaying] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const photo = photos[voiceMessage.photoKey]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !voiceMessage.enabled) return
    const onErr = () => setVisible(false)
    const onEnded = () => setPlaying(false)
    const onMeta = () => setDuration(audio.duration || 0)
    const onTime = () => {
      setProgress(audio.currentTime)
    }
    audio.addEventListener('error', onErr)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    return () => {
      audio.removeEventListener('error', onErr)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [voiceMessage.enabled])

  if (!visible) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
        setPlaybackError(false)
      } catch {
        setPlaybackError(true)
      }
    }
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <section className="px-6 py-20">
      <h2 className="text-center font-display text-3xl text-ivory">{voiceMessage.title}</h2>
      <div className="mx-auto mt-10 grid max-w-lg gap-6">
        <div className="overflow-hidden rounded-2xl">
          <div className="aspect-[16/10]">
            <PhotoImage {...photo} />
          </div>
        </div>
        <div className="rounded-2xl border border-glass-border bg-glass p-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              className="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-champagne text-midnight"
              aria-label={playing ? 'Pause voice message' : 'Play voice message'}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 pl-0.5" />}
            </button>
            <div className="flex-1">
              <div className="flex h-10 items-end gap-1" aria-hidden>
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-champagne/70 transition-all"
                    style={{
                      height: `${20 + Math.sin(i * 0.5 + progress) * 12 + (playing ? 8 : 0)}%`,
                      opacity: i / 32 <= pct / 100 ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
              {playbackError ? (
                <p className="mt-3 font-body text-xs text-rose-accent" role="status">
                  The voice message could not be played. Check the audio file and try again.
                </p>
              ) : null}
              <p className="mt-2 font-body text-xs tabular-nums text-ivory/60">
                {formatTime(progress)} / {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={voiceMessage.audioFile} preload="metadata" />
    </section>
  )
}
