import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'neutral' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'outline'

const styles: Record<Variant, string> = {
  neutral: 'bg-white/[0.06] text-muted',
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info',
  outline: 'text-muted ring-1 ring-line ring-inset',
}

export function Badge({
  children,
  variant = 'neutral',
  className,
  dot,
}: {
  children: ReactNode
  variant?: Variant
  className?: string
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        styles[variant],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
