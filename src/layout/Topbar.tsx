import { Search, Bell, LifeBuoy, Command } from 'lucide-react'
import { countryList } from '@/data/employees'
import { Flag } from '@/components/ui/Flag'
import { useToast } from '@/components/ui/toast'

export function Topbar({ onToggleNotifications }: { onToggleNotifications: () => void }) {
  const toast = useToast()
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-bg/80 px-5 surface-blur">
      {/* Search */}
      <div className="flex w-full max-w-md items-center gap-2.5 rounded-lg border border-line bg-card px-3 py-2 text-muted transition-colors focus-within:border-white/20">
        <Search size={16} className="shrink-0" />
        <input
          placeholder="Buscar empleados, permisos, reportes…"
          className="w-full bg-transparent text-[13.5px] text-fg placeholder:text-faint focus:outline-none"
        />
        <kbd className="hidden items-center gap-0.5 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint sm:flex">
          <Command size={10} /> K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Migración pill — guiño al proyecto */}
        <button
          onClick={() => toast.info('Migración del HRM', '62% completado · ~190 de 312 empleados migrados.')}
          className="hidden items-center gap-2 rounded-lg border border-line bg-card px-3 py-1.5 transition-colors hover:border-white/15 lg:flex"
        >
          <span className="pulse-dot size-1.5 rounded-full bg-success" />
          <span className="text-[12px] text-muted">
            Migración HRM <span className="font-mono font-semibold text-fg">62%</span>
          </span>
        </button>

        {/* Country flags */}
        <div className="hidden items-center gap-1.5 rounded-lg border border-line bg-card px-2.5 py-2 md:flex">
          {countryList.map((c) => (
            <Flag key={c.code} pais={c.code} size={18} className="transition-transform hover:scale-110" />
          ))}
        </div>

        <button
          data-notif-toggle
          onClick={onToggleNotifications}
          className="relative flex size-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:text-fg"
          aria-label="Notificaciones"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 size-1.5 rounded-full bg-accent ring-2 ring-card" />
        </button>
        <button
          onClick={() => toast.info('Centro de ayuda', 'Abriendo la documentación de CIS Talento…')}
          className="flex size-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:text-fg"
        >
          <LifeBuoy size={17} />
        </button>
      </div>
    </header>
  )
}
