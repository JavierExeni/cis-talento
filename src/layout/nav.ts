import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  Target,
  Gauge,
  BarChart3,
  ShieldCheck,
  ClipboardList,
  Megaphone,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  badge?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: 'Principal',
    items: [{ label: 'Inicio', to: '/', icon: LayoutDashboard }],
  },
  {
    title: 'Gestión',
    items: [
      { label: 'Empleados', to: '/empleados', icon: Users },
      { label: 'Permisos', to: '/permisos', icon: CalendarCheck },
      { label: 'Nómina', to: '/nomina', icon: Wallet, badge: 'Nuevo' },
    ],
  },
  {
    title: 'Análisis',
    items: [
      { label: 'OKRs y Metas', to: '/okrs', icon: Target },
      { label: 'Desempeño', to: '/desempeno', icon: Gauge },
      { label: 'Reportes', to: '/reportes', icon: BarChart3 },
    ],
  },
  {
    title: 'Cultura',
    items: [
      { label: 'Encuestas y clima', to: '/encuestas', icon: ClipboardList },
      { label: 'Voz del colaborador', to: '/voz', icon: Megaphone },
    ],
  },
  {
    title: 'Seguridad',
    items: [{ label: 'Roles y permisos', to: '/roles', icon: ShieldCheck }],
  },
]
