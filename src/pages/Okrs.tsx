import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Plus, Target, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { NewObjectiveButton } from '@/components/actions'
import { Avatar } from '@/components/ui/Avatar'
import { StatCard } from '@/components/ui/StatCard'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { container, fadeUp, easeOut } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { objetivos, krProgress, objProgress, type Objetivo, type KeyResult, type Prioridad } from '@/data/okrs'

const prioVariant: Record<Prioridad, 'danger' | 'warning' | 'info' | 'neutral'> = {
  Crítico: 'danger',
  Alto: 'warning',
  Medio: 'info',
  Bajo: 'neutral',
}

export function Okrs() {
  const [open, setOpen] = useState<string | null>(objetivos[0]?.id ?? null)

  const avance = Math.round(objetivos.reduce((s, o) => s + objProgress(o), 0) / objetivos.length)
  const krs = objetivos.flatMap((o) => o.krs)
  const enMeta = krs.filter((k) => krProgress(k) >= 90).length
  const enRiesgo = objetivos.filter((o) => objProgress(o) < 50).length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Desempeño · OKRs"
        title="OKRs y Metas"
        description="Objetivos y resultados clave con avance medible por trimestre — T1 a T4, ponderado."
        action={<NewObjectiveButton />}
      />

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Objetivos activos" value={objetivos.length} icon={Target} accent />
        <StatCard label="Avance global" value={avance} suffix="%" icon={TrendingUp} delta="+6%" />
        <StatCard label="KRs en meta" value={enMeta} icon={CheckCircle2} />
        <StatCard label="Objetivos en riesgo" value={enRiesgo} icon={AlertTriangle} delta="" deltaPositive={false} />
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {objetivos.map((o) => (
          <motion.div key={o.id} variants={fadeUp}>
            <ObjectiveCard obj={o} open={open === o.id} onToggle={() => setOpen(open === o.id ? null : o.id)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function ObjectiveCard({ obj, open, onToggle }: { obj: Objetivo; open: boolean; onToggle: () => void }) {
  const progress = objProgress(obj)
  return (
    <Card className={cn('overflow-hidden transition-colors', open && 'border-white/15')}>
      <button onClick={onToggle} className="flex w-full items-center gap-4 px-5 py-4 text-left">
        <ProgressRing value={progress} size={52} stroke={4.5} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[15px] font-semibold text-fg">{obj.nombre}</h3>
            <Badge variant="outline">{obj.nivel}</Badge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-faint">
            <span className="flex items-center gap-1.5">
              <Avatar iniciales={obj.iniciales} gradient="linear-gradient(135deg,#a78bfa,#7c3aed)" size={18} />
              {obj.owner}
            </span>
            <span className="font-mono">{obj.krs.length} KRs</span>
            <span className="hidden sm:inline">Vence {obj.vencimiento}</span>
          </div>
        </div>
        <Badge variant={prioVariant[obj.prioridad]}>{obj.prioridad}</Badge>
        <ChevronDown size={18} className={cn('shrink-0 text-faint transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-line bg-panel/40 p-5">
              {obj.krs.map((kr) => (
                <KrRow key={kr.id} kr={kr} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function KrRow({ kr }: { kr: KeyResult }) {
  const p = krProgress(kr)
  return (
    <div className="rounded-[var(--radius)] border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-fg">{kr.nombre}</p>
          <p className="mt-0.5 text-[11.5px] text-faint">
            {kr.owner} · métrica: {kr.metrica}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Badge variant={prioVariant[kr.prioridad]}>{kr.prioridad}</Badge>
          <span className="font-mono text-[15px] font-semibold tabular text-accent">{p}%</span>
        </div>
      </div>

      {/* Desglose por trimestre — lo que el sistema actual NO permite */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {kr.trimestres.map((t, i) => (
          <div key={t.t} className="rounded-lg border border-line-soft bg-panel/60 p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold tracking-wide text-muted">{t.t}</span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-faint">
                peso {t.peso}%
              </span>
            </div>
            <p className="mt-2 font-display text-lg leading-none font-semibold tabular text-fg">{t.avance}%</p>
            <div className="mt-2">
              <ProgressBar
                value={t.avance}
                height={4}
                delay={0.1 + i * 0.06}
                color={t.avance >= 80 ? 'var(--color-success)' : t.avance >= 45 ? 'var(--color-accent)' : 'var(--color-danger)'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
