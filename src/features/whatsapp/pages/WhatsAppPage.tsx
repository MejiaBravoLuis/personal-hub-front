import { useState } from 'react'
import { motion } from 'motion/react'
import {
  MessageCircle,
  Search,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { CensoredModule } from '@/components/common/CensoredModule'
import { useModuleLocks } from '@/features/integrations/hooks/useModuleLocks'
import { cn } from '@/utils/cn'

const chats = [
  {
    id: '1',
    name: 'Ana Rivera',
    preview: '¿Nos vemos en el lab a las 5?',
    time: '14:22',
    unread: 2,
  },
  {
    id: '2',
    name: 'Equipo Hubify',
    preview: 'Diego: El mock del dock quedó bien',
    time: '13:05',
    unread: 0,
  },
  {
    id: '3',
    name: 'Luis Ortega',
    preview: 'Te pasé el link del repo',
    time: 'Ayer',
    unread: 0,
  },
  {
    id: '4',
    name: 'Mamá',
    preview: '¿Comiste?',
    time: 'Ayer',
    unread: 1,
  },
  {
    id: '5',
    name: 'Diseño · Sync',
    preview: 'Nueva iteración del feed',
    time: 'Lun',
    unread: 0,
  },
  {
    id: '6',
    name: 'Carlos Ruiz',
    preview: 'Ok, gracias',
    time: 'Dom',
    unread: 0,
  },
] as const

const thread = [
  { id: 'm1', from: 'them', text: 'Oye, ¿ya viste el brief del sprint?' },
  { id: 'm2', from: 'me', text: 'Sí, lo revisé esta mañana.' },
  {
    id: 'm3',
    from: 'them',
    text: 'Perfecto. Entonces dejamos WhatsApp solo visual por ahora.',
  },
  {
    id: 'm4',
    from: 'me',
    text: 'Exacto — sin API. Solo la experiencia del módulo.',
  },
  { id: 'm5', from: 'them', text: '¿Nos vemos en el lab a las 5?' },
  {
    id: 'm6',
    from: 'me',
    text: 'Dale, ahí nos vemos. Llevo la laptop.',
  },
] as const

export function WhatsAppPage() {
  const [activeId, setActiveId] = useState<string>(chats[0].id)
  const activeChat = chats.find((chat) => chat.id === activeId) ?? chats[0]
  const { locks, isLoading } = useModuleLocks()

  return (
    <CensoredModule
      locked={locks.whatsapp}
      loading={isLoading}
      title="WhatsApp bloqueado"
      description="Este módulo se activará cuando conectemos la API de WhatsApp."
      accent="var(--module-whatsapp)"
      className="flex min-h-0 flex-1 flex-col rounded-[var(--radius-xl)]"
    >
    <div
      data-module="whatsapp"
      className="flex min-h-0 flex-1 flex-col gap-2"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 px-1 sm:px-2">
        <div className="min-w-0">
          <h1 className="font-display truncate text-lg font-semibold tracking-tight sm:text-xl">
            WhatsApp
          </h1>
          <p className="truncate text-xs text-[var(--foreground-muted)] sm:text-sm">
            Módulo a pantalla completa · mock sin API
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="default" className="hidden sm:inline-flex">
            Sin conectar
          </Badge>
          <Button variant="secondary" size="sm" disabled>
            Conectar
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]"
      >
        <div className="grid min-h-0 flex-1 lg:grid-cols-[22rem_1fr]">
          {/* Chat list */}
          <aside className="flex min-h-0 flex-col border-b border-[var(--border)] lg:border-r lg:border-b-0">
            <div className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--module-whatsapp)] text-white">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Chats</p>
                <p className="text-xs text-[var(--foreground-muted)]">Mock</p>
              </div>
            </div>

            <div className="shrink-0 border-b border-[var(--border)] px-3 py-2">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--foreground-subtle)]"
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Buscar o empezar chat"
                  aria-label="Buscar chats"
                  className="h-9 w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] pr-3 pl-9 text-sm outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--module-whatsapp)] focus:ring-2 focus:ring-[var(--module-whatsapp)]/20"
                  disabled
                />
              </div>
            </div>

            <ul
              className="min-h-0 flex-1 overflow-y-auto"
              role="listbox"
              aria-label="Conversaciones"
            >
              {chats.map((chat) => {
                const active = chat.id === activeId
                return (
                  <li key={chat.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => setActiveId(chat.id)}
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                        active
                          ? 'bg-[color-mix(in_srgb,var(--module-whatsapp)_10%,transparent)]'
                          : 'hover:bg-[var(--surface-muted)]',
                      )}
                    >
                      <Avatar fallback={chat.name.slice(0, 2)} size="md" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {chat.name}
                          </p>
                          <span className="shrink-0 text-[11px] text-[var(--foreground-subtle)]">
                            {chat.time}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <p className="truncate text-xs text-[var(--foreground-muted)]">
                            {chat.preview}
                          </p>
                          {chat.unread > 0 ? (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--module-whatsapp)] px-1.5 text-[10px] font-semibold text-white">
                              {chat.unread}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </aside>

          {/* Thread */}
          <section
            className="relative flex min-h-0 flex-col"
            aria-label="Conversación"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: `
                  radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--module-whatsapp) 12%, transparent), transparent 50%),
                  repeating-linear-gradient(
                    -12deg,
                    transparent,
                    transparent 11px,
                    color-mix(in srgb, var(--foreground) 2.5%, transparent) 11px,
                    color-mix(in srgb, var(--foreground) 2.5%, transparent) 12px
                  )
                `,
              }}
              aria-hidden
            />

            <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur">
              <Avatar fallback={activeChat.name.slice(0, 2)} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {activeChat.name}
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  en línea · simulado
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="Llamada" disabled>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Video" disabled>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Más" disabled>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 py-5">
              {thread.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-[var(--shadow-sm)] sm:max-w-[65%]',
                    message.from === 'me'
                      ? 'ml-auto rounded-br-md bg-[color-mix(in_srgb,var(--module-whatsapp)_22%,var(--surface))] text-[var(--foreground)]'
                      : 'rounded-bl-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]',
                  )}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <footer className="relative z-10 flex shrink-0 items-center gap-2 border-t border-[var(--border)] bg-[var(--surface)]/95 px-3 py-3">
              <Button variant="ghost" size="icon" aria-label="Emoji" disabled>
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Adjuntar" disabled>
                <Paperclip className="h-4 w-4" />
              </Button>
              <input
                type="text"
                placeholder="Escribe un mensaje"
                aria-label="Mensaje"
                className="h-10 flex-1 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm outline-none placeholder:text-[var(--foreground-subtle)]"
                disabled
              />
              <Button
                size="icon"
                className="rounded-full bg-[var(--module-whatsapp)] text-white hover:bg-[var(--module-whatsapp)] hover:opacity-90"
                aria-label="Audio"
                disabled
              >
                <Mic className="h-4 w-4" />
              </Button>
            </footer>
          </section>
        </div>
      </motion.div>
    </div>
    </CensoredModule>
  )
}
