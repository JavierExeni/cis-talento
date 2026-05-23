import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useCountUp } from '@/lib/useCountUp'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

export function StatCard({
  label,
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  delta,
  deltaPositive = true,
  icon: Icon,
  accent,
}: {
  label: string
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  delta?: string
  deltaPositive?: boolean
  icon: LucideIcon
  accent?: boolean
}) {
  const n = useCountUp(value, { decimals })

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius)] border border-line bg-card p-5 transition-colors duration-300 hover:border-white/15',
      )}
    >
      {accent && (
        <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      )}
      <div className="relative flex items-center justify-between">
        <span className="text-[13px] font-medium text-muted">{label}</span>
        <span
          className={cn(
            'flex size-8 items-center justify-center rounded-lg',
            accent ? 'bg-accent-soft text-accent' : 'bg-white/[0.06] text-muted',
          )}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>
      <div className="relative mt-3 flex items-end gap-2">
        <span className="font-display text-[30px] leading-none font-semibold tracking-tight tabular text-fg">
          {prefix}
          {n.toLocaleString('es-419', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
          {suffix}
        </span>
        {delta && (
          <span
            className={cn(
              'mb-0.5 inline-flex items-center gap-0.5 text-xs font-medium',
              deltaPositive ? 'text-success' : 'text-danger',
            )}
          >
            {deltaPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {delta}
          </span>
        )}
      </div>
    </motion.div>
  )
}
