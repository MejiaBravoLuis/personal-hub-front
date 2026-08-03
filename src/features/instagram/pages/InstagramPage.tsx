import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  InstagramNav,
  InstagramNavToggle,
} from '@/features/instagram/components/InstagramNav'
import { InstagramHome } from '@/features/instagram/components/InstagramHome'
import { InstagramSearch } from '@/features/instagram/components/InstagramSearch'
import { InstagramMessages } from '@/features/instagram/components/InstagramMessages'
import { InstagramProfile } from '@/features/instagram/components/InstagramProfile'
import {
  IG_MESSAGES,
  type InstagramView,
} from '@/features/instagram/data/mockInstagram'
import { cn } from '@/utils/cn'

const NAV_STORAGE_KEY = 'hubify-instagram-nav-open'

const mobileTabs: { id: InstagramView; label: string }[] = [
  { id: 'home', label: 'Inicio' },
  { id: 'search', label: 'Buscar' },
  { id: 'messages', label: 'Msgs' },
  { id: 'profile', label: 'Perfil' },
]

function readNavOpen() {
  const stored = localStorage.getItem(NAV_STORAGE_KEY)
  if (stored === null) return true
  return stored === 'true'
}

export function InstagramPage() {
  const [view, setView] = useState<InstagramView>('home')
  const [navOpen, setNavOpen] = useState(() =>
    typeof window === 'undefined' ? true : readNavOpen(),
  )

  const unread = IG_MESSAGES.filter((m) => m.unread).length

  const toggleNav = () => {
    setNavOpen((open) => {
      const next = !open
      localStorage.setItem(NAV_STORAGE_KEY, String(next))
      return next
    })
  }

  return (
    <div
      data-module="instagram"
      className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row lg:gap-3"
    >
      <InstagramNav
        view={view}
        onChange={setView}
        unreadCount={unread}
        open={navOpen}
        onToggle={toggleNav}
      />

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--module-instagram-from) 14%, transparent), transparent 50%),
              radial-gradient(ellipse at 100% 0%, color-mix(in srgb, var(--module-instagram-to) 12%, transparent), transparent 45%)
            `,
          }}
          aria-hidden
        />

        <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <InstagramNavToggle open={navOpen} onToggle={toggleNav} />
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-[var(--module-instagram-to)] uppercase">
                Instagram
              </p>
              <p className="truncate text-sm text-[var(--foreground-muted)]">
                {view === 'home' && 'Feed y stories'}
                {view === 'search' && 'Explorar y buscar'}
                {view === 'messages' && 'Mensajes directos'}
                {view === 'profile' && 'Tu perfil mock'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unread > 0 ? (
              <Badge
                variant="accent"
                className="bg-[color-mix(in_srgb,var(--module-instagram-to)_18%,transparent)] text-[var(--module-instagram-to)]"
              >
                {unread} msgs
              </Badge>
            ) : null}
            <Button variant="secondary" size="sm" disabled>
              Conectar
            </Button>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="relative z-10 border-b border-[var(--border)] px-2 py-2 lg:hidden">
          <div
            role="tablist"
            aria-label="Vistas Instagram"
            className="flex gap-1 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] p-1"
          >
            {mobileTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={view === tab.id}
                onClick={() => setView(tab.id)}
                className={cn(
                  'relative flex-1 rounded-[var(--radius-full)] px-2 py-1.5 text-xs font-medium transition-colors',
                  view === tab.id
                    ? 'bg-[var(--surface)] text-[var(--foreground)] shadow-[var(--shadow-sm)]'
                    : 'text-[var(--foreground-muted)]',
                )}
              >
                {tab.label}
                {tab.id === 'messages' && unread > 0 ? (
                  <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--module-instagram-to)] px-1 text-[9px] text-white">
                    {unread}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            'relative z-10 min-h-0 flex-1 p-2 sm:p-3',
            view === 'messages' ? 'overflow-hidden' : 'overflow-y-auto',
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              className={cn('h-full', view === 'messages' && 'min-h-0')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'home' ? <InstagramHome /> : null}
              {view === 'search' ? <InstagramSearch /> : null}
              {view === 'messages' ? <InstagramMessages /> : null}
              {view === 'profile' ? <InstagramProfile /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
