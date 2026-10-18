import { useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type ParticlesProps = {
  count?: number
  className?: string
}

export function Particles({ count = 24, className = '' }: ParticlesProps) {
  const reduced = useReducedMotion()
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 10) * 0.4,
        duration: 3 + (i % 5),
      })),
    [count],
  )

  if (reduced) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-champagne/40 animate-pulse"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
