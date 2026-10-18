import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../config/siteConfig'
import { getBirthdayCountdown, type CountdownParts } from '../utils/birthdayCountdown'
import { ChapterHeader } from '../components/ui/ChapterHeader'

function Unit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-2xl border border-glass-border bg-glass px-4 py-3">
      <span className="font-display text-3xl tabular-nums text-champagne">{value}</span>
      <span className="mt-1 font-body text-[10px] uppercase tracking-widest text-ivory/55">
        {label}
      </span>
    </div>
  )
}

/* ---------- Heart icon ---------- */
function HeartMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="cal-heart" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff9ab3" />
          <stop offset="55%" stopColor="#ff5d8f" />
          <stop offset="100%" stopColor="#c72e60" />
        </radialGradient>
      </defs>
      <path
        d="M12 21s-7.5-4.8-9.5-9.2C.9 8.4 2.4 5 5.8 4.4 8 4 10 5 12 7c2-2 4-3 6.2-2.6 3.4.6 4.9 4 3.3 7.4C19.5 16.2 12 21 12 21z"
        fill="url(#cal-heart)"
      />
      <ellipse cx="8" cy="9" rx="1.7" ry="1" fill="#fff" opacity="0.6" />
    </svg>
  )
}

/* ---------- Calendar ---------- */
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function Calendar({
  year,
  month,   // 0-indexed
  markedDay,
}: {
  year: number
  month: number
  markedDay: number
}) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Build grid cells: leading blanks + days
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
  const todayDate = today.getDate()

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-3xl border border-glass-border bg-glass p-5 shadow-[0_24px_60px_rgb(20_6_14/0.45)]">
      {/* Header */}
      <div className="mb-4 flex items-baseline justify-between">
        <p className="font-display text-xl text-champagne">{MONTH_NAMES[month]}</p>
        <p className="font-body text-xs uppercase tracking-[0.3em] text-ivory/50">{year}</p>
      </div>

      {/* Weekday row */}
      <div className="grid grid-cols-7 gap-1 pb-2">
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            className="text-center font-body text-[10px] uppercase tracking-widest text-ivory/40"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <span key={idx} className="aspect-square" />

          const isMarked = day === markedDay
          const isToday = isCurrentMonth && day === todayDate

          return (
            <div
              key={idx}
              className={[
                'relative flex aspect-square items-center justify-center rounded-xl font-body text-sm transition',
                isMarked
                  ? 'bg-rose-500/10 text-ivory'
                  : isToday
                    ? 'bg-champagne/15 text-champagne ring-1 ring-champagne/40'
                    : 'text-ivory/70',
              ].join(' ')}
            >
              <span className={isMarked ? 'invisible' : ''}>{day}</span>

              {isMarked && (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: [0.9, 1.15, 1], rotate: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.34, 1.56, 0.64, 1],
                    times: [0, 0.6, 1],
                  }}
                >
                  <HeartMark className="h-7 w-7 drop-shadow-[0_2px_6px_rgba(255,93,143,0.6)]" />
                  <motion.span
                    className="absolute inset-0 rounded-full ring-2 ring-rose-400/50"
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                </motion.span>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center justify-center gap-2 border-t border-glass-border/60 pt-4">
        <HeartMark className="h-3.5 w-3.5" />
        <span className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory/55">
          {MONTH_NAMES[month]} {markedDay} — Your Day
        </span>
      </div>
    </div>
  )
}

export function CountdownSection() {
  const [parts, setParts] = useState<CountdownParts>(() =>
    getBirthdayCountdown(siteConfig.birthdayDate),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(getBirthdayCountdown(siteConfig.birthdayDate))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Birthday month/year — the calendar always shows October of the birthday year
  const { year, month, day } = useMemo(() => {
    const bd = new Date(siteConfig.birthdayDate)
    return {
      year: bd.getFullYear(),
      month: bd.getMonth(),
      day: bd.getDate(),
    }
  }, [])

  return (
    <section className="relative px-6 py-24" aria-live="polite">
      <ChapterHeader chapter="04" title="Your Day" subtitle="Marked on the calendar" />

      {/* Calendar with heart on the birthday */}
      <Calendar year={year} month={month} markedDay={day} />

      <div className="mx-auto mt-12 max-w-lg text-center">
        {parts.isBirthday ? (
          <p className="font-display text-3xl text-champagne sm:text-4xl">
            It&apos;s finally your day.
          </p>
        ) : (
          <>
            <p className="font-body text-sm text-ivory/65">Counting down to your birthday</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Unit label="Days" value={parts.days} />
              <Unit label="Hours" value={parts.hours} />
              <Unit label="Minutes" value={parts.minutes} />
              <Unit label="Seconds" value={parts.seconds} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}