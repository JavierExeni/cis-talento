import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { Modal } from './Modal'
import { AnimatedCheck } from './AnimatedCheck'
import { Button } from './Button'
import { useToast } from './toast'
import { cn } from '@/lib/cn'

export interface FormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'select'
  placeholder?: string
  options?: { value: string; label: string }[]
  defaultValue?: string
  full?: boolean
  hint?: string
}

const inputCls =
  'w-full rounded-lg border border-line bg-card px-3 py-2.5 text-[13.5px] text-fg placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none'

export function FormDialog({
  open,
  onClose,
  title,
  description,
  icon,
  fields,
  submitLabel = 'Guardar',
  successTitle = 'Listo',
  successDescription,
  width = 560,
}: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  icon?: ReactNode
  fields: FormField[]
  submitLabel?: string
  successTitle?: string
  successDescription?: string
  width?: number
}) {
  const toast = useToast()
  const [phase, setPhase] = useState<'form' | 'saving' | 'done'>('form')

  useEffect(() => {
    if (open) setPhase('form')
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPhase('saving')
    setTimeout(() => {
      setPhase('done')
      setTimeout(() => {
        onClose()
        toast.success(successTitle, successDescription)
      }, 1150)
    }, 750)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={phase === 'done' ? undefined : title}
      description={phase === 'done' ? undefined : description}
      icon={phase === 'done' ? undefined : icon}
      width={width}
      dismissable={phase === 'form'}
    >
      {phase === 'done' ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <AnimatedCheck />
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 text-lg font-semibold text-fg"
          >
            {successTitle}
          </motion.h3>
          {successDescription && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-1 max-w-xs text-sm text-muted"
            >
              {successDescription}
            </motion.p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-5">
            {fields.map((f) => (
              <div key={f.name} className={cn(f.full !== false ? '' : '', f.full ? 'col-span-2' : 'col-span-2 sm:col-span-1')}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-muted">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea rows={3} placeholder={f.placeholder} defaultValue={f.defaultValue} className={cn(inputCls, 'resize-none')} />
                ) : f.type === 'select' ? (
                  <select defaultValue={f.defaultValue} className={inputCls}>
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value} className="bg-panel">
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input type={f.type ?? 'text'} placeholder={f.placeholder} defaultValue={f.defaultValue} className={inputCls} />
                )}
                {f.hint && <p className="mt-1 text-[11.5px] text-faint">{f.hint}</p>}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-line px-6 py-4">
            <Button type="button" variant="ghost" onClick={onClose} disabled={phase === 'saving'}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={phase === 'saving'}>
              {phase === 'saving' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Guardando…
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
