import type { Country } from './employees'
import { employees } from './employees'

export interface LeaveType {
  nombre: string
  dias: number
  color: string
  pais?: Country
}

/** Reglas de permisos por país (lo que el sistema actual no maneja bien). */
export const leaveRulesByCountry: Record<Country, LeaveType[]> = {
  BO: [
    { nombre: 'Vacaciones', dias: 15, color: 'var(--color-accent)' },
    { nombre: 'Permiso personal', dias: 3, color: 'var(--color-info)' },
    { nombre: 'Licencia por cumpleaños', dias: 1, color: 'var(--color-success)' },
    { nombre: 'Enfermedad', dias: 5, color: 'var(--color-danger)' },
    { nombre: 'Matrimonio', dias: 3, color: 'var(--color-warning)' },
  ],
  CL: [
    { nombre: 'Vacaciones', dias: 15, color: 'var(--color-accent)' },
    { nombre: 'Licencia médica', dias: 6, color: 'var(--color-danger)' },
    { nombre: 'Día administrativo', dias: 2, color: 'var(--color-info)' },
  ],
  EC: [
    { nombre: 'Vacaciones', dias: 15, color: 'var(--color-accent)' },
    { nombre: 'Enfermedad', dias: 5, color: 'var(--color-danger)' },
    { nombre: 'Calamidad doméstica', dias: 3, color: 'var(--color-warning)' },
  ],
  AR: [
    { nombre: 'Vacaciones', dias: 14, color: 'var(--color-accent)' },
    { nombre: 'Licencia por enfermedad', dias: 6, color: 'var(--color-danger)' },
    { nombre: 'Día de cumpleaños', dias: 1, color: 'var(--color-success)' },
  ],
}

export interface LeaveBalance {
  tipo: string
  total: number
  usado: number
  color: string
}

/** Saldos del usuario actual (Alex, Bolivia). */
export const myBalances: LeaveBalance[] = [
  { tipo: 'Vacaciones', total: 15, usado: 5, color: 'var(--color-accent)' },
  { tipo: 'Permiso personal', total: 3, usado: 0, color: 'var(--color-info)' },
  { tipo: 'Licencia por cumpleaños', total: 1, usado: 0.5, color: 'var(--color-success)' },
  { tipo: 'Enfermedad', total: 5, usado: 0, color: 'var(--color-danger)' },
]

export type LeaveStatus = 'Pendiente' | 'Aprobado' | 'Rechazado'

export interface LeaveRequest {
  id: string
  empleadoId: string
  empleado: string
  iniciales: string
  avatar: string
  pais: Country
  tipo: string
  desde: string
  hasta: string
  dias: number
  saldo: number
  estado: LeaveStatus
}

function buildRequests(): LeaveRequest[] {
  const sample = employees.filter((e) => e.estado === 'Activo').slice(3, 25)
  const tipos = ['Vacaciones', 'Enfermedad', 'Permiso personal', 'Matrimonio', 'Día administrativo']
  const estados: LeaveStatus[] = ['Pendiente', 'Pendiente', 'Pendiente', 'Aprobado', 'Rechazado']
  return sample.map((e, i) => {
    const dias = [1, 3, 5, 6, 7, 10, 15][i % 7]
    const d1 = 4 + ((i * 3) % 22)
    const month = 5 + (i % 4)
    return {
      id: `LV-${2600 + i}`,
      empleadoId: e.id,
      empleado: e.nombre,
      iniciales: e.iniciales,
      avatar: e.avatar,
      pais: e.pais,
      tipo: tipos[i % tipos.length],
      desde: `2026-${String(month).padStart(2, '0')}-${String(d1).padStart(2, '0')}`,
      hasta: `2026-${String(month).padStart(2, '0')}-${String(Math.min(d1 + dias, 28)).padStart(2, '0')}`,
      dias,
      saldo: [0.5, 2.81, 5, 7, 10, 14, 15][i % 7],
      estado: estados[i % estados.length],
    }
  })
}

export const leaveRequests: LeaveRequest[] = buildRequests()

export const pendingRequests = leaveRequests.filter((r) => r.estado === 'Pendiente')
