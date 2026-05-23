import { cn } from '@/lib/cn'

export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className="shrink-0">
      <defs>
        <linearGradient id="cisg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="0.5" stopColor="#ffb224" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5 27 9.75v12.5L16 28.5 5 22.25V9.75z"
        fill="none"
        stroke="url(#cisg)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="3.4" fill="url(#cisg)" />
    </svg>
  )
}

export function Brand({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <BrandMark size={size} />
      <span className="font-display text-[17px] leading-none font-semibold tracking-tight text-fg">
        CIS <span className="font-normal text-faint">latam</span>
      </span>
    </div>
  )
}
