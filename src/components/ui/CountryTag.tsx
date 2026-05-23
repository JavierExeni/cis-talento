import { countries, type Country } from '@/data/employees'
import { cn } from '@/lib/cn'
import { Flag } from './Flag'

export function CountryTag({ pais, withName, className }: { pais: Country; withName?: boolean; className?: string }) {
  const c = countries[pais]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-0.5 text-xs font-medium text-muted',
        className,
      )}
    >
      <Flag pais={pais} size={15} />
      {withName ? c.nombre : c.code}
    </span>
  )
}
