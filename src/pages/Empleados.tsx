import { useMemo, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Search, Plus, Download, Mail, Phone, Building2, MapPin, CalendarDays, Lock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/toast'
import { ExportButton, NewEmployeeButton } from '@/components/actions'
import { Avatar } from '@/components/ui/Avatar'
import { Drawer } from '@/components/ui/Drawer'
import { CountryTag } from '@/components/ui/CountryTag'
import { Flag } from '@/components/ui/Flag'
import { DataTable } from '@/components/ui/DataTable'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/cn'
import { fmtDate } from '@/lib/format'
import { employees, countryList, departamentos, type Employee, type Country } from '@/data/employees'
import { myBalances } from '@/data/leave'

export function Empleados() {
  const [search, setSearch] = useState('')
  const [pais, setPais] = useState<Country | 'all'>('all')
  const [depto, setDepto] = useState('all')
  const [estado, setEstado] = useState('all')
  const [selected, setSelected] = useState<Employee | null>(null)

  const data = useMemo(
    () =>
      employees.filter(
        (e) =>
          (pais === 'all' || e.pais === pais) &&
          (depto === 'all' || e.departamento === depto) &&
          (estado === 'all' || e.estado === estado),
      ),
    [pais, depto, estado],
  )

  const columns = useMemo<ColumnDef<Employee, any>[]>(
    () => [
      {
        id: 'empleado',
        header: 'Empleado',
        accessorFn: (r) => `${r.nombre} ${r.id} ${r.email}`,
        cell: ({ row }) => {
          const e = row.original
          return (
            <div className="flex items-center gap-3">
              <Avatar iniciales={e.iniciales} gradient={e.avatar} size={36} />
              <div>
                <p className="font-medium text-fg">{e.nombre}</p>
                <p className="font-mono text-[11px] text-faint">{e.id}</p>
              </div>
            </div>
          )
        },
      },
      { accessorKey: 'puesto', header: 'Puesto', cell: (c) => <span className="text-muted">{c.getValue()}</span> },
      { accessorKey: 'departamento', header: 'Área', cell: (c) => <span className="text-muted">{c.getValue()}</span> },
      {
        id: 'pais',
        header: 'País / Sede',
        accessorFn: (r) => r.ciudad,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <CountryTag pais={row.original.pais} />
            <span className="text-[13px] text-muted">{row.original.ciudad}</span>
          </div>
        ),
      },
      { accessorKey: 'ingreso', header: 'Ingreso', cell: (c) => <span className="font-mono text-[12.5px] text-muted">{fmtDate(c.getValue())}</span> },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: (c) => (
          <Badge variant={c.getValue() === 'Activo' ? 'success' : 'neutral'} dot>
            {c.getValue()}
          </Badge>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestor de información"
        title="Empleados"
        description={`${data.length} colaboradores · alta, baja, roles y movimientos en un solo lugar.`}
        action={
          <>
            <ExportButton filename="empleados_cislatam.xlsx" />
            <NewEmployeeButton />
          </>
        }
      />

      <Card>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
          <div className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-lg border border-line bg-panel px-3 py-2 focus-within:border-white/20">
            <Search size={16} className="text-faint" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, ID o correo…"
              className="w-full bg-transparent text-[13.5px] text-fg placeholder:text-faint focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-line bg-panel p-1">
            <FilterChip active={pais === 'all'} onClick={() => setPais('all')}>
              Todos
            </FilterChip>
            {countryList.map((c) => (
              <FilterChip key={c.code} active={pais === c.code} onClick={() => setPais(c.code)}>
                <span className="flex items-center gap-1.5">
                  <Flag pais={c.code} size={15} /> {c.code}
                </span>
              </FilterChip>
            ))}
          </div>

          <Select value={depto} onChange={setDepto} options={[['all', 'Todas las áreas'], ...departamentos.map((d) => [d, d] as [string, string])]} />
          <Select value={estado} onChange={setEstado} options={[['all', 'Estado'], ['Activo', 'Activo'], ['Inactivo', 'Inactivo']]} />
        </div>

        <DataTable columns={columns} data={data} globalFilter={search} onRowClick={setSelected} minWidth={880} />
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && <EmployeeProfile e={selected} />}
      </Drawer>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md px-2.5 py-1 text-[12.5px] font-medium whitespace-nowrap transition-colors',
        active ? 'bg-white/[0.1] text-fg' : 'text-muted hover:text-fg',
      )}
    >
      {children}
    </button>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: [string, string][]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-muted focus:border-white/20 focus:outline-none"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v} className="bg-panel">
          {l}
        </option>
      ))}
    </select>
  )
}

function EmployeeProfile({ e }: { e: Employee }) {
  const toast = useToast()
  return (
    <div>
      {/* Header */}
      <div className="relative h-28 bg-gradient-to-br from-accent/20 via-panel to-panel">
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>
      <div className="px-6 pb-6">
        <div className="-mt-9 flex items-end gap-4">
          <Avatar iniciales={e.iniciales} gradient={e.avatar} size={74} ring />
          <div className="mb-1">
            <Badge variant={e.estado === 'Activo' ? 'success' : 'neutral'} dot>
              {e.estado}
            </Badge>
          </div>
        </div>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-fg">{e.nombre}</h2>
        <p className="text-sm text-muted">{e.puesto}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-[12px] text-faint">{e.id}</span>
          <CountryTag pais={e.pais} withName />
        </div>

        {/* Empleo */}
        <Section title="Empleo">
          <Row icon={<Building2 size={15} />} label="Departamento" value={e.departamento} />
          <Row icon={<MapPin size={15} />} label="Centro de costo" value={e.centroCosto} mono />
          <Row icon={<MapPin size={15} />} label="Sede" value={e.sede} />
          <Row icon={<CalendarDays size={15} />} label="Fecha de ingreso" value={fmtDate(e.ingreso)} />
          <Row icon={<Building2 size={15} />} label="Supervisor" value={e.supervisor} />
        </Section>

        {/* Contacto */}
        <Section title="Contacto">
          <Row icon={<Mail size={15} />} label="Correo" value={e.email} mono />
          <Row icon={<Phone size={15} />} label="Teléfono" value={e.telefono} mono />
        </Section>

        {/* Permisos */}
        <Section title="Disponibilidad de permisos">
          <div className="space-y-3">
            {myBalances.map((b) => (
              <div key={b.tipo}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="text-muted">{b.tipo}</span>
                  <span className="font-mono text-fg">
                    {b.total - b.usado} / {b.total} días
                  </span>
                </div>
                <ProgressBar value={((b.total - b.usado) / b.total) * 100} color={b.color} height={5} />
              </div>
            ))}
          </div>
        </Section>

        {/* Salario protegido */}
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-dashed border-line bg-panel/50 px-4 py-3">
          <Lock size={16} className="shrink-0 text-faint" />
          <p className="text-[12.5px] text-faint">
            <span className="font-medium text-muted">Salario y haberes</span> — visible solo para el rol{' '}
            <span className="text-accent">Admin de Nómina</span>.
          </p>
        </div>

        <div className="mt-5 flex gap-2">
          <Button variant="primary" className="flex-1" onClick={() => toast.info('Editar empleado', `Abriendo el formulario de ${e.nombre.split(' ')[0]}…`)}>
            Editar datos
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => toast.success('Movimiento registrado', 'Quedó en la bitácora del empleado.')}>
            Registrar movimiento
          </Button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-3 font-mono text-[10.5px] font-medium tracking-[0.16em] text-faint uppercase">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function Row({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-faint">{icon}</span>
      <span className="w-32 shrink-0 text-[12.5px] text-faint">{label}</span>
      <span className={cn('truncate text-[13px] text-fg', mono && 'font-mono text-[12.5px]')}>{value}</span>
    </div>
  )
}
