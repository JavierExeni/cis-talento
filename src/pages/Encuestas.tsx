import { motion } from 'motion/react'
import { Plus, Gauge, Smile, Users, ClipboardList, Pencil, Check, Lock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/toast'
import { NewCampaignButton } from '@/components/actions'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AreaTrend } from '@/components/charts/AreaTrend'
import { container, fadeUp } from '@/lib/motion'
import {
  enps,
  climaPromedio,
  participacionGlobal,
  campañas,
  enpsTrend,
  plantillas,
  type Campaña,
} from '@/data/engagement'
import { StatCard } from '@/components/ui/StatCard'

const estadoVariant: Record<Campaña['estado'], 'success' | 'neutral' | 'warning'> = {
  Iniciada: 'success',
  Cerrada: 'neutral',
  Borrador: 'warning',
}

export function Encuestas() {
  const toast = useToast()
  const activas = campañas.filter((c) => c.estado === 'Iniciada').length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Cultura · Encuestas y clima"
        title="Encuestas y clima"
        description="eNPS, clima y cultura (6C) con plantillas y preguntas configurables — no solo 2 plantillas fijas."
        action={<NewCampaignButton />}
      />

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="eNPS actual" value={enps.score} icon={Gauge} accent delta="+14" />
        <StatCard label="Clima promedio" value={climaPromedio} decimals={1} suffix=" / 5" icon={Smile} delta="+0.3" />
        <StatCard label="Participación" value={Math.round(participacionGlobal * 100)} suffix="%" icon={Users} delta="+6%" />
        <StatCard label="Campañas activas" value={activas} icon={ClipboardList} />
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2">
          <Card>
            <CardHeader title="Evolución del eNPS" subtitle="Últimos 6 meses" action={<Badge variant="success" dot>+14 pts</Badge>} />
            <div className="px-2 pt-4 pb-2">
              <AreaTrend data={enpsTrend} dataKey="score" height={230} />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader title="Distribución eNPS" />
            <div className="p-5 pt-4">
              <div className="flex items-end gap-2">
                <span className="font-display text-4xl font-semibold tabular text-fg">{enps.score}</span>
                <span className="mb-1 text-[13px] text-muted">/ 100</span>
              </div>
              <div className="mt-4 flex h-2.5 overflow-hidden rounded-full">
                <div style={{ width: `${enps.promotores}%`, background: 'var(--color-success)' }} />
                <div style={{ width: `${enps.pasivos}%`, background: 'rgba(255,255,255,0.18)' }} />
                <div style={{ width: `${enps.detractores}%`, background: 'var(--color-danger)' }} />
              </div>
              <div className="mt-4 space-y-2.5">
                <Legend color="var(--color-success)" label="Promotores" value={enps.promotores} />
                <Legend color="rgba(255,255,255,0.3)" label="Pasivos" value={enps.pasivos} />
                <Legend color="var(--color-danger)" label="Detractores" value={enps.detractores} />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Campañas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Campañas" subtitle={`${campañas.length} en total`} />
            <div>
              {campañas.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-3 border-t border-line-soft px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13.5px] font-medium text-fg">{c.nombre}</p>
                      {c.anonimo && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-faint">
                          <Lock size={11} /> anónima
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11.5px] text-faint">
                      Plantilla {c.plantilla} · vence {c.vence}
                    </p>
                  </div>
                  <div className="w-28">
                    <div className="mb-1 flex justify-between text-[11px] text-faint">
                      <span>Participación</span>
                      <span className="font-mono text-muted">{Math.round(c.participacion * 100)}%</span>
                    </div>
                    <ProgressBar value={c.participacion * 100} height={4} />
                  </div>
                  <Badge variant={estadoVariant[c.estado]} dot>
                    {c.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Plantillas */}
        <div>
          <Card className="h-full">
            <CardHeader title="Plantillas" subtitle="Editables · preguntas configurables" />
            <div className="space-y-2 p-4">
              {plantillas.map((p) => (
                <div key={p.nombre} className="flex items-center gap-3 rounded-lg border border-line-soft p-3 transition-colors hover:border-white/15">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <ClipboardList size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-fg">{p.nombre}</p>
                    <p className="text-[11px] text-faint">
                      {p.preguntas > 0 ? `${p.preguntas} preguntas · ${p.tipo}` : p.tipo}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-1.5 py-0.5 text-[10.5px] font-medium text-success">
                    <Check size={11} /> editable
                  </span>
                </div>
              ))}
              <button
                onClick={() => toast.info('Editor de plantilla', 'Crea tus propias preguntas — sin límite de 2 plantillas.')}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line py-2.5 text-[13px] text-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <Pencil size={14} /> Crear plantilla personalizada
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="flex items-center gap-2 text-muted">
        <span className="size-2.5 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-mono text-fg">{value}%</span>
    </div>
  )
}
