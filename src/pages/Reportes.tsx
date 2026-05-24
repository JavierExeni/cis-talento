import { useState } from 'react'
import { motion } from 'motion/react'
import { FileText, FileSpreadsheet, FileType, Plus, Lock, Clock, Sparkles, Folder } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/toast'
import { container, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

const camposDisponibles = [
  { id: 'nombre', label: 'Nombre completo' },
  { id: 'id', label: 'ID de empleado' },
  { id: 'puesto', label: 'Puesto' },
  { id: 'departamento', label: 'Departamento' },
  { id: 'sede', label: 'Sede / País' },
  { id: 'ingreso', label: 'Fecha de ingreso' },
  { id: 'estado', label: 'Estado' },
  { id: 'permisos', label: 'Saldo de permisos' },
  { id: 'salario', label: 'Salario', locked: true },
]

const formatos = [
  { id: 'csv', label: 'CSV', icon: FileText },
  { id: 'excel', label: 'Excel', icon: FileSpreadsheet },
  { id: 'pdf', label: 'PDF', icon: FileType },
]

const guardados = [
  { nombre: 'Activos + Inactivos', cat: 'Gestor de Información', fecha: '11-05-2026', registros: 312 },
  { nombre: 'Altas y bajas', cat: 'Gestor de Información', fecha: '11-05-2026', registros: 28 },
  { nombre: 'Ausentismo', cat: 'Gestión de permisos', fecha: '24-04-2026', registros: 96 },
  { nombre: 'Aniversarios 2026', cat: 'Gestor de Información', fecha: '10-04-2026', registros: 41 },
  { nombre: 'Asesores comerciales', cat: 'Gestor de Información', fecha: '13-05-2026', registros: 73 },
  { nombre: 'Vacaciones por país', cat: 'Gestión de permisos', fecha: '20-02-2026', registros: 154 },
  { nombre: 'Desempeño por área', cat: 'Desempeño', fecha: '02-05-2026', registros: 312 },
  { nombre: 'Rotación trimestral', cat: 'Gestor de Información', fecha: '01-04-2026', registros: 18 },
]

const catVariant: Record<string, 'accent' | 'info' | 'success'> = {
  'Gestor de Información': 'accent',
  'Gestión de permisos': 'info',
  Desempeño: 'success',
}

const extByFormato: Record<string, string> = { csv: 'csv', excel: 'xlsx', pdf: 'pdf' }

export function Reportes() {
  const toast = useToast()
  const [campos, setCampos] = useState<string[]>(['nombre', 'id', 'puesto', 'sede', 'estado'])
  const [formato, setFormato] = useState('excel')

  const toggle = (id: string, locked?: boolean) => {
    if (locked) return
    setCampos((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
  }

  const generar = () => {
    if (campos.length === 0) {
      toast.warning('Selecciona al menos un campo', 'El reporte no puede estar vacío.')
      return
    }
    const id = toast.loading('Generando reporte…', `${campos.length} campos · ~312 registros`)
    setTimeout(() => toast.update(id, 'success', 'Reporte generado', `Se descargó reporte_empleados.${extByFormato[formato]}`), 1300)
  }

  const exportarGuardado = (nombre: string, formatoId: string, label: string) => {
    const id = toast.loading(`Exportando ${label}…`)
    setTimeout(() => toast.update(id, 'success', 'Exportación lista', `${nombre}.${extByFormato[formatoId]}`), 1000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reportes y analítica"
        title="Reportes"
        description="Arma reportes personalizados y expórtalos en segundos — CSV, Excel o PDF."
        action={
          <Button variant="primary" onClick={() => toast.info('Nuevo reporte', 'Arma tu reporte en el constructor de abajo.')}>
            <Plus size={16} /> Nuevo reporte
          </Button>
        }
      />

      {/* Builder */}
      <Card>
        <CardHeader title="Constructor de reporte" subtitle="Selecciona campos, filtros y formato" action={<Sparkles size={16} className="text-accent" />} />
        <div className="grid grid-cols-1 gap-6 p-5 pt-4 lg:grid-cols-3">
          {/* Campos */}
          <div className="lg:col-span-2">
            <p className="mb-2.5 font-mono text-[10.5px] font-medium tracking-[0.16em] text-faint uppercase">Campos a incluir</p>
            <div className="flex flex-wrap gap-2">
              {camposDisponibles.map((c) => {
                const active = campos.includes(c.id)
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id, c.locked)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors',
                      c.locked
                        ? 'cursor-not-allowed border-dashed border-line text-faint'
                        : active
                          ? 'border-accent/40 bg-accent-soft text-accent'
                          : 'border-line text-muted hover:border-white/20 hover:text-fg',
                    )}
                  >
                    {c.locked && <Lock size={12} />}
                    {c.label}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-[12px] text-faint">
              El campo <span className="text-muted">Salario</span> solo está disponible para el rol Admin de Nómina.
            </p>
          </div>

          {/* Formato + acción */}
          <div>
            <p className="mb-2.5 font-mono text-[10.5px] font-medium tracking-[0.16em] text-faint uppercase">Formato</p>
            <div className="grid grid-cols-3 gap-2">
              {formatos.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormato(f.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-lg border py-3 text-[12px] font-medium transition-colors',
                    formato === f.id ? 'border-accent/40 bg-accent-soft text-accent' : 'border-line text-muted hover:text-fg',
                  )}
                >
                  <f.icon size={18} />
                  {f.label}
                </button>
              ))}
            </div>
            <Button variant="primary" className="mt-4 w-full" onClick={generar}>
              Generar reporte
            </Button>
            <p className="mt-2 text-center text-[12px] text-faint">
              {campos.length} campos · ~312 registros
            </p>
          </div>
        </div>
      </Card>

      {/* Guardados */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Folder size={16} className="text-faint" />
          <h2 className="text-[15px] font-semibold text-fg">Reportes guardados</h2>
          <span className="font-mono text-[12px] text-faint">{guardados.length}</span>
        </div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guardados.map((r) => (
            <motion.div key={r.nombre} variants={fadeUp}>
              <Card hover className="group flex h-full flex-col p-4">
                <div className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] text-muted">
                    <FileText size={17} />
                  </span>
                  <Badge variant={catVariant[r.cat] ?? 'neutral'}>{r.cat.split(' ')[0]}</Badge>
                </div>
                <p className="mt-3 text-[14px] font-semibold text-fg">{r.nombre}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-faint">
                  <Clock size={12} /> {r.fecha} · {r.registros} reg.
                </p>
                <div className="mt-3 flex gap-1.5 border-t border-line-soft pt-3 opacity-0 transition-opacity group-hover:opacity-100">
                  {formatos.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => exportarGuardado(r.nombre, f.id, f.label)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-md bg-white/[0.05] py-1.5 text-[11px] text-muted transition-colors hover:bg-white/[0.1] hover:text-fg"
                    >
                      <f.icon size={12} /> {f.label}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
