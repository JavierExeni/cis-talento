export type NotifKind = 'permiso' | 'reconocimiento' | 'okr' | 'nomina' | 'sistema' | 'cumple'

export interface Notif {
  id: string
  kind: NotifKind
  titulo: string
  detalle: string
  hace: string
  unread: boolean
}

export const notifications: Notif[] = [
  { id: 'n1', kind: 'permiso', titulo: '35 permisos por aprobar', detalle: 'Tienes solicitudes pendientes de Bolivia y Chile.', hace: 'hace 8 min', unread: true },
  { id: 'n2', kind: 'reconocimiento', titulo: 'Nuevo reconocimiento', detalle: 'Laura Bennett reconoció tu apoyo en el cierre de mes.', hace: 'hace 40 min', unread: true },
  { id: 'n3', kind: 'nomina', titulo: 'Planilla de Chile lista para revisión', detalle: 'El Admin de Nómina cerró el período de abril.', hace: 'hace 2 h', unread: true },
  { id: 'n4', kind: 'okr', titulo: 'Avance T2 actualizado', detalle: 'Mark actualizó “Tools y plataformas” al 100%.', hace: 'hace 3 h', unread: false },
  { id: 'n5', kind: 'cumple', titulo: '3 cumpleaños esta semana', detalle: 'Recuerda saludar a tu equipo 🎂', hace: 'hoy', unread: false },
  { id: 'n6', kind: 'sistema', titulo: 'Migración del HRM al 62%', detalle: '190 de 312 empleados ya migrados desde el sistema anterior.', hace: 'ayer', unread: false },
  { id: 'n7', kind: 'permiso', titulo: 'Vacaciones aprobadas', detalle: 'Tu solicitud del 18/07 fue aprobada.', hace: 'ayer', unread: false },
]
