export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isBirthday: boolean
}

export function getBirthdayCountdown(birthdayIso: string, now = new Date()): CountdownParts {
  const [y, m, d] = birthdayIso.split('-').map(Number)
  const target = new Date(y, m - 1, d, 0, 0, 0, 0)
  const endOfDay = new Date(y, m - 1, d, 23, 59, 59, 999)

  if (now >= target && now <= endOfDay) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true }
  }

  if (now > endOfDay) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true }
  }

  const diffMs = target.getTime() - now.getTime()
  const totalSec = Math.max(0, Math.floor(diffMs / 1000))
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60

  return { days, hours, minutes, seconds, isBirthday: false }
}
