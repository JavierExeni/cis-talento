import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { easeOut } from '@/lib/motion'

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  width = 540,
  dismissable = true,
}: {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  width?: number
  dismissable?: boolean
}) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <motion.div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => dismissable && onClose()}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative my-auto w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
            style={{ maxWidth: width }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.26, ease: easeOut }}
          >
            {(title || icon) && (
              <div className="flex items-start gap-3 border-b border-line px-6 py-4">
                {icon && (
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    {icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  {title && <h2 className="text-[16px] font-semibold tracking-tight text-fg">{title}</h2>}
                  {description && <p className="mt-0.5 text-[13px] text-muted">{description}</p>}
                </div>
                {dismissable && (
                  <button
                    onClick={onClose}
                    className="-mt-1 -mr-2 flex size-8 shrink-0 items-center justify-center rounded-lg text-faint transition-colors hover:bg-white/[0.06] hover:text-fg"
                    aria-label="Cerrar"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
