# CIS LATAM · Talento — Mockup del nuevo HRM

Mockup premium y navegable del reemplazo del HRM actual (OrangeHRM) de CIS LATAM.
Pensado como demo para la directiva **y** como semilla del producto real.

> Datos simulados (sin backend ni autenticación reales todavía).

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de producción: `npm run build` · Previsualizar build: `npm run preview`

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** — tema oscuro premium, acento ámbar de marca
- **Motion** (ex Framer Motion) — transiciones de página y micro-interacciones
- **React Router v7** — navegación entre pantallas
- **TanStack Table** — tablas de datos (empleados, nómina)
- **Recharts** — gráficos (tendencia, radar 360)
- **lucide-react** — iconografía

## Pantallas

| Ruta | Pantalla | Destaca |
|------|----------|---------|
| `/login` | Login | Pantalla de acceso premium |
| `/` | Dashboard | KPIs, evolución de plantilla, ausentes, actividad |
| `/empleados` | Empleados | Tabla con filtros + drawer de perfil |
| `/permisos` | Permisos | Saldos, aprobaciones, reglas por país |
| `/nomina` | **Nómina (nuevo)** | Sueldos enmascarados según rol |
| `/okrs` | OKRs y Metas | **Desglose T1–T4 ponderado** |
| `/desempeno` | Desempeño | Evaluación 360° (radar) + comparación por país |
| `/reportes` | Reportes | Constructor + export CSV/Excel/PDF |
| `/encuestas` | Encuestas y clima | eNPS, tendencia, campañas, plantillas configurables |
| `/voz` | Voz del colaborador | Reconocimiento (estrellas) + denuncias anónimas |
| `/roles` | Roles y permisos | **Matriz RBAC + permisos por campo** |

## Estructura

```
src/
  layout/        AppShell, Sidebar, Topbar, navegación
  pages/         una pantalla por archivo
  components/ui/ primitivas (Card, Badge, Button, DataTable, Drawer, …)
  components/charts/  gráficos Recharts
  data/          datos mock (empleados, permisos, nómina, okrs, roles…)
  lib/           helpers (formato, animaciones, cn, count-up)
```

Para conectar a una API real más adelante, basta con reemplazar los módulos de `src/data/`.
