import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { motion } from 'motion/react'
import { Search, Download, Wallet, TrendingUp, Users, Lock, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/toast'
import { ExportButton } from '@/components/actions'
import { CountryTag } from '@/components/ui/CountryTag'
import { Flag } from '@/components/ui/Flag'
import { DataTable } from '@/components/ui/DataTable'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { container, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { fmtMoneyUSD } from '@/lib/format'
import { payroll, payrollByCountry, payrollTotal, payrollBrutoTotal, payrollBonosTotal, type PayrollRow } from '@/data/payroll'

export function Nomina() {
  const toast = useToast()
  const [canSee, setCanSee] = useState(true)
  const [search, setSearch] = useState('')

  const maxCountry = Math.max(...payrollByCountry.map((c) => c.total))

  const columns = useMemo<ColumnDef<PayrollRow, any>[]>(
    () => [
      {
        id: 'empleado',
        header: 'Empleado',
        accessorFn: (r) => `${r.nombre} ${r.id}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar iniciales={row.original.iniciales} gradient={row.original.avatar} size={34} />
            <div>
              <p className="font-medium text-fg">{row.original.nombre}</p>
              <p className="text-[11.5px] text-faint">{row.original.puesto}</p>
            </div>
          </div>
        ),
      },
      { id: 'pais', header: 'País', accessorFn: (r) => r.pais, cell: ({ row }) => <CountryTag pais={row.original.pais} /> },
      { accessorKey: 'bruto', header: 'Bruto', cell: (c) => <Money amount={c.getValue()} hidden={!canSee} /> },
      { accessorKey: 'bonos', header: 'Bonos', cell: (c) => <Money amount={c.getValue()} hidden={!canSee} muted /> },
      { accessorKey: 'descuentos', header: 'Descuentos', cell: (c) => <Money amount={-c.getValue()} hidden={!canSee} muted /> },
      {
        accessorKey: 'neto',
        header: 'Neto',
        cell: (c) => (
          <span className="font-mono text-[13px] font-semibold text-fg">
            <Money amount={c.getValue()} hidden={!canSee} strong />
          </span>
        ),
      },
    ],
    [canSee],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Nómina · Período mayo 2026"
        title="Nómina"
        description="Planilla consolidada de los 4 países, en USD para comparar. Los sueldos solo los ve el rol autorizado."
        action={
          <>
            <div className="flex items-center rounded-lg border border-line bg-panel p-1">
              <RoleToggle active={canSee} onClick={() => setCanSee(true)} icon={<Eye size={14} />}>
                Admin de Nómina
              </RoleToggle>
              <RoleToggle active={!canSee} onClick={() => setCanSee(false)} icon={<Lock size={14} />}>
                Analista CyC
              </RoleToggle>
            </div>
            <ExportButton label="Exportar planilla" filename="planilla_mayo_2026.xlsx" variant="primary" />
          </>
        }
      />

      {/* Summary */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard label="Nómina neta total" amount={payrollTotal} hidden={!canSee} icon={Wallet} accent />
        <SummaryCard label="Masa salarial bruta" amount={payrollBrutoTotal} hidden={!canSee} icon={TrendingUp} />
        <SummaryCard label="Bonos del período" amount={payrollBonosTotal} hidden={!canSee} icon={TrendingUp} />
        <motion.div variants={fadeUp}>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-muted">Colaboradores en planilla</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-muted">
                <Users size={16} />
              </span>
            </div>
            <p className="mt-3 font-display text-[30px] leading-none font-semibold tabular text-fg">{payroll.length}</p>
            <p className="mt-1 text-[11px] text-faint">activos · 4 países</p>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* By country */}
        <div>
          <Card className="h-full">
            <CardHeader title="Nómina por país" subtitle="Neto del período (USD)" />
            <div className="space-y-4 p-5 pt-4">
              {payrollByCountry.map((c, i) => (
                <div key={c.pais}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] text-muted">
                      <Flag pais={c.pais} size={16} /> {c.nombre} <span className="text-faint">· {c.headcount}</span>
                    </span>
                    <span className="font-mono text-[12.5px] font-medium text-fg">
                      {canSee ? fmtMoneyUSD(c.total) : '••••••'}
                    </span>
                  </div>
                  <ProgressBar value={(c.total / maxCountry) * 100} delay={i * 0.06} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Table */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-3 border-b border-line p-4">
              <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-line bg-panel px-3 py-2 focus-within:border-white/20">
                <Search size={16} className="text-faint" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar en la planilla…"
                  className="w-full bg-transparent text-[13.5px] text-fg placeholder:text-faint focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1 text-[13px] text-muted">
                <button
                  onClick={() => toast.info('Período anterior', 'Cargando planilla de abril 2026…')}
                  className="flex size-8 items-center justify-center rounded-lg border border-line hover:bg-white/[0.04]"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="px-1 font-mono">Mayo 2026</span>
                <button
                  onClick={() => toast.warning('Período no disponible', 'Junio 2026 aún no está cerrado.')}
                  className="flex size-8 items-center justify-center rounded-lg border border-line hover:bg-white/[0.04]"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
            <div className="max-h-[520px] overflow-y-auto">
              <DataTable columns={columns} data={payroll} globalFilter={search} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function RoleToggle({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-medium transition-colors',
        active ? 'bg-white/[0.1] text-fg' : 'text-muted hover:text-fg',
      )}
    >
      {icon}
      {children}
    </button>
  )
}

function SummaryCard({
  label,
  amount,
  hidden,
  icon: Icon,
  accent,
}: {
  label: string
  amount: number
  hidden: boolean
  icon: React.ComponentType<{ size?: number }>
  accent?: boolean
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="group relative overflow-hidden p-5">
        {accent && <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-accent/15 blur-3xl" />}
        <div className="relative flex items-center justify-between">
          <span className="text-[13px] font-medium text-muted">{label}</span>
          <span className={cn('flex size-8 items-center justify-center rounded-lg', accent ? 'bg-accent-soft text-accent' : 'bg-white/[0.06] text-muted')}>
            <Icon size={16} />
          </span>
        </div>
        <div className="relative mt-3 font-display text-[26px] leading-none font-semibold tabular text-fg">
          <Money amount={amount} hidden={hidden} strong big />
        </div>
        <p className="relative mt-1.5 text-[11px] text-faint">mensual · USD</p>
      </Card>
    </motion.div>
  )
}

function Money({
  amount,
  hidden,
  muted,
  strong,
  big,
}: {
  amount: number
  hidden: boolean
  muted?: boolean
  strong?: boolean
  big?: boolean
}) {
  if (hidden) {
    return (
      <span className="inline-flex items-center gap-1.5 text-faint">
        <Lock size={big ? 15 : 12} />
        <span className={cn('select-none blur-[5px]', big ? 'font-display' : 'font-mono text-[13px]')}>
          {fmtMoneyUSD(Math.abs(amount))}
        </span>
      </span>
    )
  }
  return (
    <span className={cn(big ? '' : 'font-mono text-[13px]', strong ? 'text-fg' : muted ? 'text-faint' : 'text-muted')}>
      {amount < 0 ? '−' : ''}
      {fmtMoneyUSD(Math.abs(amount))}
    </span>
  )
}
