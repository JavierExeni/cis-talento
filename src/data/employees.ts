import { initials } from '@/lib/format'

export type Country = 'BO' | 'CL' | 'EC' | 'AR'

export interface CountryMeta {
  code: Country
  nombre: string
  bandera: string
  ciudades: string[]
}

export const countries: Record<Country, CountryMeta> = {
  BO: { code: 'BO', nombre: 'Bolivia', bandera: '🇧🇴', ciudades: ['Santa Cruz', 'La Paz', 'Cochabamba'] },
  CL: { code: 'CL', nombre: 'Chile', bandera: '🇨🇱', ciudades: ['Santiago', 'Valparaíso', 'Concepción'] },
  EC: { code: 'EC', nombre: 'Ecuador', bandera: '🇪🇨', ciudades: ['Quito', 'Guayaquil', 'Cuenca'] },
  AR: { code: 'AR', nombre: 'Argentina', bandera: '🇦🇷', ciudades: ['Buenos Aires', 'Córdoba', 'Rosario'] },
}

export const countryList = Object.values(countries)

export interface Employee {
  id: string
  nombre: string
  puesto: string
  departamento: string
  centroCosto: string
  sede: string
  pais: Country
  ciudad: string
  supervisor: string
  estado: 'Activo' | 'Inactivo'
  email: string
  telefono: string
  ingreso: string
  cumple: string
  salario: number
  iniciales: string
  avatar: string
}

const nombres = [
  'Emily', 'Michael', 'Sarah', 'James', 'Jessica', 'David', 'Ashley', 'Daniel',
  'Amanda', 'Matthew', 'Jennifer', 'Andrew', 'Lauren', 'Joshua', 'Megan', 'Ryan',
  'Rachel', 'Brandon', 'Samantha', 'Tyler', 'Nicole', 'Justin', 'Hannah', 'Kevin',
  'Olivia', 'Nathan', 'Victoria', 'Adam', 'Brittany', 'Aaron', 'Kayla', 'Eric',
  'Christina', 'Sean', 'Danielle', 'Jacob', 'Stephanie', 'Patrick', 'Allison', 'Steven',
  'Natalie', 'Benjamin', 'Rebecca', 'Jonathan', 'Catherine', 'Charles', 'Heather', 'Gregory',
]

const apellidos = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia',
  'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Martin', 'Jackson', 'Thompson',
  'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young',
  'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter',
  'Mitchell', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards',
]

interface Area {
  departamento: string
  puestos: string[]
  cc: string
  rango: [number, number]
}

const areas: Area[] = [
  { departamento: 'Comercial', cc: 'BO-DSP', puestos: ['Asesor Comercial', 'Ejecutivo de Ventas', 'Jefe Comercial', 'KAM'], rango: [820, 2400] },
  { departamento: 'Operaciones', cc: 'OPS-CTR', puestos: ['Analista de Operaciones', 'Supervisor de Operaciones', 'Coordinador Logístico', 'Jefe de Operaciones'], rango: [950, 2900] },
  { departamento: 'Administración & Finanzas', cc: 'ADM-FIN', puestos: ['Analista Contable', 'Tesorería', 'Generalista Adm. & Finanzas', 'Jefe de Finanzas'], rango: [1100, 3600] },
  { departamento: 'Tecnología', cc: 'TI-DEV', puestos: ['Desarrollador', 'Analista de Sistemas', 'Soporte IT', 'Líder de Tecnología'], rango: [1400, 4200] },
  { departamento: 'Recursos Humanos', cc: 'RH-GEN', puestos: ['Analista de RR.HH.', 'Generalista de Talento', 'Reclutador', 'Jefe de RR.HH.'], rango: [1050, 3400] },
  { departamento: 'Marketing', cc: 'MKT-BR', puestos: ['Diseñador', 'Community Manager', 'Analista de Marketing', 'Jefe de Marketing'], rango: [980, 3000] },
  { departamento: 'Atención al Cliente', cc: 'CX-CALL', puestos: ['Agente CX', 'Supervisor CX', 'Especialista de Soporte'], rango: [780, 1900] },
]

// Deterministic PRNG so the dataset is stable between renders.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const avatarGradients = [
  'linear-gradient(135deg,#ffb224,#f97316)',
  'linear-gradient(135deg,#74a8ff,#5b6cff)',
  'linear-gradient(135deg,#46d88f,#10b981)',
  'linear-gradient(135deg,#f472b6,#db2777)',
  'linear-gradient(135deg,#a78bfa,#7c3aed)',
  'linear-gradient(135deg,#fbbf24,#d97706)',
  'linear-gradient(135deg,#22d3ee,#0891b2)',
  'linear-gradient(135deg,#fb7185,#e11d48)',
]

function generate(): Employee[] {
  const rand = mulberry32(73)
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]
  const list: Employee[] = []
  const countryCodes: Country[] = ['BO', 'BO', 'BO', 'CL', 'CL', 'EC', 'AR']
  const counters: Record<Country, number> = { BO: 1000, CL: 1200, EC: 1300, AR: 1400 }

  for (let i = 0; i < 312; i++) {
    const pais = pick(countryCodes)
    const area = pick(areas)
    const puesto = pick(area.puestos)
    const nombre = `${pick(nombres)} ${pick(apellidos)}`
    const id = `${pais}${++counters[pais]}`
    const [min, max] = area.rango
    // Senior roles skew higher within the band.
    const seniority = /Jefe|Líder|KAM|Coordinador/.test(puesto) ? 0.65 : rand()
    const salario = Math.round((min + (max - min) * (0.3 + seniority * 0.7)) / 10) * 10
    const ciudad = pick(countries[pais].ciudades)
    const estado: Employee['estado'] = rand() > 0.94 ? 'Inactivo' : 'Activo'
    const year = 2016 + Math.floor(rand() * 10)
    const month = 1 + Math.floor(rand() * 12)
    const day = 1 + Math.floor(rand() * 27)
    const cumpleMonth = 1 + Math.floor(rand() * 12)
    const cumpleDay = 1 + Math.floor(rand() * 27)
    const nameKey = nombre.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[̀-ͯ]/g, '')

    list.push({
      id,
      nombre,
      puesto,
      departamento: area.departamento,
      centroCosto: `${pais}-${area.cc}`,
      sede: `${countries[pais].nombre} · ${ciudad}`,
      pais,
      ciudad,
      supervisor: '—',
      estado,
      email: `${nameKey.split('.').slice(0, 2).join('.')}@cislatam.com`,
      telefono: `+${pais === 'BO' ? '591' : pais === 'CL' ? '56' : pais === 'EC' ? '593' : '54'} ${Math.floor(60000000 + rand() * 39999999)}`,
      ingreso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      cumple: `${String(cumpleMonth).padStart(2, '0')}-${String(cumpleDay).padStart(2, '0')}`,
      salario,
      iniciales: initials(nombre),
      avatar: avatarGradients[i % avatarGradients.length],
    })
  }

  // Assign supervisors (a jefe from the same department & country when possible).
  for (const e of list) {
    if (/Jefe|Líder/.test(e.puesto)) continue
    const jefe = list.find(
      (j) => j.id !== e.id && j.pais === e.pais && j.departamento === e.departamento && /Jefe|Líder/.test(j.puesto),
    )
    e.supervisor = jefe?.nombre ?? list.find((j) => /Jefe|Líder/.test(j.puesto))?.nombre ?? '—'
  }

  return list
}

export const employees: Employee[] = generate()

export const activos = employees.filter((e) => e.estado === 'Activo')

export const departamentos = Array.from(new Set(employees.map((e) => e.departamento))).sort()
