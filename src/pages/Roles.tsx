import { useState } from 'react'
import { motion } from 'motion/react'
import { ShieldCheck, ShieldAlert, Lock, KeyRound, ArrowRight, Download } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/toast'
import { NewRoleButton } from '@/components/actions'
import { container, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { roles, modulos, acciones, matrix, fieldPermissions, usuariosPermisosErroneos } from '@/data/roles'

const accInitial: Record<string, string> = {
  Ver: 'V',
  Crear: 'C',
  Editar: 'E',
  Aprobar: 'A',
  Eliminar: 'X',
}

export function Roles() {
  const toast = useToast()
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const [reportOpen, setReportOpen] = useState(false)

  const exportarAuditoria = () => {
    const id = toast.loading('Generando auditoría…', `${usuariosPermisosErroneos.length} usuarios`)
    setTimeout(() => toast.update(id, 'success', 'Auditoría exportada', 'permisos_erroneos.xlsx'), 1100)
  }
  const aplicarMinimoPrivilegio = () => {
    toast.success('Mínimo privilegio aplicado', `${usuariosPermisosErroneos.length} usuarios reasignados a su rol sugerido.`)
    setReportOpen(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Seguridad · Control de acceso"
        title="Roles y permisos"
        description="Permisos granulares por módulo y por campo, con principio de mínimo privilegio."
        action={<NewRoleButton />}
      />

      {/* Antes vs ahora */}
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <Card className="relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -top-16 -right-12 size-44 rounded-full bg-success/10 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-x-10 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-danger-soft text-danger">
                <ShieldAlert size={20} />
              </span>
              <div>
                <p className="text-[12px] text-faint">Antes (HRM actual)</p>
                <p className="text-[15px] font-semibold text-fg">
                  <span className="font-display text-xl text-danger">41</span> usuarios con Administrador Global
                </p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-line sm:block" />
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-success-soft text-success">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="text-[12px] text-faint">Ahora (mínimo privilegio)</p>
                <p className="text-[15px] font-semibold text-fg">
                  <span className="font-display text-xl text-success">1</span> Administrador Global · roles específicos para el resto
                </p>
              </div>
            </div>
            <button
              onClick={() => setReportOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-danger-soft/40 px-3.5 py-2 text-[12.5px] font-medium text-danger transition-colors hover:bg-danger-soft sm:ml-auto"
            >
              <ShieldAlert size={15} /> Ver usuarios con permisos erróneos
              <ArrowRight size={14} />
            </button>
          </div>
        </Card>
      </motion.div>

      {/* Reporte: usuarios con permisos erróneos */}
      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        width={640}
        title="Usuarios con permisos erróneos"
        description={`${usuariosPermisosErroneos.length} usuarios con “Administrador Global” — sugerencia por mínimo privilegio`}
        icon={<ShieldAlert size={18} />}
      >
        <div className="max-h-[58vh] overflow-y-auto overscroll-contain">
          {usuariosPermisosErroneos.map((u) => (
            <div key={u.id} className="flex items-center gap-3 border-b border-line-soft px-6 py-3 last:border-0">
              <Avatar iniciales={u.iniciales} gradient={u.avatar} size={34} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-medium text-fg">{u.nombre}</p>
                <p className="flex items-center gap-1.5 text-[11.5px] text-faint">
                  <span className="font-mono">{u.id}</span> · <span className="truncate">{u.departamento}</span>
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] sm:hidden">
                  <span className="text-faint">→ sugerido:</span>
                  <span className="font-medium text-success">{u.rolSugerido}</span>
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <Badge variant="danger">{u.rolActual}</Badge>
                <ArrowRight size={13} className="text-faint" />
                <Badge variant="success">{u.rolSugerido}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-card/40 px-6 py-4">
          <p className="max-w-[300px] text-[12px] leading-relaxed text-faint">
            Aplicar mínimo privilegio revoca “Administrador Global” y asigna a cada uno su rol sugerido.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportarAuditoria}>
              <Download size={15} /> Exportar
            </Button>
            <Button variant="primary" onClick={aplicarMinimoPrivilegio}>
              <ShieldCheck size={15} /> Aplicar a todos
            </Button>
          </div>
        </div>
      </Modal>

      {/* Roles */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {roles.map((r) => (
          <motion.div
            key={r.id}
            variants={fadeUp}
            onClick={() => toast.info('Editar rol', `${r.nombre} · ${r.usuarios} usuario(s)`)}
            className="cursor-pointer"
          >
            <Card hover className="h-full p-4">
              <div className="flex items-center justify-between">
                <span className="size-2.5 rounded-full" style={{ background: r.color }} />
                <span className="font-mono text-[12px] font-semibold text-fg">{r.usuarios}</span>
              </div>
              <p className="mt-2.5 text-[13.5px] font-semibold text-fg">{r.nombre}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-faint">{r.descripcion}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Matriz */}
      <Card>
        <CardHeader
          title="Matriz de permisos"
          subtitle="Acciones permitidas por rol y módulo"
          action={
            <div className="hidden items-center gap-2.5 text-[11px] text-faint sm:flex">
              {acciones.map((a) => (
                <span key={a} className="flex items-center gap-1">
                  <span className="flex size-4 items-center justify-center rounded bg-accent text-[9px] font-bold text-black">{accInitial[a]}</span>
                  {a}
                </span>
              ))}
            </div>
          }
        />
        <div className="overflow-x-auto p-5 pt-4">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 border-b border-line bg-card py-3 pr-4 pl-1 text-left text-[12px] font-medium tracking-wide text-faint uppercase shadow-[1px_0_0_var(--color-line)]">
                  Módulo
                </th>
                {roles.map((r) => (
                  <th key={r.id} className="border-b border-line bg-card px-2 py-3 text-center">
                    <span className="flex items-center justify-center gap-1.5 text-[12px] font-semibold whitespace-nowrap text-fg">
                      <span className="size-2 rounded-full" style={{ background: r.color }} />
                      {r.nombre}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modulos.map((m) => (
                <tr key={m}>
                  <td className="sticky left-0 z-10 border-b border-line-soft bg-card py-3 pr-4 pl-1 text-[13px] font-medium whitespace-nowrap text-muted shadow-[1px_0_0_var(--color-line)]">
                    {m}
                  </td>
                  {roles.map((r) => {
                    const enabled = matrix[r.id]?.[m] ?? []
                    return (
                      <td key={r.id} className="border-b border-line-soft px-2 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {acciones.map((a) => {
                            const key = `${r.id}-${m}-${a}`
                            const on = overrides[key] ?? enabled.includes(a)
                            return (
                              <button
                                key={a}
                                title={`${a} · ${r.nombre}`}
                                onClick={() => {
                                  setOverrides((o) => ({ ...o, [key]: !on }))
                                  toast.info(`${a} ${!on ? 'activado' : 'desactivado'}`, `${r.nombre} · ${m}`)
                                }}
                                className={cn(
                                  'flex size-5 items-center justify-center rounded text-[9px] font-bold transition-colors',
                                  on ? 'bg-accent text-black hover:bg-[#ffc04d]' : 'bg-white/[0.04] text-faint/40 hover:bg-white/[0.12]',
                                )}
                              >
                                {accInitial[a]}
                              </button>
                            )
                          })}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Permisos a nivel de campo */}
      <Card>
        <CardHeader
          title="Permisos a nivel de campo"
          subtitle="El detalle que hoy obliga a dar “Admin global” a todos"
          action={<KeyRound size={16} className="text-accent" />}
        />
        <div className="divide-y divide-line-soft">
          {fieldPermissions.map((f) => (
            <div key={f.campo} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.05] text-faint">
                  <Lock size={15} />
                </span>
                <div>
                  <p className="text-[13.5px] font-medium text-fg">{f.campo}</p>
                  <p className="text-[11.5px] text-faint">Módulo: {f.modulo}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[11.5px] text-faint">Visible para:</span>
                {f.roles.map((rid) => {
                  const role = roles.find((r) => r.id === rid)
                  return (
                    <span
                      key={rid}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-0.5 text-[11.5px] font-medium text-muted"
                    >
                      <span className="size-1.5 rounded-full" style={{ background: role?.color }} />
                      {role?.nombre}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
