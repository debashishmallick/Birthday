import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export function ScrollCue() {
  return (
    <motion.div
      className="pointer-events-none flex flex-col items-center gap-2 text-champagne/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      aria-hidden
    >
      <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  )
}
