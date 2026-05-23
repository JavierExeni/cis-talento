import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { easeOut } from '@/lib/motion'

export function Drawer({
  open,
  onClose,
  children,
  width = 460,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  width?: number
}) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute top-0 right-0 h-full overflow-y-auto border-l border-line bg-panel shadow-2xl"
            style={{ width }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: easeOut }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-white/[0.06] hover:text-fg"
              aria-label="Cerrar"
            >
              <X size={17} />
            </button>
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
