import type { Country } from './employees'
import { activos, countries } from './employees'

export interface PayrollRow {
  id: string
  nombre: string
  iniciales: string
  avatar: string
  puesto: string
  pais: Country
  centroCosto: string
  bruto: number
  bonos: number
  descuentos: number
  neto: number
}

/** Planilla del período (montos en USD para comparar entre países). */
export function buildPayroll(): PayrollRow[] {
  return activos.map((e) => {
    const bonos = Math.round(e.salario * (e.puesto.match(/Comercial|Ventas|KAM/) ? 0.18 : 0.06))
    const descuentos = Math.round((e.salario + bonos) * 0.135)
    return {
      id: e.id,
      nombre: e.nombre,
      iniciales: e.iniciales,
      avatar: e.avatar,
      puesto: e.puesto,
      pais: e.pais,
      centroCosto: e.centroCosto,
      bruto: e.salario,
      bonos,
      descuentos,
      neto: e.salario + bonos - descuentos,
    }
  })
}

export const payroll: PayrollRow[] = buildPayroll()

export interface CountryPayroll {
  pais: Country
  nombre: string
  bandera: string
  headcount: number
  total: number
  promedio: number
}

export const payrollByCountry: CountryPayroll[] = (['BO', 'CL', 'EC', 'AR'] as Country[]).map((c) => {
  const rows = payroll.filter((r) => r.pais === c)
  const total = rows.reduce((s, r) => s + r.neto, 0)
  return {
    pais: c,
    nombre: countries[c].nombre,
    bandera: countries[c].bandera,
    headcount: rows.length,
    total,
    promedio: rows.length ? Math.round(total / rows.length) : 0,
  }
})

export const payrollTotal = payroll.reduce((s, r) => s + r.neto, 0)
export const payrollBrutoTotal = payroll.reduce((s, r) => s + r.bruto, 0)
export const payrollBonosTotal = payroll.reduce((s, r) => s + r.bonos, 0)
