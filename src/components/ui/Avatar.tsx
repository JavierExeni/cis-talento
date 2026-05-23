import { cn } from '@/lib/cn'

interface AvatarProps {
  iniciales: string
  gradient: string
  size?: number
  className?: string
  ring?: boolean
}

export function Avatar({ iniciales, gradient, size = 36, className, ring }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-black/80 select-none',
        ring && 'ring-2 ring-bg',
        className,
      )}
      style={{
        background: gradient,
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {iniciales}
    </div>
  )
}
