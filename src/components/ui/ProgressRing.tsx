import { motion } from 'motion/react'
import { easeOut } from '@/lib/motion'

export function ProgressRing({
  value,
  size = 46,
  stroke = 4,
  color = 'var(--color-accent)',
  delay = 0,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  delay?: number
}) {
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const clamped = Math.min(Math.max(value, 0), 100)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={{ duration: 1, ease: easeOut, delay }}
        />
      </svg>
      <span className="absolute font-mono text-[11px] font-semibold tabular text-fg">
        {Math.round(clamped)}
      </span>
    </div>
  )
}
