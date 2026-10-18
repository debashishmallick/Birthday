import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  onClick?: () => void
  disabled?: boolean
  'aria-label'?: string
}

export function PrimaryButton({
  children,
  variant = 'solid',
  className = '',
  onClick,
  disabled,
  'aria-label': ariaLabel,
}: PrimaryButtonProps) {
  const base =
    'inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-champagne text-midnight shadow-[0_8px_32px_rgb(232_213_196/0.25)] hover:bg-ivory'
      : 'border border-glass-border bg-glass text-ivory hover:border-champagne/40'

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
