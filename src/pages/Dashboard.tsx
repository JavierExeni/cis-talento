import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  Users,
  UserPlus,
  CalendarClock,
  Smile,
  Plus,
  Download,
  Target,
  Star,
  Wallet,
  ShieldCheck,
  CalendarCheck,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/toast'
import { ExportButton, NewEmployeeButton } from '@/components/actions'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AreaTrend } from '@/components/charts/AreaTrend'
import { container, fadeUp } from '@/lib/motion'
import { kpis, headcountTrend, deptDistribution, ausentesHoy, recentActivity, type ActivityKind } from '@/data/dashboard'

const activityIcon: Record<ActivityKind, { icon: LucideIcon; color: string }> = {
  permiso: { icon: CalendarCheck, color: 'var(--color-info)' },
  alta: { icon: UserPlus, color: 'var(--color-success)' },
  okr: { icon: Target, color: 'var(--color-accent)' },
  reconocimiento: { icon: Star, color: 'var(--color-warning)' },
  nomina: { icon: Wallet, color: 'var(--color-accent)' },
  rol: { icon: ShieldCheck, color: 'var(--color-danger)' },
}

export function Dashboard() {
  const toast = useToast()
  const maxDept = Math.max(...deptDistribution.map((d) => d.total))

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Lunes · 23 de mayo de 2026"
        title="Buen día, Edgar"
        description="Este es el pulso de tu organización en los 4 países hoy."
        action={
          <>
            <ExportButton filename="dashboard_cislatam.xlsx" />
            <NewEmployeeButton />
          </>
        }
      />

      {/* KPIs */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4"
      >
        <StatCard label="Colaboradores activos" value={kpis.headcount} icon={Users} accent delta="+2.7%" />
        <StatCard label="Altas del mes" value={kpis.altasMes} icon={UserPlus} delta="+4" />
        <StatCard label="Permisos pendientes" value={kpis.permisosPendientes} icon={CalendarClock} delta="-3" deltaPositive={false} />
        <StatCard label="Clima (eNPS)" value={kpis.climaENPS} decimals={1} suffix=" / 5" icon={Smile} delta="+0.2" />
      </motion.div>

      {/* Trend + ausentes */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 lg:grid-cols-3">
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Evolución de la plantilla"
              subtitle="Headcount neto · últimos 12 meses"
              action={<Badge variant="success" dot>En crecimiento</Badge>}
            />
            <div className="px-2 pt-4 pb-2">
              <AreaTrend data={headcountTrend} dataKey="headcount" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <CardHeader title="Ausentes hoy" subtitle={`${ausentesHoy.length} colaboradores`} />
            <div className="mt-2 max-h-[268px] space-y-1 overflow-y-auto px-3 pb-3">
              {ausentesHoy.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]">
                  <Avatar iniciales={a.iniciales} gradient={a.avatar} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-fg">{a.nombre}</p>
                    <p className="font-mono text-[11px] text-faint">{a.id}</p>
                  </div>
                  <Badge variant={a.motivo === 'Enfermedad' ? 'danger' : 'accent'}>{a.motivo}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Distribución + actividad */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 lg:grid-cols-3">
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader title="Distribución por área" subtitle="Colaboradores por departamento" />
            <div className="space-y-3.5 p-5 pt-4">
              {deptDistribution.map((d, i) => (
                <div key={d.departamento}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <span className="text-muted">{d.departamento}</span>
                    <span className="font-mono font-medium text-fg">{d.total}</span>
                  </div>
                  <ProgressBar value={(d.total / maxDept) * 100} delay={i * 0.05} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <CardHeader
              title="Actividad reciente"
              action={
                <button
                  onClick={() => toast.info('Bitácora de actividad', 'Próximamente: historial completo de movimientos.')}
                  className="text-[12px] text-accent hover:underline"
                >
                  Ver todo
                </button>
              }
            />
            <div className="space-y-1 p-3">
              {recentActivity.map((a) => {
                const { icon: Icon, color } = activityIcon[a.kind]
                return (
                  <div key={a.id} className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.03]">
                    <span
                      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.05)', color }}
                    >
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] leading-snug text-muted">
                        <span className="font-medium text-fg">{a.actor}</span> {a.texto}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-faint">{a.hace}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { to: '/permisos', label: 'Aprobar permisos', icon: CalendarCheck },
          { to: '/nomina', label: 'Revisar nómina', icon: Wallet },
          { to: '/okrs', label: 'Seguir OKRs', icon: Target },
          { to: '/roles', label: 'Gestionar accesos', icon: ShieldCheck },
        ].map((q) => (
          <Link key={q.to} to={q.to}>
            <Card hover className="flex items-center justify-between p-4">
              <span className="flex items-center gap-3 text-[13.5px] font-medium text-fg">
                <q.icon size={18} className="text-accent" />
                {q.label}
              </span>
              <ArrowUpRight size={16} className="text-faint" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
