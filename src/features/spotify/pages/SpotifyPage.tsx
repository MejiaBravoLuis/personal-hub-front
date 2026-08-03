import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  Music2,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  ListMusic,
  Radio,
  Palette,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { useTheme } from '@/providers'
import { MOCK_PLAYLISTS, MOCK_TRACKS } from '@/features/spotify/data/mockTracks'
import { paletteFromAlbumColors } from '@/features/spotify/lib/paletteFromAlbum'
import { cn } from '@/utils/cn'

export function SpotifyPage() {
  const { mode, dynamicEnabled, applyAlbumPalette, clearAlbumPalette } =
    useTheme()
  const [activeId, setActiveId] = useState(MOCK_TRACKS[0].id)

  const activeTrack =
    MOCK_TRACKS.find((track) => track.id === activeId) ?? MOCK_TRACKS[0]

  const selectTrack = (trackId: string) => {
    const track = MOCK_TRACKS.find((item) => item.id === trackId)
    if (!track) return

    setActiveId(track.id)
    applyAlbumPalette(
      paletteFromAlbumColors(
        track.palette.primary,
        track.palette.secondary,
        mode,
      ),
    )
  }

  const selectRelative = (offset: number) => {
    const index = MOCK_TRACKS.findIndex((track) => track.id === activeId)
    const next =
      MOCK_TRACKS[(index + offset + MOCK_TRACKS.length) % MOCK_TRACKS.length]
    selectTrack(next.id)
  }

  // Keep palette in sync when user toggles light/dark while a track is tinting
  useEffect(() => {
    if (!dynamicEnabled) return
    applyAlbumPalette(
      paletteFromAlbumColors(
        activeTrack.palette.primary,
        activeTrack.palette.secondary,
        mode,
      ),
    )
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps -- only re-derive on theme mode

  return (
    <div data-module="spotify" className="space-y-8">
      <PageHeader
        title="Spotify"
        description="Elige una canción mock y mira cómo bordes y acentos de toda Hubify siguen la “portada”."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={dynamicEnabled ? 'accent' : 'default'}>
              {dynamicEnabled ? 'Tema dinámico ON' : 'Tema base'}
            </Badge>
            {dynamicEnabled ? (
              <Button variant="secondary" size="sm" onClick={clearAlbumPalette}>
                Quitar tint
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => selectTrack(activeTrack.id)}
              >
                Activar tint
              </Button>
            )}
          </div>
        }
      />

      <motion.section
        aria-labelledby="now-playing-heading"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] transition-[border-color] duration-500"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--dynamic-primary)_28%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_80%,color-mix(in_srgb,var(--dynamic-secondary)_14%,transparent),transparent_45%)]"
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[240px_1fr] lg:items-end">
          <div className="mx-auto w-full max-w-[240px]">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0.6, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="aspect-square overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]"
              style={{
                background: `linear-gradient(145deg, ${activeTrack.palette.primary}, ${activeTrack.palette.secondary} 55%, #0f172a)`,
              }}
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
              <p className="mb-2 text-xs font-medium tracking-wide text-[var(--accent)] uppercase">
                Reproduciendo ahora
              </p>
              <h2
                id="now-playing-heading"
                className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {activeTrack.title}
              </h2>
              <p className="mt-1 text-[var(--foreground-muted)]">
                {activeTrack.artist} · {activeTrack.album}
              </p>
            </div>

            <div className="space-y-2" aria-hidden>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-[width,background-color] duration-500"
                  style={{ width: `${activeTrack.progress * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--foreground-subtle)]">
                <span>1:24</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Anterior"
                onClick={() => selectRelative(-1)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full"
                aria-label="Reproducir (mock)"
                onClick={() => selectTrack(activeTrack.id)}
              >
                <Play className="h-5 w-5 fill-current" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Siguiente"
                onClick={() => selectRelative(1)}
              >
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
        <motion.section
          aria-labelledby="queue-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-[border-color] duration-500 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ListMusic className="h-4 w-4 text-[var(--accent)]" />
              <h2
                id="queue-heading"
                className="font-display text-base font-semibold"
              >
                Recientes
              </h2>
            </div>
            <Badge variant="default">Click = tint</Badge>
          </div>

          <ul className="space-y-1">
            {MOCK_TRACKS.map((track, index) => {
              const isActive = track.id === activeTrack.id
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => selectTrack(track.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 text-left transition-colors',
                      isActive
                        ? 'bg-[var(--accent-muted)]'
                        : 'hover:bg-[var(--surface-muted)]',
                    )}
                  >
                    <span className="flex w-5 justify-center">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: track.palette.primary }}
                        aria-hidden
                      />
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
                    <span className="w-4 text-center text-xs text-[var(--foreground-subtle)]">
                      {index + 1}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.section>

        <div className="space-y-4">
          <motion.section
            aria-labelledby="playlists-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.35 }}
            className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-[border-color] duration-500 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <Radio className="h-4 w-4 text-[var(--accent)]" />
              <h2
                id="playlists-heading"
                className="font-display text-base font-semibold"
              >
                Playlists
              </h2>
            </div>
            <div className="space-y-2">
              {MOCK_PLAYLISTS.map((playlist) => (
                <div
                  key={playlist.name}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-3 transition-[border-color] duration-500"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-muted)] text-[var(--accent)]">
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
            className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--accent-muted)]/40 p-5 transition-[border-color,background-color] duration-500"
          >
            <div className="mb-2 flex items-center gap-2">
              <Palette className="h-4 w-4 text-[var(--accent)]" />
              <p className="text-sm font-medium text-[var(--foreground)]">
                Demo de tema dinámico
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
              Al elegir un track se llama <code className="text-xs">applyAlbumPalette</code>{' '}
              y se actualizan <code className="text-xs">--dynamic-primary</code>. Bordes,
              rings y acentos de Header, Dock y cards reaccionan en toda la app.
              Luego solo hay que sustituir estos mocks por colores reales de la portada.
            </p>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
