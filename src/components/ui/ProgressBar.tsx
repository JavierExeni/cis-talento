import { motion } from 'motion/react'
import { easeOut } from '@/lib/motion'

export function ProgressBar({
  value,
  color = 'var(--color-accent)',
  height = 6,
  delay = 0,
}: {
  value: number
  color?: string
  height?: number
  delay?: number
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-white/[0.07]"
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        transition={{ duration: 0.9, ease: easeOut, delay }}
      />
    </div>
  )
}
