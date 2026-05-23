import type { Country } from '@/data/employees'
import { cn } from '@/lib/cn'

/** Banderas en SVG — los emoji de bandera no se renderizan en Windows. */
export function Flag({ pais, size = 18, className }: { pais: Country; size?: number; className?: string }) {
  const w = size
  const h = Math.round(size * 0.7)
  const cls = cn('inline-block shrink-0 overflow-hidden rounded-[2.5px] ring-1 ring-white/15', className)

  switch (pais) {
    case 'BO':
      return (
        <svg width={w} height={h} viewBox="0 0 25 18" className={cls}>
          <rect width="25" height="6" fill="#D52B1E" />
          <rect y="6" width="25" height="6" fill="#F9E300" />
          <rect y="12" width="25" height="6" fill="#007934" />
        </svg>
      )
    case 'CL':
      return (
        <svg width={w} height={h} viewBox="0 0 25 18" className={cls}>
          <rect width="25" height="18" fill="#fff" />
          <rect y="9" width="25" height="9" fill="#D52B1E" />
          <rect width="9" height="9" fill="#0039A6" />
          <text x="4.5" y="6.6" fontSize="6" textAnchor="middle" fill="#fff">
            ★
          </text>
        </svg>
      )
    case 'EC':
      return (
        <svg width={w} height={h} viewBox="0 0 25 18" className={cls}>
          <rect width="25" height="9" fill="#FFDD00" />
          <rect y="9" width="25" height="4.5" fill="#034EA2" />
          <rect y="13.5" width="25" height="4.5" fill="#ED1C24" />
        </svg>
      )
    case 'AR':
      return (
        <svg width={w} height={h} viewBox="0 0 25 18" className={cls}>
          <rect width="25" height="6" fill="#74ACDF" />
          <rect y="6" width="25" height="6" fill="#fff" />
          <rect y="12" width="25" height="6" fill="#74ACDF" />
          <circle cx="12.5" cy="9" r="1.7" fill="#F6B40E" />
        </svg>
      )
  }
}
