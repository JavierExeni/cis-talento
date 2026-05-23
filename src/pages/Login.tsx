import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'
import { Brand } from '@/components/Brand'
import { useToast } from '@/components/ui/toast'
import { container, fadeUp, easeOut } from '@/lib/motion'

export function Login() {
  const navigate = useNavigate()
  const toast = useToast()

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-line bg-panel p-12 lg:flex">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute right-0 bottom-0 size-[22rem] rounded-full bg-info/10 blur-[120px]" />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
          <Brand size={34} />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={container} className="relative max-w-md">
          <motion.span variants={fadeUp} className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            Talento · Recursos Humanos
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-fg">
            Una sola plataforma para todo tu <span className="text-gradient-gold">capital humano</span> en LATAM.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-relaxed text-muted">
            Empleados, permisos, nómina, desempeño y OKRs — con permisos granulares de verdad y
            la información de tus 4 países en un mismo lugar.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative flex gap-8"
        >
          {[
            ['312', 'Colaboradores'],
            ['4', 'Países'],
            ['99.9%', 'Disponibilidad'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-2xl font-semibold text-fg">{v}</p>
              <p className="text-[12px] text-faint">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Form */}
      <div className="relative flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-40 lg:hidden" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="relative w-full max-w-sm"
        >
          <div className="mb-8 lg:hidden">
            <Brand size={32} />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-fg">Bienvenido de nuevo</h2>
          <p className="mt-1.5 text-sm text-muted">Ingresa con tu cuenta corporativa CIS LATAM.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/')
            }}
            className="mt-8 space-y-4"
          >
            <Field icon={<Mail size={16} />} label="Correo corporativo">
              <input
                type="email"
                defaultValue="edgar.loayza@cislatam.com"
                className="w-full bg-transparent text-sm text-fg placeholder:text-faint focus:outline-none"
              />
            </Field>
            <Field icon={<Lock size={16} />} label="Contraseña">
              <input
                type="password"
                defaultValue="••••••••••"
                className="w-full bg-transparent text-sm text-fg placeholder:text-faint focus:outline-none"
              />
            </Field>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" defaultChecked className="accent-accent" /> Recordarme
              </label>
              <button
                type="button"
                onClick={() => toast.info('Recuperar contraseña', 'Te enviaremos un enlace a tu correo corporativo.')}
                className="text-accent hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent font-semibold text-black transition-all hover:bg-[#ffc04d] active:bg-accent-deep"
            >
              Ingresar
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-line bg-card px-3.5 py-3">
            <ShieldCheck size={16} className="shrink-0 text-success" />
            <p className="text-[12.5px] text-muted">
              Acceso protegido con verificación en dos pasos (2FA) opcional y SSO.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-muted">{label}</span>
      <div className="flex items-center gap-2.5 rounded-lg border border-line bg-card px-3.5 py-3 transition-colors focus-within:border-accent/60">
        <span className="text-faint">{icon}</span>
        {children}
      </div>
    </label>
  )
}
