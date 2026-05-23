import { activos, type Country } from './employees'

/* ─────────────── Encuestas / Clima ─────────────── */

export const enps = { score: 42, promotores: 58, pasivos: 26, detractores: 16 }
export const climaPromedio = 4.6
export const participacionGlobal = 0.84

export interface Campaña {
  id: string
  nombre: string
  plantilla: string
  vence: string
  anonimo: boolean
  estado: 'Iniciada' | 'Cerrada' | 'Borrador'
  participacion: number
}

export const campañas: Campaña[] = [
  { id: 'C-301', nombre: 'Clima CyC 2026 · S1', plantilla: 'eNPS', vence: '2026-07-15', anonimo: true, estado: 'Iniciada', participacion: 0.72 },
  { id: 'C-302', nombre: 'Pulso trimestral Q2', plantilla: 'Bienestar', vence: '2026-06-05', anonimo: true, estado: 'Iniciada', participacion: 0.41 },
  { id: 'C-303', nombre: '6C — Cultura y Colaboradores', plantilla: '6C (Cultura)', vence: '2026-07-30', anonimo: false, estado: 'Borrador', participacion: 0 },
  { id: 'C-298', nombre: 'Feedback de onboarding', plantilla: 'Pulso', vence: '2026-04-15', anonimo: false, estado: 'Cerrada', participacion: 0.88 },
  { id: 'C-295', nombre: 'eNPS anual 2025', plantilla: 'eNPS', vence: '2025-12-20', anonimo: true, estado: 'Cerrada', participacion: 0.79 },
]

export const enpsTrend = [
  { mes: 'Dic', score: 28 },
  { mes: 'Ene', score: 31 },
  { mes: 'Feb', score: 34 },
  { mes: 'Mar', score: 33 },
  { mes: 'Abr', score: 39 },
  { mes: 'May', score: 42 },
]

export interface Plantilla {
  nombre: string
  preguntas: number
  tipo: string
  editable: boolean
}

export const plantillas: Plantilla[] = [
  { nombre: 'eNPS', preguntas: 3, tipo: 'Recomendación + abiertas', editable: true },
  { nombre: '6C (Cultura)', preguntas: 18, tipo: 'Escala + abiertas', editable: true },
  { nombre: 'Bienestar', preguntas: 12, tipo: 'Escala 1–5', editable: true },
  { nombre: 'Pulso', preguntas: 5, tipo: 'Mixta', editable: true },
  { nombre: 'Personalizada', preguntas: 0, tipo: 'Desde cero', editable: true },
]

/* ─────────────── Voz del colaborador ─────────────── */

export interface Reconocimiento {
  id: string
  deNombre: string
  deInic: string
  deAvatar: string
  paraNombre: string
  paraInic: string
  paraAvatar: string
  mensaje: string
  estrellas: number
  hace: string
}

const mensajes = [
  'Salvó la entrega del cliente quedándose hasta tarde. ¡Crack!',
  'Siempre dispuesta a ayudar al equipo nuevo. Pura buena onda.',
  'Lideró el cierre de mes sin un solo error. Impecable.',
  'Resolvió el incidente de soporte en tiempo récord.',
  'Excelente acompañamiento a los asesores de Santa Cruz.',
  'Propuso una mejora que nos ahorró horas de trabajo manual.',
]

export const reconocimientos: Reconocimiento[] = activos.slice(30, 38).map((e, i) => {
  const de = activos[(i * 7 + 3) % activos.length]
  return {
    id: `R-${500 + i}`,
    deNombre: de.nombre,
    deInic: de.iniciales,
    deAvatar: de.avatar,
    paraNombre: e.nombre,
    paraInic: e.iniciales,
    paraAvatar: e.avatar,
    mensaje: mensajes[i % mensajes.length],
    estrellas: 3 + (i % 3),
    hace: ['hace 1 h', 'hace 4 h', 'ayer', 'hace 2 días', 'hace 3 días'][i % 5],
  }
})

export interface TopReconocido {
  nombre: string
  iniciales: string
  avatar: string
  estrellas: number
}

export const topReconocidos: TopReconocido[] = activos.slice(40, 45).map((e, i) => ({
  nombre: e.nombre,
  iniciales: e.iniciales,
  avatar: e.avatar,
  estrellas: 48 - i * 7,
}))

export type DenunciaTipo = 'Acoso o intimidación' | 'Conflicto laboral' | 'Sugerencia' | 'Reconocimiento'
export type DenunciaEstado = 'Nueva' | 'En revisión' | 'Resuelta'

export interface Denuncia {
  id: string
  tipo: DenunciaTipo
  titulo: string
  estado: DenunciaEstado
  fecha: string
  anonimo: boolean
  pais: Country
}

export const denuncias: Denuncia[] = [
  { id: 'VC-1042', tipo: 'Conflicto laboral', titulo: 'Diferencias de turnos en punto de venta', estado: 'En revisión', fecha: '2026-05-18', anonimo: true, pais: 'BO' },
  { id: 'VC-1041', tipo: 'Sugerencia', titulo: 'Propuesta de horario flexible los viernes', estado: 'Nueva', fecha: '2026-05-16', anonimo: false, pais: 'CL' },
  { id: 'VC-1039', tipo: 'Acoso o intimidación', titulo: 'Reporte confidencial', estado: 'En revisión', fecha: '2026-05-11', anonimo: true, pais: 'AR' },
  { id: 'VC-1037', tipo: 'Reconocimiento', titulo: 'Agradecimiento al equipo de soporte', estado: 'Resuelta', fecha: '2026-05-04', anonimo: false, pais: 'EC' },
  { id: 'VC-1034', tipo: 'Conflicto laboral', titulo: 'Carga de trabajo en cierre de mes', estado: 'Resuelta', fecha: '2026-04-28', anonimo: true, pais: 'BO' },
]

export const tiposVoz = [
  'Conflictos con supervisores o compañeros',
  'Acoso o intimidación (anónimo)',
  'Reconocimiento',
  'Sugerencia de mejora',
]
