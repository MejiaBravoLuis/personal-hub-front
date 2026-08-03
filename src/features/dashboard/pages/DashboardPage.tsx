import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Music2,
  Play,
  Pause,
  ArrowUpRight,
  Bell,
  GraduationCap,
  CalendarClock,
  MessageCircle,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  dashboardCanvas,
  dashboardInstagram,
  dashboardReminders,
  dashboardSpotify,
} from '@/features/dashboard/data/mockDashboard'
import { cn } from '@/utils/cn'

export function DashboardPage() {
  const [isPlaying, setIsPlaying] = useState(dashboardSpotify.isPlaying)
  const track = dashboardSpotify.track

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tu plataforma"
        description="Resumen en vivo de tus módulos. Todo es mock visual — listo para conectar datos reales después."
        actions={<Badge variant="accent">Solo lectura · F1.0</Badge>}
      />

      {/* Spotify + Instagram */}
      <section
        aria-label="Música y social"
        className="grid gap-4 lg:grid-cols-2"
      >
        {/* Spotify — now playing / resume */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--module-spotify)_20%,transparent),transparent_55%)]"
            aria-hidden
          />

          <div className="relative flex h-full flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--module-spotify)] text-white">
                  <Music2 className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[var(--module-spotify)] uppercase">
                    Spotify
                  </p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {isPlaying ? 'Reproduciendo ahora' : 'Reanudar'}
                  </p>
                </div>
              </div>
              <Link
                to={dashboardSpotify.path}
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
              >
                Abrir
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="h-20 w-20 shrink-0 rounded-[var(--radius-md)] shadow-[var(--shadow-md)] sm:h-24 sm:w-24"
                style={{
                  background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})`,
                }}
                aria-hidden
              />
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h3 className="font-display truncate text-xl font-semibold tracking-tight">
                    {track.title}
                  </h3>
                  <p className="truncate text-sm text-[var(--foreground-muted)]">
                    {track.artist} · {track.album}
                  </p>
                </div>

                <div className="space-y-1.5" aria-hidden>
                  <div className="h-1 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                    <div
                      className="h-full rounded-full bg-[var(--module-spotify)] transition-[width] duration-500"
                      style={{ width: `${track.progress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[var(--foreground-subtle)]">
                    <span>{isPlaying ? 'En curso' : 'Pausado'}</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2">
              <Button
                size="sm"
                className="rounded-full bg-[var(--module-spotify)] text-white hover:bg-[var(--module-spotify)] hover:opacity-90"
                onClick={() => setIsPlaying((value) => !value)}
                aria-label={isPlaying ? 'Pausar' : 'Reanudar reproducción'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 fill-current" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    Reanudar
                  </>
                )}
              </Button>
              <Badge variant="default">Mock</Badge>
            </div>
          </div>
        </motion.article>

        {/* Instagram — unread messages */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.35 }}
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--module-instagram-from)_16%,transparent),transparent_55%)]"
            aria-hidden
          />

          <div className="relative flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] text-white">
                  <FaInstagram className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
                    Instagram
                  </p>
                  <p className="text-sm font-semibold">Mensajes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="accent"
                  className="bg-[color-mix(in_srgb,var(--module-instagram-to)_18%,transparent)] text-[var(--module-instagram-to)]"
                >
                  {dashboardInstagram.unreadCount} sin leer
                </Badge>
                <Link
                  to={dashboardInstagram.path}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Abrir
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>

            <ul className="space-y-1">
              {dashboardInstagram.messages.map((message) => (
                <li key={message.id}>
                  <Link
                    to={dashboardInstagram.path}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 transition-colors hover:bg-[var(--surface-muted)]"
                  >
                    <Avatar fallback={message.from.slice(0, 2)} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">
                          {message.from}
                        </p>
                        <span className="shrink-0 text-[11px] text-[var(--foreground-subtle)]">
                          {message.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-[var(--foreground-muted)]">
                        {message.preview}
                      </p>
                    </div>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-[var(--module-instagram-to)]"
                      aria-label="Sin leer"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-auto flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)]">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Vista previa · sin OAuth
            </p>
          </div>
        </motion.article>
      </section>

      {/* Reminders + Canvas tasks */}
      <section
        aria-label="Recordatorios y Canvas"
        className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Reminders — read only */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[var(--accent)]" />
              <h2 className="font-display text-base font-semibold">
                Recordatorios
              </h2>
            </div>
            <Badge variant="default">Solo lectura</Badge>
          </div>

          <ul className="space-y-2">
            {dashboardReminders.map((reminder) => (
              <li
                key={reminder.id}
                className="rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-3"
              >
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {reminder.title}
                </p>
                <div className="mt-1 flex items-center justify-between gap-2 text-xs text-[var(--foreground-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" aria-hidden />
                    {reminder.when}
                  </span>
                  <span>{reminder.source}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-[var(--foreground-subtle)]">
            Sin edición en este sprint. Solo muestra lo pendiente.
          </p>
        </motion.article>

        {/* Canvas preview → tasks */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,color-mix(in_srgb,var(--module-canvas)_14%,transparent),transparent_50%)]"
            aria-hidden
          />

          <div className="relative">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--module-canvas)] text-white">
                  <GraduationCap className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[var(--module-canvas)] uppercase">
                    Canvas
                  </p>
                  <h2 className="font-display text-base font-semibold">
                    Tareas próximas
                  </h2>
                </div>
              </div>
              <Link
                to={dashboardCanvas.path}
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
              >
                Ver curso
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              {dashboardCanvas.course}
            </p>

            <ul className="space-y-2">
              {dashboardCanvas.tasks.map((task) => (
                <li
                  key={task.id}
                  className={cn(
                    'flex items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3 py-3',
                    task.urgent
                      ? 'border-[color-mix(in_srgb,var(--module-canvas)_40%,var(--border))] bg-[color-mix(in_srgb,var(--module-canvas)_6%,transparent)]'
                      : 'border-[var(--border)]',
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{task.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">
                      Entrega · {task.due}
                    </p>
                  </div>
                  {task.urgent ? (
                    <Badge
                      variant="danger"
                      className="shrink-0"
                    >
                      Hoy
                    </Badge>
                  ) : (
                    <Badge variant="default" className="shrink-0">
                      Pendiente
                    </Badge>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
              <p className="text-xs text-[var(--foreground-subtle)]">
                Preview conectada a entregas del módulo Canvas
              </p>
              <Link
                to={dashboardCanvas.path}
                className="inline-flex h-8 items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
              >
                Abrir Canvas
              </Link>
            </div>
          </div>
        </motion.article>
      </section>
    </div>
  )
}
