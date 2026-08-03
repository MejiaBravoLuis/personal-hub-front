import { motion } from 'motion/react'
import {
  Music2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  ListMusic,
  Radio,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { cn } from '@/utils/cn'

const recentTracks = [
  { title: 'Midnight City', artist: 'M83', duration: '4:03' },
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { title: 'Weightless', artist: 'Marconi Union', duration: '8:00' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:57' },
  { title: 'Nightcall', artist: 'Kavinsky', duration: '4:17' },
]

const playlists = [
  { name: 'Focus Flow', tracks: 42 },
  { name: 'Late Drive', tracks: 28 },
  { name: 'Deep Work', tracks: 35 },
]

export function SpotifyPage() {
  return (
    <div data-module="spotify" className="space-y-8">
      <PageHeader
        title="Spotify"
        description="Tu módulo musical dentro de Hubify. Visual simulado — la conexión OAuth llegará después."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="default">Sin conectar</Badge>
            <Button variant="secondary" size="sm" disabled>
              Conectar cuenta
            </Button>
          </div>
        }
      />

      {/* Now playing — hero of the module */}
      <motion.section
        aria-labelledby="now-playing-heading"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--module-spotify)_28%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_80%,color-mix(in_srgb,var(--module-spotify)_12%,transparent),transparent_45%)]"
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[240px_1fr] lg:items-end">
          <div className="mx-auto w-full max-w-[240px]">
            <motion.div
              className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--module-spotify)_55%,#0a0a0a),#111827)] shadow-[var(--shadow-lg)]"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 text-white/90">
                <Music2 className="h-12 w-12 opacity-80" aria-hidden />
                <span className="text-xs tracking-widest uppercase opacity-60">
                  Album art
                </span>
              </div>
            </motion.div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-medium tracking-wide text-[var(--module-spotify)] uppercase">
                Reproduciendo ahora
              </p>
              <h2
                id="now-playing-heading"
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Neon Horizons
              </h2>
              <p className="mt-1 text-[var(--foreground-muted)]">
                Atlas Echo · Synthetic Nights
              </p>
            </div>

            {/* Progress (visual only) */}
            <div className="space-y-2" aria-hidden>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full w-[38%] rounded-full bg-[var(--module-spotify)]" />
              </div>
              <div className="flex justify-between text-xs text-[var(--foreground-subtle)]">
                <span>1:24</span>
                <span>3:47</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Anterior" disabled>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-[var(--module-spotify)] text-white hover:bg-[var(--module-spotify)] hover:opacity-90"
                aria-label="Reproducir"
                disabled
              >
                <Play className="h-5 w-5 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Siguiente" disabled>
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Me gusta" disabled>
                <Heart className="h-4 w-4" />
              </Button>
              <div className="ml-auto hidden items-center gap-2 sm:flex">
                <Volume2 className="h-4 w-4 text-[var(--foreground-subtle)]" />
                <div className="h-1 w-24 rounded-full bg-[var(--surface-muted)]">
                  <div className="h-full w-2/3 rounded-full bg-[var(--foreground-subtle)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Queue */}
        <motion.section
          aria-labelledby="queue-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ListMusic className="h-4 w-4 text-[var(--module-spotify)]" />
              <h2 id="queue-heading" className="font-display text-base font-semibold">
                Recientes
              </h2>
            </div>
            <Badge variant="default">Mock</Badge>
          </div>

          <ul className="space-y-1">
            {recentTracks.map((track, index) => (
              <li
                key={track.title}
                className={cn(
                  'flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 transition-colors',
                  index === 0
                    ? 'bg-[color-mix(in_srgb,var(--module-spotify)_10%,transparent)]'
                    : 'hover:bg-[var(--surface-muted)]',
                )}
              >
                <span className="w-5 text-center text-xs text-[var(--foreground-subtle)]">
                  {index === 0 ? (
                    <Pause className="mx-auto h-3.5 w-3.5 text-[var(--module-spotify)]" />
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{track.title}</p>
                  <p className="truncate text-xs text-[var(--foreground-muted)]">
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs text-[var(--foreground-subtle)]">
                  {track.duration}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Playlists + dynamic theme note */}
        <div className="space-y-4">
          <motion.section
            aria-labelledby="playlists-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.35 }}
            className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <Radio className="h-4 w-4 text-[var(--module-spotify)]" />
              <h2
                id="playlists-heading"
                className="font-display text-base font-semibold"
              >
                Playlists
              </h2>
            </div>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div
                  key={playlist.name}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--module-spotify)_18%,var(--surface-muted))] text-[var(--module-spotify)]">
                    <Music2 className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{playlist.name}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                      {playlist.tracks} tracks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.35 }}
            className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--module-spotify)_6%,var(--surface))] p-5"
          >
            <p className="text-sm font-medium text-[var(--foreground)]">
              Tema dinámico preparado
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--foreground-muted)]">
              Cuando conectes Spotify, los colores de la portada actualizarán
              `--dynamic-primary` y toda Hubify cambiará de atmósfera — sin
              rediseñar.
            </p>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
