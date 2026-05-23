import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2, X } from 'lucide-react'
import { easeOut } from '@/lib/motion'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

interface ToastItem {
  id: number
  type: ToastType
  title: string
  description?: string
}

interface ToastApi {
  push: (type: ToastType, title: string, description?: string) => number
  update: (id: number, type: ToastType, title: string, description?: string) => void
  dismiss: (id: number) => void
  success: (title: string, description?: string) => number
  error: (title: string, description?: string) => number
  warning: (title: string, description?: string) => number
  info: (title: string, description?: string) => number
  loading: (title: string, description?: string) => number
}

const ToastContext = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const config: Record<ToastType, { icon: typeof Info; color: string }> = {
  success: { icon: CheckCircle2, color: 'var(--color-success)' },
  error: { icon: XCircle, color: 'var(--color-danger)' },
  warning: { icon: AlertTriangle, color: 'var(--color-warning)' },
  info: { icon: Info, color: 'var(--color-info)' },
  loading: { icon: Loader2, color: 'var(--color-accent)' },
}

const DURATION = 4200

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const seq = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const push = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = ++seq.current
      setToasts((t) => [...t, { id, type, title, description }])
      if (type !== 'loading') setTimeout(() => dismiss(id), DURATION)
      return id
    },
    [dismiss],
  )

  const update = useCallback(
    (id: number, type: ToastType, title: string, description?: string) => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, type, title, description } : x)))
      if (type !== 'loading') setTimeout(() => dismiss(id), DURATION)
    },
    [dismiss],
  )

  const api = useMemo<ToastApi>(
    () => ({
      push,
      update,
      dismiss,
      success: (t, d) => push('success', t, d),
      error: (t, d) => push('error', t, d),
      warning: (t, d) => push('warning', t, d),
      info: (t, d) => push('info', t, d),
      loading: (t, d) => push('loading', t, d),
    }),
    [push, update, dismiss],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

function Toaster({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return createPortal(
    <div className="pointer-events-none fixed right-5 bottom-5 z-[100] flex w-[370px] max-w-[calc(100vw-2.5rem)] flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastCard key={t.id} t={t} onDismiss={() => onDismiss(t.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

function ToastCard({ t, onDismiss }: { t: ToastItem; onDismiss: () => void }) {
  const { icon: Icon, color } = config[t.type]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="pointer-events-auto relative overflow-hidden rounded-xl border border-line bg-panel/95 p-3.5 shadow-2xl surface-blur"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0" style={{ color }}>
          <Icon size={18} className={t.type === 'loading' ? 'animate-spin' : ''} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-semibold text-fg">{t.title}</p>
          {t.description && <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{t.description}</p>}
        </div>
        <button onClick={onDismiss} className="-mt-1 -mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-faint transition-colors hover:bg-white/[0.06] hover:text-fg">
          <X size={14} />
        </button>
      </div>
      {t.type !== 'loading' && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ background: color }}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: DURATION / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}
