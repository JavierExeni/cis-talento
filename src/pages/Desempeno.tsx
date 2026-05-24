import { motion } from 'motion/react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Gauge, Users, Star, CheckCircle2, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { StatCard } from '@/components/ui/StatCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { CountryTag } from '@/components/ui/CountryTag'
import { useToast } from '@/components/ui/toast'
import { container, fadeUp } from '@/lib/motion'
import { countries, activos, type Country } from '@/data/employees'

const competencias = [
  { comp: 'Liderazgo', auto: 4.2, equipo: 3.8, jefatura: 4.1 },
  { comp: 'Comunicación', auto: 4.5, equipo: 4.1, jefatura: 4.0 },
  { comp: 'Trabajo en equipo', auto: 4.3, equipo: 4.4, jefatura: 4.2 },
  { comp: 'Orientación a resultados', auto: 3.9, equipo: 4.0, jefatura: 4.3 },
  { comp: 'Innovación', auto: 4.0, equipo: 3.6, jefatura: 3.8 },
  { comp: 'Adaptabilidad', auto: 4.4, equipo: 4.2, jefatura: 4.1 },
]

const porPais: { pais: Country; score: number }[] = [
  { pais: 'EC', score: 4.4 },
  { pais: 'BO', score: 4.3 },
  { pais: 'CL', score: 4.0 },
  { pais: 'AR', score: 3.9 },
]

export function Desempeno() {
  const toast = useToast()
  const pendientes = activos.slice(20, 26)

  const ranked = competencias
    .map((c) => ({ comp: c.comp, avg: (c.auto + c.equipo + c.jefatura) / 3 }))
    .sort((a, b) => b.avg - a.avg)
  const fortalezas = ranked.slice(0, 2)
  const mejorar = ranked.slice(-2).reverse()

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Desempeño · Evaluación 360°"
        title="Desempeño"
        description="Evaluaciones 360 centralizadas — compara áreas y países en un mismo lugar (adiós a los Forms sueltos)."
        action={
          <Button
            variant="primary"
            onClick={() => {
              const id = toast.loading('Iniciando ciclo 2026 · S2…')
              setTimeout(() => toast.update(id, 'success', 'Ciclo de evaluación iniciado', 'Se notificó a todos los evaluadores.'), 1300)
            }}
          >
            <Star size={16} /> Iniciar ciclo
          </Button>
        }
      />

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Ciclo actual" value={2026} icon={Gauge} accent suffix=" · S1" />
        <StatCard label="Avance de evaluaciones" value={78} suffix="%" icon={CheckCircle2} delta="+12%" />
        <StatCard label="Promedio organizacional" value={4.2} decimals={1} suffix=" / 5" icon={Star} delta="+0.3" />
        <StatCard label="Participación" value={91} suffix="%" icon={Users} delta="+5%" />
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Radar 360 */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader
              title="Evaluación 360° por competencia"
              subtitle="Autoevaluación vs equipo vs jefatura"
              action={<Badge variant="success" dot>4.2 / 5 prom.</Badge>}
            />
            <div className="grid items-center gap-2 p-3 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <ResponsiveContainer width="100%" height={336}>
                  <RadarChart data={competencias} outerRadius="80%">
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="comp" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={{ fill: 'var(--color-faint)', fontSize: 9 }} axisLine={false} />
                    <Radar name="Autoevaluación" dataKey="auto" stroke="#ffb224" fill="#ffb224" fillOpacity={0.22} strokeWidth={2} animationDuration={900} />
                    <Radar name="Equipo" dataKey="equipo" stroke="#74a8ff" fill="#74a8ff" fillOpacity={0.14} strokeWidth={2} animationDuration={1000} />
                    <Radar name="Jefatura" dataKey="jefatura" stroke="#46d88f" fill="#46d88f" fillOpacity={0.12} strokeWidth={2} animationDuration={1100} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col justify-center gap-3.5 px-2 pb-2 lg:col-span-2">
                <p className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-faint uppercase">
                  Promedio por competencia
                </p>
                {competencias.map((c, i) => {
                  const avg = (c.auto + c.equipo + c.jefatura) / 3
                  return (
                    <div key={c.comp}>
                      <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                        <span className="text-muted">{c.comp}</span>
                        <span className="font-mono font-medium text-fg">{avg.toFixed(1)}</span>
                      </div>
                      <ProgressBar
                        value={(avg / 5) * 100}
                        delay={i * 0.05}
                        height={5}
                        color={avg >= 4.2 ? 'var(--color-success)' : avg >= 3.9 ? 'var(--color-accent)' : 'var(--color-warning)'}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-2">
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-medium text-success">
                  <TrendingUp size={14} /> Fortalezas
                </p>
                <div className="flex flex-wrap gap-2">
                  {fortalezas.map((f) => (
                    <Badge key={f.comp} variant="success">
                      {f.comp} · {f.avg.toFixed(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2.5 flex items-center gap-1.5 text-[12px] font-medium text-warning">
                  <TrendingDown size={14} /> A desarrollar
                </p>
                <div className="flex flex-wrap gap-2">
                  {mejorar.map((m) => (
                    <Badge key={m.comp} variant="warning">
                      {m.comp} · {m.avg.toFixed(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Por país + pendientes */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Desempeño medio por país" subtitle="Escala 1 a 5" />
            <div className="space-y-4 p-5 pt-4">
              {porPais.map((p, i) => (
                <div key={p.pais}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <CountryTag pais={p.pais} withName />
                    <span className="font-mono text-[13px] font-semibold text-fg">{p.score.toFixed(1)}</span>
                  </div>
                  <ProgressBar
                    value={(p.score / 5) * 100}
                    delay={i * 0.07}
                    color={p.score >= 4.2 ? 'var(--color-success)' : p.score >= 4 ? 'var(--color-accent)' : 'var(--color-warning)'}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Tus evaluaciones pendientes" subtitle={`${pendientes.length} por completar`} />
            <div className="p-3">
              {pendientes.map((e) => (
                <button
                  key={e.id}
                  onClick={() => toast.info('Evaluación 360°', `Abriendo la evaluación de ${e.nombre.split(' ').slice(0, 2).join(' ')}…`)}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <Avatar iniciales={e.iniciales} gradient={e.avatar} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-fg">{e.nombre}</p>
                    <p className="text-[11px] text-faint">{e.puesto}</p>
                  </div>
                  <Badge variant="warning">Pendiente</Badge>
                  <ArrowRight size={15} className="text-faint" />
                </button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
