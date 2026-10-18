import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { photos } from '../data/photos'
import { PhotoImage } from '../components/ui/PhotoImage'

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scratching = useRef(false)
  const [revealed, setRevealed] = useState(false)

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const rect = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.fillStyle = '#3d2430'
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = 'rgba(232, 213, 196, 0.15)'
    ctx.font = '600 14px Outfit, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2)
  }, [])

  useEffect(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
    return () => window.removeEventListener('resize', initCanvas)
  }, [initCanvas])

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fill()
    checkReveal(canvas)
  }

  const checkReveal = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas
    const data = ctx.getImageData(0, 0, width, height).data
    let cleared = 0
    const step = 16
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] === 0) cleared++
    }
    const ratio = cleared / (data.length / (4 * step))
    if (ratio > 0.42) setRevealed(true)
  }

  return (
    <section className="px-6 py-20">
      <h2 className="text-center font-display text-3xl text-ivory">Scratch to reveal a little surprise</h2>
      <div
        ref={containerRef}
        className="relative mx-auto mt-10 min-h-[38rem] max-w-md overflow-hidden rounded-2xl shadow-[0_24px_80px_rgb(0_0_0/0.4)] sm:aspect-[4/5] sm:min-h-0"
      >
        <div className="absolute inset-0 flex flex-col bg-midnight-soft">
          <div className="relative h-2/5 shrink-0 sm:h-1/2">
            <PhotoImage {...photos.scratch} />
          </div>
          <div className="flex flex-1 flex-col justify-center px-5 py-6 text-center sm:px-6">
            <p className="font-display text-xl text-champagne">{siteConfig.scratchReveal.title}</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ivory/80">
              {siteConfig.scratchReveal.message}
            </p>
          </div>
        </div>
        {!revealed ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none"
            aria-label="Scratch surface"
            onPointerDown={(e) => {
              scratching.current = true
              scratch(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (!scratching.current) return
              scratch(e.clientX, e.clientY)
            }}
            onPointerUp={() => {
              scratching.current = false
            }}
            onPointerLeave={() => {
              scratching.current = false
            }}
          />
        ) : null}
      </div>
    </section>
  )
}
