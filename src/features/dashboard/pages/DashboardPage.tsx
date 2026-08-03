import { Link } from 'react-router-dom'
import {
  Music2,
  MessageCircle,
  GraduationCap,
  CheckSquare,
  CalendarDays,
  Bell,
  Activity,
  ArrowUpRight,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Container'
import { ROUTES } from '@/constants'

const modules = [
  {
    title: 'Spotify',
    description: 'Reproduce, explora y sincroniza tu música.',
    path: ROUTES.spotify,
    icon: Music2,
    status: 'Próximamente',
  },
  {
    title: 'Instagram',
    description: 'Publicaciones, stories e insights en un módulo.',
    path: ROUTES.instagram,
    icon: FaInstagram,
    status: 'Próximamente',
  },
  {
    title: 'WhatsApp',
    description: 'Conversaciones y contactos desde Hubify.',
    path: ROUTES.whatsapp,
    icon: MessageCircle,
    status: 'Próximamente',
  },
  {
    title: 'Canvas LMS',
    description: 'Cursos, tareas y calendario académico.',
    path: ROUTES.canvas,
    icon: GraduationCap,
    status: 'Próximamente',
  },
  {
    title: 'Todos',
    description: 'Tareas y prioridades en un solo flujo.',
    path: ROUTES.todos,
    icon: CheckSquare,
    status: 'Vista previa',
  },
  {
    title: 'Calendario',
    description: 'Agenda unificada de todos tus módulos.',
    path: ROUTES.calendar,
    icon: CalendarDays,
    status: 'Vista previa',
  },
] as const

const activity = [
  'Spotify se conectará mediante OAuth del usuario',
  'Canvas usará API Keys personales — nunca embebidas',
  'El tema dinámico tomará colores de portadas de álbum',
  'Cada integración vivirá como feature modular independiente',
]

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Centro de control"
        description="Hubify no es un dashboard genérico: es tu plataforma para conectar y operar módulos digitales desde una sola experiencia."
        actions={<Badge variant="accent">Sprint F1.0 · Visual</Badge>}
      />

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="relative overflow-hidden bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_12%,var(--surface)),var(--surface))]">
          <div className="relative z-10 max-w-xl space-y-3">
            <Badge>Plataforma</Badge>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Un hub modular, listo para crecer.
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] sm:text-base">
              Esta vista es la base visual. Las integraciones, autenticación y
              datos reales llegarán en sprints posteriores sin rediseñar la
              interfaz.
            </p>
          </div>
          <div
            className="pointer-events-none absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] blur-3xl"
            aria-hidden
          />
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[var(--accent)]" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
          </CardHeader>
          <CardDescription>
            Sin eventos todavía. Cuando conectes módulos, verás alertas aquí.
          </CardDescription>
        </Card>
      </div>

      <Section className="mb-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Módulos</h2>
          <span className="text-xs text-[var(--foreground-subtle)]">
            Solo diseño · sin datos
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link key={module.path} to={module.path} className="group block">
                <Card interactive className="h-full">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-muted)] text-[var(--accent-hover)] transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <Badge variant="default">{module.status}</Badge>
                  </CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {module.description}
                      </CardDescription>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--foreground-subtle)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section>
        <div className="mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-[var(--accent)]" />
          <h2 className="font-display text-lg font-semibold">Actividad reciente</h2>
        </div>
        <Card className="space-y-3">
          {activity.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <p className="text-sm text-[var(--foreground-muted)]">{item}</p>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  )
}
