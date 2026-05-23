import { motion } from 'motion/react'
import { easeOut } from '@/lib/motion'

export function AnimatedCheck({ size = 72, color = 'var(--color-success)' }: { size?: number; color?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.span
        className="absolute rounded-full"
        style={{ width: size, height: size, background: color, opacity: 0.14 }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.25, 1] }}
        transition={{ duration: 0.6, ease: easeOut }}
      />
      <svg width={size} height={size} viewBox="0 0 52 52">
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
        />
        <motion.path
          d="M15 27 l7.5 7.5 L38 18"
          fill="none"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.32, duration: 0.4, ease: easeOut }}
        />
      </svg>
    </div>
  )
}
