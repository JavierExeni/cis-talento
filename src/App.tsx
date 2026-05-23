import { Routes, Route } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Empleados } from './pages/Empleados'
import { Permisos } from './pages/Permisos'
import { Nomina } from './pages/Nomina'
import { Okrs } from './pages/Okrs'
import { Desempeno } from './pages/Desempeno'
import { Reportes } from './pages/Reportes'
import { Roles } from './pages/Roles'
import { Encuestas } from './pages/Encuestas'
import { VozColaborador } from './pages/VozColaborador'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="empleados" element={<Empleados />} />
        <Route path="permisos" element={<Permisos />} />
        <Route path="nomina" element={<Nomina />} />
        <Route path="okrs" element={<Okrs />} />
        <Route path="desempeno" element={<Desempeno />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="encuestas" element={<Encuestas />} />
        <Route path="voz" element={<VozColaborador />} />
        <Route path="roles" element={<Roles />} />
      </Route>
    </Routes>
  )
}
