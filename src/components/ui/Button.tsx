import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'subtle' | 'ghost' | 'outline'
type Size = 'sm' | 'md'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-black font-semibold hover:bg-[#ffc04d] active:bg-accent-deep shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]',
  subtle: 'bg-white/[0.06] text-fg hover:bg-white/[0.1]',
  ghost: 'text-muted hover:text-fg hover:bg-white/[0.05]',
  outline: 'text-fg ring-1 ring-line ring-inset hover:bg-white/[0.04] hover:ring-white/20',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
  md: 'h-9.5 px-4 text-sm gap-2 rounded-lg',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function Button({ variant = 'subtle', size = 'md', className, children, ...rest }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
