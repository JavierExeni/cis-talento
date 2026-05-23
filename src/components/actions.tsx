import { useState, type ReactNode } from 'react'
import {
  Download,
  UserPlus,
  CalendarPlus,
  Target,
  ClipboardList,
  ShieldCheck,
  Heart,
  ShieldQuestion,
} from 'lucide-react'
import { Button } from './ui/Button'
import { FormDialog, type FormField } from './ui/FormDialog'
import { useToast } from './ui/toast'
import { departamentos, countryList } from '@/data/employees'
import { roles } from '@/data/roles'

type Variant = 'primary' | 'outline' | 'subtle' | 'ghost'

const opt = (v: string) => ({ value: v, label: v })
const deptOptions = departamentos.map(opt)
const countryOptions = countryList.map((c) => ({ value: c.code, label: c.nombre }))
const roleOptions = roles.map((r) => ({ value: r.id, label: r.nombre }))

/* ── Exportar (toast con estado loading → success) ── */
export function ExportButton({
  label = 'Exportar',
  filename = 'reporte_cislatam.xlsx',
  variant = 'outline',
}: {
  label?: string
  filename?: string
  variant?: Variant
}) {
  const toast = useToast()
  const run = () => {
    const id = toast.loading('Generando archivo…', filename)
    setTimeout(() => toast.update(id, 'success', 'Exportación lista', `Se descargó ${filename}`), 1200)
  }
  return (
    <Button variant={variant} onClick={run}>
      <Download size={16} /> {label}
    </Button>
  )
}

/* ── Wrapper genérico: botón + FormDialog ── */
function FormAction({
  trigger,
  ...dialog
}: {
  trigger: (open: () => void) => ReactNode
} & Omit<Parameters<typeof FormDialog>[0], 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {trigger(() => setOpen(true))}
      <FormDialog open={open} onClose={() => setOpen(false)} {...dialog} />
    </>
  )
}

const PrimaryTrigger = (label: string, icon: ReactNode, variant: Variant = 'primary') =>
  (open: () => void) =>
    (
      <Button variant={variant} onClick={open}>
        {icon}
        {label}
      </Button>
    )

const employeeFields: FormField[] = [
  { name: 'nombre', label: 'Nombre completo', placeholder: 'Ej. María Fernanda López', full: true },
  { name: 'email', label: 'Correo corporativo', type: 'email', placeholder: 'nombre.apellido@cislatam.com' },
  { name: 'telefono', label: 'Teléfono', placeholder: '+591 70000000' },
  { name: 'puesto', label: 'Puesto', placeholder: 'Ej. Asesor Comercial' },
  { name: 'departamento', label: 'Departamento', type: 'select', options: deptOptions },
  { name: 'pais', label: 'País', type: 'select', options: countryOptions },
  { name: 'centroCosto', label: 'Centro de costo', placeholder: 'BO-DSP' },
  { name: 'ingreso', label: 'Fecha de ingreso', type: 'date' },
  { name: 'contrato', label: 'Tipo de contrato', type: 'select', options: ['Indefinido', 'Plazo fijo', 'Pasantía'].map(opt) },
]

export function NewEmployeeButton({ variant = 'primary', label = 'Nuevo empleado' }: { variant?: Variant; label?: string }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <UserPlus size={16} />, variant)}
      title="Dar de alta un empleado"
      description="Registra un nuevo colaborador en el sistema."
      icon={<UserPlus size={18} />}
      fields={employeeFields}
      submitLabel="Crear empleado"
      successTitle="Empleado creado"
      successDescription="El alta quedó registrada y se notificó a su supervisor."
      width={620}
    />
  )
}

export function NewLeaveButton({ label = 'Solicitar permiso' }: { label?: string }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <CalendarPlus size={16} />)}
      title="Solicitar permiso"
      description="Tu saldo se calcula automáticamente según el país."
      icon={<CalendarPlus size={18} />}
      fields={[
        {
          name: 'tipo',
          label: 'Tipo de permiso',
          type: 'select',
          full: true,
          options: ['Vacaciones', 'Enfermedad', 'Licencia con goce', 'Matrimonio', 'Cumpleaños', 'Home Office'].map(opt),
        },
        { name: 'desde', label: 'Desde', type: 'date' },
        { name: 'hasta', label: 'Hasta', type: 'date' },
        { name: 'comentario', label: 'Comentario', type: 'textarea', full: true, placeholder: 'Escribe un comentario opcional…' },
      ]}
      submitLabel="Enviar solicitud"
      successTitle="Solicitud enviada"
      successDescription="Tu permiso quedó pendiente de aprobación."
    />
  )
}

export function NewObjectiveButton({ label = 'Crear objetivo' }: { label?: string }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <Target size={16} />)}
      title="Crear objetivo (OKR)"
      description="Define un objetivo y sus resultados clave por trimestre."
      icon={<Target size={18} />}
      fields={[
        { name: 'nombre', label: 'Nombre del objetivo', full: true, placeholder: 'Ej. Plan de negocio cumplido' },
        { name: 'nivel', label: 'Nivel', type: 'select', options: ['Empresa', 'Área', 'Equipo'].map(opt) },
        { name: 'prioridad', label: 'Prioridad', type: 'select', options: ['Crítico', 'Alto', 'Medio', 'Bajo'].map(opt) },
        { name: 'owner', label: 'Responsable', placeholder: 'Ej. Fabián Di Gregorio' },
        { name: 'vencimiento', label: 'Vencimiento', type: 'date' },
      ]}
      submitLabel="Crear objetivo"
      successTitle="Objetivo creado"
      successDescription="Ya puedes añadirle resultados clave con desglose T1–T4."
    />
  )
}

export function NewCampaignButton({ label = 'Nueva campaña' }: { label?: string }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <ClipboardList size={16} />)}
      title="Nueva campaña de encuesta"
      description="Elige una plantilla — todas son editables."
      icon={<ClipboardList size={18} />}
      fields={[
        { name: 'nombre', label: 'Nombre de la campaña', full: true, placeholder: 'Ej. Clima CyC 2026 · S2' },
        { name: 'plantilla', label: 'Plantilla', type: 'select', options: ['eNPS', '6C (Cultura)', 'Bienestar', 'Pulso', 'Personalizada'].map(opt) },
        { name: 'vence', label: 'Fecha de cierre', type: 'date' },
        { name: 'anonimo', label: 'Anónima', type: 'select', options: ['Sí', 'No'].map(opt) },
        { name: 'sedes', label: 'Alcance', type: 'select', options: ['Todos los países', ...countryList.map((c) => c.nombre)].map(opt) },
      ]}
      submitLabel="Lanzar campaña"
      successTitle="Campaña creada"
      successDescription="Se enviará a los colaboradores del alcance seleccionado."
    />
  )
}

export function NewRoleButton({ label = 'Crear rol' }: { label?: string }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <ShieldCheck size={16} />)}
      title="Crear rol"
      description="Parte de un rol existente y ajusta permisos por módulo y campo."
      icon={<ShieldCheck size={18} />}
      fields={[
        { name: 'nombre', label: 'Nombre del rol', full: true, placeholder: 'Ej. Analista de Nómina Jr.' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', full: true, placeholder: 'Qué puede hacer este rol…' },
        { name: 'base', label: 'Basado en', type: 'select', full: true, options: roleOptions },
      ]}
      submitLabel="Crear rol"
      successTitle="Rol creado"
      successDescription="Configura sus permisos en la matriz."
    />
  )
}

export function RecognitionButton({ label = 'Dar reconocimiento', variant = 'primary' }: { label?: string; variant?: Variant }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <Heart size={16} />, variant)}
      title="Dar un reconocimiento"
      description="Reconoce a un colega con estrellas de valor."
      icon={<Heart size={18} />}
      fields={[
        { name: 'para', label: 'Para', full: true, placeholder: 'Nombre del colaborador' },
        { name: 'estrellas', label: 'Estrellas', type: 'select', options: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'].map((v, i) => ({ value: String(i + 1), label: v })) },
        { name: 'valor', label: 'Valor destacado', type: 'select', options: ['Colaboración', 'Excelencia', 'Compromiso', 'Innovación'].map(opt) },
        { name: 'mensaje', label: 'Mensaje', type: 'textarea', full: true, placeholder: 'Cuéntale por qué lo reconoces…' },
      ]}
      submitLabel="Enviar reconocimiento"
      successTitle="¡Reconocimiento enviado!"
      successDescription="Tu colega recibirá una notificación con tu mensaje."
    />
  )
}

export function ReportIssueButton({ label = 'Reportar', variant = 'outline' }: { label?: string; variant?: Variant }) {
  return (
    <FormAction
      trigger={PrimaryTrigger(label, <ShieldQuestion size={16} />, variant)}
      title="Reportar al canal seguro"
      description="Tu reporte es confidencial; el anonimato se respeta."
      icon={<ShieldQuestion size={18} />}
      fields={[
        {
          name: 'tipo',
          label: 'Tipo',
          type: 'select',
          full: true,
          options: ['Conflicto laboral', 'Acoso o intimidación', 'Sugerencia de mejora', 'Reconocimiento'].map(opt),
        },
        { name: 'titulo', label: 'Título', full: true, placeholder: 'Resume tu reporte' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', full: true, placeholder: 'Proporciona detalles claros y precisos…' },
        { name: 'fecha', label: 'Fecha del incidente', type: 'date' },
        { name: 'anonimo', label: 'Enviar como', type: 'select', options: ['Anónimo', 'Con mi nombre'].map(opt) },
      ]}
      submitLabel="Enviar reporte"
      successTitle="Reporte enviado"
      successDescription="Gracias por tu confianza. Lo revisará el equipo de CyC."
    />
  )
}
