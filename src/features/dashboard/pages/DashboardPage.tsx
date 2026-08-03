import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Music2,
  ArrowUpRight,
  Sparkles,
  Link2,
  Waves,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { ROUTES } from '@/constants'
import { cn } from '@/utils/cn'

const featured = [
  {
    title: 'Spotify',
    path: ROUTES.spotify,
    eyebrow: 'Música',
    description:
      'Escucha, explora y deja que la portada del álbum pinte toda la plataforma.',
    icon: Music2,
    tone: 'spotify',
  },
  {
    title: 'Instagram',
    path: ROUTES.instagram,
    eyebrow: 'Social',
    description:
      'Stories, feed e insights en un módulo limpio, sin salir de Hubify.',
    icon: FaInstagram,
    tone: 'instagram',
  },
] as const

const upcoming = [
  { title: 'WhatsApp', hint: 'Mensajería' },
  { title: 'Canvas', hint: 'Académico' },
  { title: 'Todos', hint: 'Productividad' },
  { title: 'Calendario', hint: 'Agenda' },
] as const

export function DashboardPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Tu plataforma"
        description="Hubify concentra tus servicios en módulos independientes. Empieza por música y social — el resto se conecta después."
        actions={
          <Badge variant="accent" className="gap-1.5">
            <Sparkles className="h-3 w-3" aria-hidden />
            Visual F1.0
          </Badge>
        }
      />

      {/* Featured modules — primary composition */}
      <section aria-labelledby="featured-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2
            id="featured-heading"
            className="font-display text-lg font-semibold tracking-tight"
          >
            Módulos activos
          </h2>
          <p className="text-xs text-[var(--foreground-subtle)]">
            Diseño listo · sin datos reales
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((module, index) => {
            const Icon = module.icon
            return (
              <motion.div
                key={module.path}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
              >
                <Link
                  to={module.path}
                  className={cn(
                    'group relative block overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] sm:p-7',
                    module.tone === 'spotify' && 'bg-[var(--surface)]',
                    module.tone === 'instagram' && 'bg-[var(--surface)]',
                  )}
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 opacity-90',
                      module.tone === 'spotify' &&
                        'bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--module-spotify)_22%,transparent),transparent_55%)]',
                      module.tone === 'instagram' &&
                        'bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--module-instagram)_20%,transparent),transparent_55%)]',
                    )}
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col gap-6">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-sm)] transition-transform duration-300 group-hover:scale-105',
                          module.tone === 'spotify' &&
                            'bg-[var(--module-spotify)]',
                          module.tone === 'instagram' &&
                            'bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))]',
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-[var(--foreground-subtle)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
                        {module.eyebrow}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {module.title}
                      </h3>
                      <p className="max-w-sm text-sm leading-relaxed text-[var(--foreground-muted)]">
                        {module.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <Badge variant="default">Sin conectar</Badge>
                      <span className="text-xs text-[var(--foreground-subtle)]">
                        OAuth del usuario
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Platform strip */}
      <section
        aria-labelledby="hub-heading"
        className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.35 }}
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
        >
          <div className="relative z-10 max-w-lg space-y-4">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <Waves className="h-4 w-4" aria-hidden />
              <span className="text-xs font-medium tracking-wide uppercase">
                Hubify
              </span>
            </div>
            <h2
              id="hub-heading"
              className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Un solo lugar. Muchos servicios.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
              Cada integración es un módulo con la misma arquitectura. Tú
              conectas tus cuentas; Hubify nunca embebe API Keys en el código.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="primary" disabled>
                <Link2 className="h-4 w-4" aria-hidden />
                Conectar módulos
              </Button>
              <Button variant="ghost" disabled>
                Ver arquitectura
              </Button>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -right-8 -bottom-12 h-44 w-44 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl"
            aria-hidden
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <h2 className="font-display mb-4 text-base font-semibold">
            Próximos módulos
          </h2>
          <ul className="space-y-3">
            {upcoming.map((item) => (
              <li
                key={item.title}
                className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {item.title}
                </span>
                <span className="text-xs text-[var(--foreground-subtle)]">
                  {item.hint}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  )
}
