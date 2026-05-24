import { NavLink } from 'react-router-dom'
import { Search, Bell, LifeBuoy, Command, Menu } from 'lucide-react'
import { countryList } from '@/data/employees'
import { Flag } from '@/components/ui/Flag'
import { BrandMark } from '@/components/Brand'
import { useToast } from '@/components/ui/toast'

export function Topbar({
  onToggleNotifications,
  onMenuClick,
}: {
  onToggleNotifications: () => void
  onMenuClick: () => void
}) {
  const toast = useToast()
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-2.5 border-b border-line bg-bg/80 px-4 surface-blur sm:gap-4 sm:px-5">
      {/* Móvil: hamburguesa + brand */}
      <button
        onClick={onMenuClick}
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:text-fg lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={18} />
      </button>
      <NavLink to="/" className="flex shrink-0 items-center gap-2 lg:hidden">
        <BrandMark size={26} />
        <span className="font-display text-[15px] font-semibold tracking-tight text-fg max-[400px]:hidden">CIS</span>
      </NavLink>

      {/* Buscador (oculto en teléfono) */}
      <div className="hidden w-full max-w-md items-center gap-2.5 rounded-lg border border-line bg-card px-3 py-2 text-muted transition-colors focus-within:border-white/20 sm:flex">
        <Search size={16} className="shrink-0" />
        <input
          placeholder="Buscar empleados, permisos, reportes…"
          className="w-full bg-transparent text-[13.5px] text-fg placeholder:text-faint focus:outline-none"
        />
        <kbd className="hidden items-center gap-0.5 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint md:flex">
          <Command size={10} /> K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Migración pill — guiño al proyecto */}
        <button
          onClick={() => toast.info('Migración del HRM', '62% completado · ~190 de 312 empleados migrados.')}
          className="hidden items-center gap-2 rounded-lg border border-line bg-card px-3 py-1.5 transition-colors hover:border-white/15 xl:flex"
        >
          <span className="pulse-dot size-1.5 rounded-full bg-success" />
          <span className="text-[12px] text-muted">
            Migración HRM <span className="font-mono font-semibold text-fg">62%</span>
          </span>
        </button>

        {/* Banderas de país */}
        <div className="hidden items-center gap-1.5 rounded-lg border border-line bg-card px-2.5 py-2 lg:flex">
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
          aria-label="Ayuda"
        >
          <LifeBuoy size={17} />
        </button>
      </div>
    </header>
  )
}
