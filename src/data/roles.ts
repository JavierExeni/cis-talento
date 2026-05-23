export const acciones = ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'] as const
export type Accion = (typeof acciones)[number]

export const modulos = [
  'Empleados',
  'Permisos',
  'Nómina',
  'OKRs',
  'Desempeño',
  'Reportes',
  'Encuestas',
  'Roles y permisos',
] as const
export type Modulo = (typeof modulos)[number]

export interface Role {
  id: string
  nombre: string
  descripcion: string
  usuarios: number
  color: string
}

export const roles: Role[] = [
  { id: 'empleado', nombre: 'Empleado', descripcion: 'Acceso a su propia información y autoservicio.', usuarios: 268, color: '#6f6c78' },
  { id: 'supervisor', nombre: 'Supervisor', descripcion: 'Gestiona y aprueba a su equipo directo.', usuarios: 34, color: '#74a8ff' },
  { id: 'analista', nombre: 'Analista CyC', descripcion: 'Operación de RR.HH. por país, sin sueldos.', usuarios: 7, color: '#46d88f' },
  { id: 'jefe', nombre: 'Jefe de Área', descripcion: 'Visibilidad de su área incluyendo costos.', usuarios: 12, color: '#fbbf24' },
  { id: 'nomina', nombre: 'Admin de Nómina', descripcion: 'Único rol con acceso a salarios y planilla.', usuarios: 2, color: '#ffb224' },
  { id: 'global', nombre: 'Administrador Global', descripcion: 'Control total del sistema. Acceso restringido.', usuarios: 1, color: '#ff6f6f' },
]

type Matrix = Record<string, Partial<Record<Modulo, Accion[]>>>

export const matrix: Matrix = {
  empleado: {
    Empleados: ['Ver'],
    Permisos: ['Ver', 'Crear'],
    OKRs: ['Ver', 'Crear', 'Editar'],
    Desempeño: ['Ver'],
    Encuestas: ['Ver'],
  },
  supervisor: {
    Empleados: ['Ver'],
    Permisos: ['Ver', 'Crear', 'Aprobar'],
    OKRs: ['Ver', 'Crear', 'Editar', 'Aprobar'],
    Desempeño: ['Ver', 'Editar'],
    Reportes: ['Ver'],
    Encuestas: ['Ver'],
  },
  analista: {
    Empleados: ['Ver', 'Crear', 'Editar'],
    Permisos: ['Ver', 'Crear', 'Editar', 'Aprobar'],
    OKRs: ['Ver'],
    Desempeño: ['Ver', 'Crear', 'Editar'],
    Reportes: ['Ver', 'Crear'],
    Encuestas: ['Ver', 'Crear', 'Editar'],
  },
  jefe: {
    Empleados: ['Ver', 'Editar'],
    Permisos: ['Ver', 'Aprobar'],
    Nómina: ['Ver'],
    OKRs: ['Ver', 'Crear', 'Editar', 'Aprobar'],
    Desempeño: ['Ver', 'Crear', 'Editar', 'Aprobar'],
    Reportes: ['Ver', 'Crear'],
  },
  nomina: {
    Empleados: ['Ver'],
    Nómina: ['Ver', 'Crear', 'Editar', 'Aprobar'],
    Reportes: ['Ver', 'Crear'],
  },
  global: {
    Empleados: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    Permisos: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    Nómina: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    OKRs: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    Desempeño: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    Reportes: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    Encuestas: ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
    'Roles y permisos': ['Ver', 'Crear', 'Editar', 'Aprobar', 'Eliminar'],
  },
}

/** Permisos a nivel de campo — el detalle que hoy obliga a dar "Admin global" a todos. */
export interface FieldPermission {
  campo: string
  modulo: Modulo
  roles: string[]
}

export const fieldPermissions: FieldPermission[] = [
  { campo: 'Salario y haberes', modulo: 'Nómina', roles: ['nomina', 'global'] },
  { campo: 'Costo por centro de costo', modulo: 'Nómina', roles: ['jefe', 'nomina', 'global'] },
  { campo: 'Datos de contacto', modulo: 'Empleados', roles: ['analista', 'jefe', 'nomina', 'global'] },
  { campo: 'Documentos de identidad', modulo: 'Empleados', roles: ['analista', 'global'] },
  { campo: 'Denuncias anónimas', modulo: 'Encuestas', roles: ['analista', 'global'] },
]
