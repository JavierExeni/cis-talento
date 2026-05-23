import type { Country } from '@/data/employees'

export const currencyByCountry: Record<Country, string> = {
  BO: 'BOB',
  CL: 'CLP',
  EC: 'USD',
  AR: 'ARS',
}

const localeByCountry: Record<Country, string> = {
  BO: 'es-BO',
  CL: 'es-CL',
  EC: 'es-EC',
  AR: 'es-AR',
}

export function fmtNumber(n: number): string {
  return new Intl.NumberFormat('es-419').format(n)
}

export function fmtMoney(amount: number, country: Country): string {
  const currency = currencyByCountry[country]
  return new Intl.NumberFormat(localeByCountry[country], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function fmtMoneyUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

const months = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

export function fmtDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function fmtDateShort(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const second = parts[1]?.[0] ?? ''
  return (first + second).toUpperCase()
}
