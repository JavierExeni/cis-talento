import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { ChevronsLeftRight, ChevronsRightLeft, ChevronDown } from 'lucide-react'
import { navGroups } from './nav'
import { BrandMark } from '@/components/Brand'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/cn'

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const toast = useToast()
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 266 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 flex h-screen shrink-0 flex-col border-r border-line bg-panel"
    >
      {/* Brand */}
      <div className={cn('flex h-16 items-center px-4', collapsed && 'justify-center px-0')}>
        <NavLink to="/" className="flex items-center gap-2.5">
          <BrandMark size={30} />
          {!collapsed && (
            <span className="font-display text-[17px] leading-none font-semibold tracking-tight whitespace-nowrap text-fg">
              CIS <span className="font-normal text-faint">latam</span>
            </span>
          )}
        </NavLink>
      </div>

      {/* Team switcher */}
      <div className="px-3">
        <button
          onClick={() => toast.info('Organización', 'Tienes acceso a CIS LATAM · Corporativo.')}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg border border-line bg-card px-2.5 py-2 text-left transition-colors hover:border-white/15',
            collapsed && 'justify-center px-0',
          )}
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-deep text-[11px] font-bold text-black">
            C
          </span>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-fg">Corporativo</p>
                <p className="truncate text-[11px] text-faint">4 países · 312 personas</p>
              </div>
              <ChevronDown size={15} className="text-faint" />
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="mb-1.5 px-2.5 font-mono text-[10px] font-medium tracking-[0.16em] text-faint/70 uppercase">
                {group.title}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors',
                      collapsed && 'justify-center px-0',
                      isActive ? 'bg-white/[0.07] text-fg' : 'text-muted hover:bg-white/[0.04] hover:text-fg',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute top-1.5 bottom-1.5 left-0 w-[2.5px] rounded-full bg-accent"
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <item.icon
                        size={18}
                        strokeWidth={2}
                        className={cn('shrink-0 transition-colors', isActive && 'text-accent')}
                      />
                      {!collapsed && <span className="flex-1 whitespace-nowrap">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-line p-3">
        <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
          <Avatar iniciales="EL" gradient="linear-gradient(135deg,#ffb224,#f97316)" size={34} />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-fg">Edgar Loayza</p>
              <p className="truncate text-[11px] text-faint">Analista de RR.HH.</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={onToggle}
              className="flex size-7 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-fg"
              aria-label="Colapsar"
            >
              <ChevronsRightLeft size={15} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={onToggle}
            className="mt-2 flex w-full items-center justify-center rounded-md py-1.5 text-faint transition-colors hover:bg-white/[0.06] hover:text-fg"
            aria-label="Expandir"
          >
            <ChevronsLeftRight size={15} />
          </button>
        )}
      </div>
    </motion.aside>
  )
}
