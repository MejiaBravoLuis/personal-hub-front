import {
  Home,
  Search,
  MessageCircle,
  UserRound,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import type { InstagramView } from '@/features/instagram/data/mockInstagram'
import { cn } from '@/utils/cn'

const items: {
  id: InstagramView
  label: string
  icon: typeof Home
  badge?: number
}[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'search', label: 'Buscar', icon: Search },
  { id: 'messages', label: 'Mensajes', icon: MessageCircle },
  { id: 'profile', label: 'Perfil', icon: UserRound },
]

type InstagramNavProps = {
  view: InstagramView
  onChange: (view: InstagramView) => void
  unreadCount: number
  open: boolean
  onToggle: () => void
}

export function InstagramNav({
  view,
  onChange,
  unreadCount,
  open,
  onToggle,
}: InstagramNavProps) {
  return (
    <aside
      className={cn(
        'hidden h-full min-h-0 flex-col overflow-hidden transition-[width,opacity] duration-300 ease-out lg:flex',
        open ? 'w-56 opacity-100 xl:w-60' : 'w-0 opacity-0',
      )}
    >
      <div className="flex h-full w-56 flex-col gap-2 xl:w-60">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="mb-3 flex items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] text-white">
                <FaInstagram className="h-4 w-4" aria-hidden />
              </div>
              <span className="font-display text-sm font-semibold">Instagram</span>
            </div>
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              aria-label="Ocultar navegación"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <nav aria-label="Navegación Instagram">
            <ul className="space-y-0.5">
              {items.map((item) => {
                const Icon = item.icon
                const active = view === item.id
                const badge =
                  item.id === 'messages' && unreadCount > 0 ? unreadCount : 0

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onChange(item.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors',
                        active
                          ? 'bg-[color-mix(in_srgb,var(--module-instagram-to)_12%,transparent)] text-[var(--foreground)]'
                          : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]',
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      <span className="flex-1 text-left">{item.label}</span>
                      {badge > 0 ? (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--module-instagram-to)] px-1.5 text-[10px] font-semibold text-white">
                          {badge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex-1 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)]/60 p-4">
          <p className="text-xs font-medium text-[var(--foreground-muted)]">
            Sin conectar
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--foreground-subtle)]">
            OAuth del usuario después. Nunca keys en el repo.
          </p>
        </div>
      </div>
    </aside>
  )
}

export function InstagramNavToggle({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] lg:inline-flex"
      aria-label={open ? 'Ocultar navegación' : 'Mostrar navegación'}
      aria-expanded={open}
    >
      {open ? (
        <PanelLeftClose className="h-4 w-4" />
      ) : (
        <PanelLeftOpen className="h-4 w-4" />
      )}
    </button>
  )
}
