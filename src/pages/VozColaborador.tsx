import { motion } from 'motion/react'
import { Star, Award, Heart, ShieldQuestion, Plus, Lock, ArrowRight, Clock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RecognitionButton, ReportIssueButton } from '@/components/actions'
import { Avatar } from '@/components/ui/Avatar'
import { CountryTag } from '@/components/ui/CountryTag'
import { StatCard } from '@/components/ui/StatCard'
import { container, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { fmtDate } from '@/lib/format'
import { reconocimientos, topReconocidos, denuncias, type Denuncia } from '@/data/engagement'

const tipoVariant: Record<Denuncia['tipo'], 'danger' | 'warning' | 'info' | 'success'> = {
  'Acoso o intimidación': 'danger',
  'Conflicto laboral': 'warning',
  Sugerencia: 'info',
  Reconocimiento: 'success',
}
const estadoVariant: Record<Denuncia['estado'], 'info' | 'warning' | 'success'> = {
  Nueva: 'info',
  'En revisión': 'warning',
  Resuelta: 'success',
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={cn(i < n ? 'fill-accent text-accent' : 'text-faint/30')} />
      ))}
    </span>
  )
}

export function VozColaborador() {
  const abiertas = denuncias.filter((d) => d.estado !== 'Resuelta').length

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Cultura · Voz del colaborador"
        title="Voz del colaborador"
        description="Reconocimiento entre colegas y un canal seguro y anónimo para reportar."
        action={
          <>
            <ReportIssueButton />
            <RecognitionButton />
          </>
        }
      />

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Reconocimientos del mes" value={128} icon={Heart} accent delta="+22%" />
        <StatCard label="Estrellas otorgadas" value={342} icon={Star} delta="+58" />
        <StatCard label="Reportes abiertos" value={abiertas} icon={ShieldQuestion} />
        <StatCard label="Resolución media" value={3.2} decimals={1} suffix=" días" icon={Clock} delta="-0.8" />
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Feed de reconocimientos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Reconocimientos recientes" subtitle="Reconocimientos entre colegas" action={<Star size={16} className="text-accent" />} />
            <div>
              {reconocimientos.map((r) => (
                <div key={r.id} className="flex flex-col gap-2.5 border-t border-line-soft px-4 py-4 sm:flex-row sm:gap-3.5 sm:px-5">
                  <div className="flex shrink-0 items-center">
                    <Avatar iniciales={r.deInic} gradient={r.deAvatar} size={36} />
                    <ArrowRight size={14} className="mx-1 text-faint" />
                    <Avatar iniciales={r.paraInic} gradient={r.paraAvatar} size={36} ring />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-muted">
                      <span className="font-medium text-fg">{r.deNombre.split(' ')[0]}</span> reconoció a{' '}
                      <span className="font-medium text-fg">{r.paraNombre.split(' ').slice(0, 2).join(' ')}</span>
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-fg/90">“{r.mensaje}”</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Stars n={r.estrellas} />
                      <span className="font-mono text-[11px] text-faint">{r.hace}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Ranking */}
        <div>
          <Card className="h-full">
            <CardHeader title="Top reconocidos" subtitle="Este trimestre" action={<Award size={16} className="text-accent" />} />
            <div className="space-y-1 p-3">
              {topReconocidos.map((t, i) => (
                <div key={t.nombre} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]">
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-bold',
                      i === 0 ? 'bg-accent text-black' : i === 1 ? 'bg-white/15 text-fg' : i === 2 ? 'bg-white/[0.08] text-muted' : 'text-faint',
                    )}
                  >
                    {i + 1}
                  </span>
                  <Avatar iniciales={t.iniciales} gradient={t.avatar} size={32} />
                  <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-fg">{t.nombre}</p>
                  <span className="flex items-center gap-1 font-mono text-[13px] font-semibold text-accent">
                    <Star size={12} className="fill-accent" /> {t.estrellas}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Denuncias / reportes */}
      <Card>
        <CardHeader
          title="Reportes y denuncias"
          subtitle="Canal confidencial — el anonimato se respeta de extremo a extremo"
          action={
            <span className="hidden items-center gap-1.5 text-[12px] text-faint sm:flex">
              <Lock size={13} /> cifrado
            </span>
          }
        />
        <div>
          {denuncias.map((d) => (
            <div key={d.id} className="border-t border-line-soft px-4 py-3.5 sm:px-5">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-[13.5px] font-medium text-fg">{d.titulo}</p>
                <Badge variant={estadoVariant[d.estado]} dot className="shrink-0">
                  {d.estado}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11.5px] text-faint">
                <Badge variant={tipoVariant[d.tipo]}>{d.tipo}</Badge>
                <span className="font-mono">{d.id}</span>
                <span>{fmtDate(d.fecha)}</span>
                <CountryTag pais={d.pais} />
                {d.anonimo && (
                  <span className="inline-flex items-center gap-1">
                    <Lock size={11} /> anónimo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
