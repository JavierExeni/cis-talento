import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, CheckCheck, CalendarCheck, Heart, Target, Wallet, Server, Gift, type LucideIcon } from 'lucide-react'
import { notifications, type NotifKind } from '@/data/notifications'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/cn'

const kindMeta: Record<NotifKind, { icon: LucideIcon; color: string }> = {
  permiso: { icon: CalendarCheck, color: 'var(--color-info)' },
  reconocimiento: { icon: Heart, color: 'var(--color-warning)' },
  okr: { icon: Target, color: 'var(--color-accent)' },
  nomina: { icon: Wallet, color: 'var(--color-accent)' },
  sistema: { icon: Server, color: 'var(--color-success)' },
  cumple: { icon: Gift, color: '#f472b6' },
}

export function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const [read, setRead] = useState<Set<string>>(new Set())

  // Cerrar al hacer clic fuera — sin backdrop, así la app sigue interactiva.
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (ref.current && !ref.current.contains(t) && !t.closest('[data-notif-toggle]')) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  const items = notifications.map((n) => ({ ...n, unread: n.unread && !read.has(n.id) }))
  const unread = items.filter((i) => i.unread).length

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          ref={ref}
          initial={{ x: '110%' }}
          animate={{ x: 0 }}
          exit={{ x: '110%' }}
          transition={{ duration: 0.34, ease: easeOut }}
          className="fixed top-16 right-0 bottom-0 z-40 flex w-[372px] max-w-[calc(100vw-1rem)] flex-col border-l border-line bg-panel shadow-[-8px_0_40px_-12px_rgba(0,0,0,0.6)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-semibold text-fg">Notificaciones</h3>
              {unread > 0 && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-black">{unread}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRead(new Set(notifications.map((n) => n.id)))}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
                title="Marcar todas como leídas"
              >
                <CheckCheck size={14} /> Marcar leídas
              </button>
              <button
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-fg"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto p-2">
            {items.map((n) => {
              const { icon: Icon, color } = kindMeta[n.kind]
              return (
                <button
                  key={n.id}
                  onClick={() => setRead((s) => new Set(s).add(n.id))}
                  className={cn(
                    'flex w-full gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-white/[0.04]',
                    n.unread && 'bg-white/[0.025]',
                  )}
                >
                  <span
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.05)', color }}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13.5px] font-medium text-fg">{n.titulo}</p>
                      {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />}
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{n.detalle}</p>
                    <p className="mt-1 font-mono text-[11px] text-faint">{n.hace}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-line p-3">
            <button className="w-full rounded-lg py-2 text-center text-[13px] font-medium text-accent transition-colors hover:bg-accent-soft">
              Ver todas las notificaciones
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
