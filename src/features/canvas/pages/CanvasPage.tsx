import { motion } from 'motion/react'
import {
  GraduationCap,
  BookOpen,
  CalendarClock,
  Megaphone,
  CheckCircle2,
  Circle,
  ArrowUpRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { cn } from '@/utils/cn'

const courses = [
  {
    id: 'cs301',
    code: 'CS-301',
    title: 'Estructuras de Datos',
    teacher: 'Prof. Méndez',
    progress: 72,
  },
  {
    id: 'ux210',
    code: 'UX-210',
    title: 'Diseño de Interfaces',
    teacher: 'Prof. Salas',
    progress: 54,
  },
  {
    id: 'net120',
    code: 'NET-120',
    title: 'Redes y Protocolos',
    teacher: 'Prof. Ortega',
    progress: 38,
  },
] as const

const assignments = [
  {
    id: 'a1',
    course: 'CS-301',
    title: 'Lab 4 · Árboles AVL',
    due: 'Hoy · 23:59',
    done: false,
  },
  {
    id: 'a2',
    course: 'UX-210',
    title: 'Critique de wireframes',
    due: 'Mañana · 18:00',
    done: false,
  },
  {
    id: 'a3',
    course: 'NET-120',
    title: 'Quiz TCP/UDP',
    due: 'Vie · 12:00',
    done: true,
  },
  {
    id: 'a4',
    course: 'CS-301',
    title: 'Reading · Graph traversal',
    due: 'Lun · 09:00',
    done: false,
  },
] as const

const announcements = [
  {
    id: 'n1',
    course: 'UX-210',
    title: 'Sesión de feedback movida a Zoom',
    time: 'hace 2 h',
  },
  {
    id: 'n2',
    course: 'CS-301',
    title: 'Rubrica del Lab 4 publicada',
    time: 'hace 5 h',
  },
  {
    id: 'n3',
    course: 'NET-120',
    title: 'Material extra de Wireshark',
    time: 'Ayer',
  },
] as const

export function CanvasPage() {
  return (
    <div data-module="canvas" className="space-y-8">
      <PageHeader
        title="Canvas LMS"
        description="Cursos, entregas y anuncios en Hubify. Cada usuario conectará su propia API Key — nunca embebida en el proyecto."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="default">Sin conectar</Badge>
            <Button variant="secondary" size="sm" disabled>
              Conectar API Key
            </Button>
          </div>
        }
      />

      {/* Hero strip */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--module-canvas)_18%,transparent),transparent_55%)]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[var(--module-canvas)]">
              <GraduationCap className="h-4 w-4" aria-hidden />
              <span className="text-xs font-medium tracking-wide uppercase">
                Semestre actual
              </span>
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Tu carga académica, en un módulo.
            </h2>
            <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
              Vista simulada con cursos, deadlines y anuncios. La estructura ya
              está lista para mapear endpoints de Canvas.
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--module-canvas)] text-white shadow-[var(--shadow-sm)]">
            <BookOpen className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </motion.section>

      {/* Courses */}
      <section aria-labelledby="courses-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2
            id="courses-heading"
            className="font-display text-lg font-semibold tracking-tight"
          >
            Cursos
          </h2>
          <span className="text-xs text-[var(--foreground-subtle)]">Mock</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * index, duration: 0.3 }}
              className="group rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--module-canvas)_40%,var(--border))]"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <Badge
                  variant="default"
                  className="border-[color-mix(in_srgb,var(--module-canvas)_30%,var(--border))] text-[var(--module-canvas)]"
                >
                  {course.code}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-[var(--foreground-subtle)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                {course.teacher}
              </p>
              <div className="mt-5 space-y-2" aria-hidden>
                <div className="flex justify-between text-xs text-[var(--foreground-subtle)]">
                  <span>Progreso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--module-canvas)]"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Assignments */}
        <motion.section
          aria-labelledby="assignments-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-[var(--module-canvas)]" />
            <h2
              id="assignments-heading"
              className="font-display text-base font-semibold"
            >
              Entregas
            </h2>
          </div>
          <ul className="space-y-2">
            {assignments.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-3',
                  item.done && 'opacity-60',
                )}
              >
                {item.done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground-subtle)]" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">
                    {item.course} · {item.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Announcements */}
        <motion.section
          aria-labelledby="announcements-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-[var(--module-canvas)]" />
            <h2
              id="announcements-heading"
              className="font-display text-base font-semibold"
            >
              Anuncios
            </h2>
          </div>
          <ul className="space-y-3">
            {announcements.map((item) => (
              <li
                key={item.id}
                className="border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                  {item.course} · {item.time}
                </p>
              </li>
            ))}
          </ul>

          <aside className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--module-canvas)_6%,var(--surface))] p-4">
            <p className="text-sm font-medium">Listo para API Key del usuario</p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              Cursos, assignments y announcements ya tienen forma de dominios
              tipados. En el siguiente sprint solo se conectan adapters.
            </p>
          </aside>
        </motion.section>
      </div>
    </div>
  )
}
