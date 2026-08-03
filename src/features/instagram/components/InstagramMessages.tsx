import { useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { IG_MESSAGES } from '@/features/instagram/data/mockInstagram'
import { cn } from '@/utils/cn'

const thread = [
  { id: 't1', from: 'them' as const, text: '¿Te gustó el set de hoy?' },
  { id: 't2', from: 'me' as const, text: 'Sí, quedó brutal. El drop del medio 🔥' },
  { id: 't3', from: 'them' as const, text: 'Te mando el link del set completo' },
  { id: 't4', from: 'me' as const, text: 'Dale, lo reviso esta noche' },
]

export function InstagramMessages() {
  const [activeId, setActiveId] = useState(IG_MESSAGES[0].id)
  const active = IG_MESSAGES.find((m) => m.id === activeId) ?? IG_MESSAGES[0]
  const unread = IG_MESSAGES.filter((m) => m.unread).length

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] lg:flex-row">
      <aside className="flex min-h-0 w-full flex-col border-b border-[var(--border)] lg:w-80 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div>
            <h2 className="font-display text-sm font-semibold">Mensajes</h2>
            <p className="text-xs text-[var(--foreground-muted)]">Mock · DMs</p>
          </div>
          {unread > 0 ? (
            <Badge
              variant="accent"
              className="bg-[color-mix(in_srgb,var(--module-instagram-to)_18%,transparent)] text-[var(--module-instagram-to)]"
            >
              {unread} sin leer
            </Badge>
          ) : null}
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto" role="listbox">
          {IG_MESSAGES.map((message) => {
            const selected = message.id === activeId
            return (
              <li key={message.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setActiveId(message.id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                    selected
                      ? 'bg-[color-mix(in_srgb,var(--module-instagram-to)_10%,transparent)]'
                      : 'hover:bg-[var(--surface-muted)]',
                  )}
                >
                  <Avatar fallback={message.from.slice(0, 2)} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          'truncate text-sm',
                          message.unread ? 'font-semibold' : 'font-medium',
                        )}
                      >
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
                  {message.unread ? (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--module-instagram-to)]" />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      <section className="relative flex min-h-[18rem] flex-1 flex-col lg:min-h-0">
        <header className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <Avatar fallback={active.from.slice(0, 2)} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{active.from}</p>
            <p className="text-xs text-[var(--foreground-muted)]">
              Activo · simulado
            </p>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-5">
          {thread.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2 text-sm sm:max-w-[70%]',
                msg.from === 'me'
                  ? 'ml-auto rounded-br-md bg-[color-mix(in_srgb,var(--module-instagram-to)_18%,var(--surface-muted))]'
                  : 'rounded-bl-md border border-[var(--border)] bg-[var(--surface)]',
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <footer className="flex items-center gap-2 border-t border-[var(--border)] px-3 py-3">
          <input
            type="text"
            placeholder="Mensaje…"
            aria-label="Mensaje"
            disabled
            className="h-10 flex-1 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm outline-none"
          />
          <button
            type="button"
            disabled
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] text-white opacity-60"
            aria-label="Enviar"
          >
            <Send className="h-4 w-4" />
          </button>
        </footer>
      </section>
    </div>
  )
}
