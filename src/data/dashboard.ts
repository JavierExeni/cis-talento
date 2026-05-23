import { activos, employees, departamentos } from './employees'
import { pendingRequests } from './leave'

export const kpis = {
  headcount: activos.length,
  altasMes: 12,
  bajasMes: 4,
  permisosPendientes: pendingRequests.length,
  climaENPS: 4.6,
  rotacion: 3.2,
}

export interface TrendPoint {
  mes: string
  headcount: number
  altas: number
  bajas: number
}

export const headcountTrend: TrendPoint[] = (() => {
  const meses = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May']
  let hc = 268
  return meses.map((mes, i) => {
    const altas = 6 + ((i * 5) % 11)
    const bajas = 3 + ((i * 3) % 6)
    hc = hc + altas - bajas
    return { mes, headcount: hc, altas, bajas }
  })
})()

export const deptDistribution = departamentos
  .map((d) => ({
    departamento: d,
    total: employees.filter((e) => e.departamento === d).length,
  }))
  .sort((a, b) => b.total - a.total)

export interface AusenteHoy {
  id: string
  nombre: string
  iniciales: string
  avatar: string
  motivo: string
  pais: string
}

export const ausentesHoy: AusenteHoy[] = activos.slice(8, 17).map((e, i) => ({
  id: e.id,
  nombre: e.nombre,
  iniciales: e.iniciales,
  avatar: e.avatar,
  motivo: ['Vacaciones', 'Vacaciones', 'Enfermedad', 'Licencia con goce', 'Cumpleaños'][i % 5],
  pais: e.pais,
}))

export type ActivityKind = 'alta' | 'permiso' | 'okr' | 'reconocimiento' | 'nomina' | 'rol'

export interface Activity {
  id: string
  kind: ActivityKind
  texto: string
  actor: string
  hace: string
}

export const recentActivity: Activity[] = [
  { id: 'a1', kind: 'permiso', texto: 'aprobó la solicitud de vacaciones de Jemely Rodríguez', actor: 'Edgar Loayza', hace: 'hace 12 min' },
  { id: 'a2', kind: 'alta', texto: 'dio de alta a Yerson Pérez como Asesor Comercial (BO)', actor: 'Analista CyC', hace: 'hace 1 h' },
  { id: 'a3', kind: 'reconocimiento', texto: 'recibió una estrella de reconocimiento ⭐', actor: 'Camila Santiana', hace: 'hace 2 h' },
  { id: 'a4', kind: 'okr', texto: 'actualizó el avance T2 del KR “Tools y plataformas”', actor: 'Fabián Di Gregorio', hace: 'hace 3 h' },
  { id: 'a5', kind: 'nomina', texto: 'cerró la planilla de Abril para Chile', actor: 'Admin de Nómina', hace: 'hace 5 h' },
  { id: 'a6', kind: 'rol', texto: 'revocó el rol Administrador Global a 3 usuarios', actor: 'Seguridad', hace: 'ayer' },
]
