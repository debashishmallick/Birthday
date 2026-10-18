import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState, type RefObject } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'
import { formatTime } from '../utils/formatTime'

type MusicPlayerSectionProps = {
  audioRef: RefObject<HTMLAudioElement | null>
  initialPlaybackError: boolean
}

export function MusicPlayerSection({
  audioRef,
  initialPlaybackError,
}: MusicPlayerSectionProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [available, setAvailable] = useState(true)
  const [playbackError, setPlaybackError] = useState(initialPlaybackError)
  const cover = photos[siteConfig.audioTracks.coverPhotoKey]
  const { audioTracks } = siteConfig

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onMeta = () => setDuration(audio.duration || 0)
    const onTime = () => setCurrent(audio.currentTime)
    const onError = () => setAvailable(false)
    const onEnded = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('error', onError)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    setDuration(audio.duration || 0)
    setCurrent(audio.currentTime)
    setPlaying(!audio.paused)
    if (audio.error) setAvailable(false)
    return () => {
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [audioRef])

  if (!available) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="font-body text-sm text-ivory/55">
          The song could not be loaded. Check the audio file and refresh the page.
        </p>
      </section>
    )
  }

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

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const t = Number(e.target.value)
    audio.currentTime = t
    setCurrent(t)
  }

  return (
    <section className="px-6 py-20">
      <h2 className="text-center font-display text-3xl text-ivory">Music</h2>
      <div className="mx-auto mt-10 flex max-w-md flex-col gap-6 rounded-2xl border border-glass-border bg-glass p-5 sm:flex-row sm:items-center">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl">
          <PhotoImage {...cover} />
        </div>
        <div className="flex-1">
          <p className="font-display text-xl text-ivory">{audioTracks.trackTitle}</p>
          <p className="font-body text-xs text-ivory/55">{audioTracks.artistName}</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-champagne text-midnight"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 pl-0.5" />}
            </button>
            <span className="font-body text-xs tabular-nums text-ivory/60">
              {formatTime(current)} / {formatTime(duration)}
            </span>
            <button
              type="button"
              onClick={() => {
                const audio = audioRef.current
                if (!audio) return
                audio.muted = !muted
                setMuted(!muted)
              }}
              className="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-full border border-glass-border"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
          <label className="mt-3 flex items-center gap-3 font-body text-xs text-ivory/60">
            <span>Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const nextVolume = Number(e.target.value)
                setVolume(nextVolume)
                if (audioRef.current) audioRef.current.volume = nextVolume
                if (nextVolume > 0 && muted) {
                  setMuted(false)
                  if (audioRef.current) audioRef.current.muted = false
                }
              }}
              className="w-full accent-champagne"
              aria-label="Volume"
            />
          </label>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            className="mt-3 w-full accent-champagne"
            aria-label="Playback progress"
          />
          {playbackError ? (
            <p className="mt-2 font-body text-xs text-rose-accent" role="status">
              The audio could not be played. Check the audio file and try again.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
