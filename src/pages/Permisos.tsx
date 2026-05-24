import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, X, Plus, Clock, CalendarCheck, Globe } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/toast'
import { NewLeaveButton } from '@/components/actions'
import { Avatar } from '@/components/ui/Avatar'
import { CountryTag } from '@/components/ui/CountryTag'
import { Flag } from '@/components/ui/Flag'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { container, fadeUp, easeOut } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { fmtDateShort } from '@/lib/format'
import { myBalances, leaveRequests, leaveRulesByCountry, type LeaveStatus } from '@/data/leave'
import { countryList, type Country } from '@/data/employees'

export function Permisos() {
  const toast = useToast()
  const [resolved, setResolved] = useState<Record<string, LeaveStatus>>({})
  const [rulesCountry, setRulesCountry] = useState<Country>('BO')

  const requests = useMemo(
    () => leaveRequests.map((r) => ({ ...r, estado: resolved[r.id] ?? r.estado })),
    [resolved],
  )
  const pendientes = requests.filter((r) => r.estado === 'Pendiente').length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestión de permisos"
        title="Permisos y vacaciones"
        description="Saldos, solicitudes y reglas por país — configurables sin depender del proveedor."
        action={<NewLeaveButton />}
      />

      {/* Mis saldos */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
        {myBalances.map((b) => {
          const disp = b.total - b.usado
          return (
            <motion.div key={b.tipo} variants={fadeUp}>
              <Card className="p-5">
                <p className="text-[13px] font-medium text-muted">{b.tipo}</p>
                <p className="mt-2 font-display text-[30px] leading-none font-semibold tabular text-fg">
                  {disp.toFixed(2)}
                </p>
                <p className="mt-1 text-[11px] text-faint">de {b.total} días disponibles</p>
                <div className="mt-3">
                  <ProgressBar value={(disp / b.total) * 100} color={b.color} height={5} />
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Aprobaciones */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Solicitudes por aprobar"
              subtitle={`${pendientes} pendientes de tu aprobación`}
              action={
                <Badge variant="warning" dot>
                  {pendientes} pendientes
                </Badge>
              }
            />
            <div className="mt-2">
              {requests.slice(0, 11).map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 border-t border-line-soft px-4 py-3 transition-colors hover:bg-white/[0.02] sm:gap-3.5 sm:px-5"
                >
                  <Avatar iniciales={r.iniciales} gradient={r.avatar} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-fg">{r.empleado}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="truncate text-[12px] text-faint">{r.tipo}</span>
                      <span className="hidden shrink-0 sm:inline-flex">
                        <CountryTag pais={r.pais} />
                      </span>
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-[12px] text-muted">
                      {fmtDateShort(r.desde)} → {fmtDateShort(r.hasta)}
                    </p>
                    <p className="text-[11px] text-faint">{r.dias} día(s)</p>
                  </div>

                  <div className="w-auto shrink-0 text-right sm:w-[120px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {r.estado === 'Pendiente' ? (
                        <motion.div
                          key="actions"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center justify-end gap-1.5"
                        >
                          <button
                            onClick={() => {
                              setResolved((s) => ({ ...s, [r.id]: 'Aprobado' }))
                              toast.success('Permiso aprobado', `${r.empleado.split(' ')[0]} · ${r.tipo} (${r.dias} día(s))`)
                            }}
                            className="flex size-8 items-center justify-center rounded-lg bg-success-soft text-success transition-transform hover:scale-105"
                            aria-label="Aprobar"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setResolved((s) => ({ ...s, [r.id]: 'Rechazado' }))
                              toast.error('Permiso rechazado', `Se notificó a ${r.empleado.split(' ')[0]}.`)
                            }}
                            className="flex size-8 items-center justify-center rounded-lg bg-danger-soft text-danger transition-transform hover:scale-105"
                            aria-label="Rechazar"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div key="status" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: easeOut }}>
                          <Badge variant={r.estado === 'Aprobado' ? 'success' : 'danger'} dot>
                            {r.estado}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Reglas por país */}
        <div>
          <Card className="h-full">
            <CardHeader title="Reglas por país" subtitle="Días por tipo de permiso" action={<Globe size={16} className="text-faint" />} />
            <div className="p-5 pt-4">
              <div className="flex gap-1 rounded-lg border border-line bg-panel p-1">
                {countryList.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setRulesCountry(c.code)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[12px] font-medium transition-colors',
                      rulesCountry === c.code ? 'bg-white/[0.1] text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    <Flag pais={c.code} size={16} /> {c.code}
                  </button>
                ))}
              </div>

              <motion.div
                key={rulesCountry}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-2"
              >
                {leaveRulesByCountry[rulesCountry].map((t) => (
                  <div key={t.nombre} className="flex items-center justify-between rounded-lg border border-line-soft px-3 py-2.5">
                    <span className="flex items-center gap-2.5 text-[13px] text-muted">
                      <span className="size-2 rounded-full" style={{ background: t.color }} />
                      {t.nombre}
                    </span>
                    <span className="font-mono text-[13px] font-medium text-fg">{t.dias} días</span>
                  </div>
                ))}
              </motion.div>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-accent-soft/50 px-3.5 py-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-[12px] leading-relaxed text-muted">
                  Cada regla es configurable por país y se aplica automáticamente al calcular saldos.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
