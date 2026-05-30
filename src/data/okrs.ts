export type Prioridad = 'Crítico' | 'Alto' | 'Medio' | 'Bajo'
export type OkrEstado = 'En progreso' | 'Pendiente' | 'Alcanzado' | 'No alcanzado' | 'Pausado'
export type Nivel = 'Empresa' | 'Área' | 'Equipo'

export interface Trimestre {
  t: 'T1' | 'T2' | 'T3' | 'T4'
  peso: number // % del KR (suma 100)
  avance: number // % logrado del trimestre
}

export interface KeyResult {
  id: string
  nombre: string
  owner: string
  metrica: string
  prioridad: Prioridad
  trimestres: Trimestre[]
}

export interface Objetivo {
  id: string
  nombre: string
  owner: string
  iniciales: string
  nivel: Nivel
  vencimiento: string
  prioridad: Prioridad
  krs: KeyResult[]
}

/** Avance del KR = Σ (peso% × avance%) — el desglose trimestral que el sistema actual no tiene. */
export function krProgress(kr: KeyResult): number {
  return Math.round(kr.trimestres.reduce((s, t) => s + (t.peso / 100) * t.avance, 0))
}

export function objProgress(o: Objetivo): number {
  if (!o.krs.length) return 0
  return Math.round(o.krs.reduce((s, k) => s + krProgress(k), 0) / o.krs.length)
}

const Q = (t1: number, t2: number, t3: number, t4: number, pesos = [25, 25, 25, 25]): Trimestre[] => [
  { t: 'T1', peso: pesos[0], avance: t1 },
  { t: 'T2', peso: pesos[1], avance: t2 },
  { t: 'T3', peso: pesos[2], avance: t3 },
  { t: 'T4', peso: pesos[3], avance: t4 },
]

export const objetivos: Objetivo[] = [
  {
    id: 'OBJ-657',
    nombre: 'Plan de negocio cumplido',
    owner: 'Sarah Mitchell',
    iniciales: 'SM',
    nivel: 'Empresa',
    vencimiento: '2026-12-31',
    prioridad: 'Alto',
    krs: [
      { id: 'KR-1', nombre: 'Programa de embajadores activos', owner: 'Mark Reynolds', metrica: '# embajadores', prioridad: 'Medio', trimestres: Q(40, 60, 70, 30, [20, 30, 30, 20]) },
      { id: 'KR-2', nombre: 'Tools y plataformas actualizadas y en uso', owner: 'Mark Reynolds', metrica: 'Porcentaje', prioridad: 'Alto', trimestres: Q(100, 100, 100, 100) },
      { id: 'KR-3', nombre: 'Equipo acompasado y productivo', owner: 'Mark Reynolds', metrica: 'Porcentaje', prioridad: 'Alto', trimestres: Q(85, 92, 95, 88, [20, 20, 30, 30]) },
      { id: 'KR-4', nombre: 'Competencias y R&R actualizadas', owner: 'Mark Reynolds', metrica: 'Porcentaje', prioridad: 'Medio', trimestres: Q(60, 80, 75, 50, [30, 30, 20, 20]) },
    ],
  },
  {
    id: 'OBJ-661',
    nombre: 'Camino para la innovación creado',
    owner: 'Sarah Mitchell',
    iniciales: 'SM',
    nivel: 'Empresa',
    vencimiento: '2026-11-30',
    prioridad: 'Medio',
    krs: [
      { id: 'KR-5', nombre: 'Roadmap de innovación publicado', owner: 'Robert Hayes', metrica: 'Hitos', prioridad: 'Medio', trimestres: Q(70, 90, 100, 95) },
      { id: 'KR-6', nombre: 'Pilotos validados con clientes', owner: 'Robert Hayes', metrica: '# pilotos', prioridad: 'Alto', trimestres: Q(50, 75, 80, 60, [10, 30, 40, 20]) },
    ],
  },
  {
    id: 'OBJ-664',
    nombre: 'Proyectos activos',
    owner: 'Mark Reynolds',
    iniciales: 'MR',
    nivel: 'Área',
    vencimiento: '2026-12-31',
    prioridad: 'Alto',
    krs: [
      { id: 'KR-7', nombre: 'Migración del HRM en marcha', owner: 'Alex Carter', metrica: 'Porcentaje', prioridad: 'Crítico', trimestres: Q(20, 55, 85, 100, [10, 30, 30, 30]) },
      { id: 'KR-8', nombre: 'Gobernanza intercompany planeada', owner: 'Mark Reynolds', metrica: 'Porcentaje', prioridad: 'Alto', trimestres: Q(100, 100, 100, 100) },
    ],
  },
  {
    id: 'OBJ-670',
    nombre: 'Organización mejorada',
    owner: 'Mark Reynolds',
    iniciales: 'MR',
    nivel: 'Área',
    vencimiento: '2026-12-31',
    prioridad: 'Alto',
    krs: [
      { id: 'KR-9', nombre: 'Estructura revisada y difundida', owner: 'Emily Parker', metrica: 'Porcentaje', prioridad: 'Alto', trimestres: Q(90, 95, 100, 100) },
      { id: 'KR-10', nombre: 'Clima laboral ≥ 4.5 / 5', owner: 'Emily Parker', metrica: 'eNPS', prioridad: 'Medio', trimestres: Q(82, 86, 90, 88, [20, 20, 30, 30]) },
    ],
  },
  {
    id: 'OBJ-678',
    nombre: 'Crecimiento rentable — BAU',
    owner: 'Robert Hayes',
    iniciales: 'RH',
    nivel: 'Empresa',
    vencimiento: '2026-12-31',
    prioridad: 'Alto',
    krs: [
      { id: 'KR-11', nombre: 'Margen operativo objetivo', owner: 'Robert Hayes', metrica: 'Porcentaje', prioridad: 'Crítico', trimestres: Q(30, 45, 40, 20, [25, 25, 25, 25]) },
      { id: 'KR-12', nombre: 'Expansión de cartera', owner: 'Olivia Grant', metrica: '# cuentas', prioridad: 'Alto', trimestres: Q(60, 70, 75, 65, [20, 30, 30, 20]) },
    ],
  },
]
