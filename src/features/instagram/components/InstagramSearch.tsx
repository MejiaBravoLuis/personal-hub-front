import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import {
  IG_EXPLORE,
  IG_FEED,
  toneGradient,
} from '@/features/instagram/data/mockInstagram'

export function InstagramSearch() {
  const [query, setQuery] = useState('')

  const people = useMemo(() => {
    const q = query.trim().toLowerCase()
    const users = [...new Set(IG_FEED.map((post) => post.user))]
    if (!q) return users
    return users.filter((user) => user.toLowerCase().includes(q))
  }, [query])

  const tiles = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return IG_EXPLORE
    return IG_EXPLORE.filter((item) => item.label.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-1 sm:p-2">
      <div className="relative shrink-0">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--foreground-subtle)]"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar"
          aria-label="Buscar en Instagram"
          className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] pr-9 pl-9 text-sm outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--module-instagram-to)] focus:ring-2 focus:ring-[var(--module-instagram-to)]/20"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--foreground-subtle)]"
            aria-label="Limpiar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {query.trim() ? (
        <section aria-label="Personas" className="shrink-0 space-y-2">
          <h2 className="px-1 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
            Personas
          </h2>
          {people.length === 0 ? (
            <p className="px-1 text-sm text-[var(--foreground-muted)]">
              Sin resultados
            </p>
          ) : (
            <ul className="space-y-1">
              {people.map((user) => (
                <li key={user}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left hover:bg-[var(--surface-muted)]"
                  >
                    <Avatar fallback={user.slice(0, 2)} size="sm" />
                    <span className="text-sm font-medium">{user}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <section aria-label="Explorar" className="min-h-0 flex-1 overflow-y-auto">
        <h2 className="mb-2 px-1 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
          Explorar
        </h2>
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
          {tiles.map((item, index) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-[var(--radius-sm)]"
              style={{ background: toneGradient(item.tone) }}
            >
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-2 py-1.5 text-[10px] font-medium text-white sm:text-xs">
                {item.label}
                {index % 4 === 0 ? ' · Reel' : ''}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
