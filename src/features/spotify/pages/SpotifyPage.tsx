import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Palette, PanelLeftClose, PanelLeftOpen, Search, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/providers'
import {
  MOCK_TRACKS,
  PLAYER_LAYOUT_STORAGE_KEY,
  type PlayerLayout,
} from '@/features/spotify/data/mockTracks'
import { paletteFromAlbumColors } from '@/features/spotify/lib/paletteFromAlbum'
import { SpotifySidebar } from '@/features/spotify/components/SpotifySidebar'
import { PlayerLayoutSwitcher } from '@/features/spotify/components/PlayerLayoutSwitcher'
import { NormalPlayer } from '@/features/spotify/components/players/NormalPlayer'
import { TurntablePlayer } from '@/features/spotify/components/players/TurntablePlayer'
import { VideoPlayer } from '@/features/spotify/components/players/VideoPlayer'
import { LyricsPlayer } from '@/features/spotify/components/players/LyricsPlayer'
import { cn } from '@/utils/cn'

const SIDEBAR_STORAGE_KEY = 'hubify-spotify-sidebar-open'

function readStoredLayout(): PlayerLayout {
  const stored = localStorage.getItem(PLAYER_LAYOUT_STORAGE_KEY)
  if (
    stored === 'normal' ||
    stored === 'turntable' ||
    stored === 'video' ||
    stored === 'lyrics'
  ) {
    return stored
  }
  return 'normal'
}

function readSidebarOpen(): boolean {
  const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
  if (stored === null) return true
  return stored === 'true'
}

export function SpotifyPage() {
  const { mode, dynamicEnabled, applyAlbumPalette, clearAlbumPalette } =
    useTheme()
  const [activeId, setActiveId] = useState(MOCK_TRACKS[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [layout, setLayout] = useState<PlayerLayout>(() =>
    typeof window === 'undefined' ? 'normal' : readStoredLayout(),
  )
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window === 'undefined' ? true : readSidebarOpen(),
  )
  const [mobileQuery, setMobileQuery] = useState('')

  const activeTrack =
    MOCK_TRACKS.find((track) => track.id === activeId) ?? MOCK_TRACKS[0]

  const mobileResults = useMemo(() => {
    const q = mobileQuery.trim().toLowerCase()
    if (!q) return MOCK_TRACKS
    return MOCK_TRACKS.filter(
      (track) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.album.toLowerCase().includes(q),
    )
  }, [mobileQuery])

  const selectTrack = (trackId: string) => {
    const track = MOCK_TRACKS.find((item) => item.id === trackId)
    if (!track) return

    setActiveId(track.id)
    if (layout === 'video' && !track.hasVideo) {
      setLayout('normal')
      localStorage.setItem(PLAYER_LAYOUT_STORAGE_KEY, 'normal')
    }

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

  const changeLayout = (next: PlayerLayout) => {
    if (next === 'video' && !activeTrack.hasVideo) return
    setLayout(next)
    localStorage.setItem(PLAYER_LAYOUT_STORAGE_KEY, next)

    // Video uses the same dynamic shell tint as album art — later: extract from frames
    if (next === 'video') {
      applyAlbumPalette(
        paletteFromAlbumColors(
          activeTrack.palette.primary,
          activeTrack.palette.secondary,
          mode,
        ),
      )
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen((open) => {
      const next = !open
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next))
      return next
    })
  }

  useEffect(() => {
    if (!dynamicEnabled) return
    applyAlbumPalette(
      paletteFromAlbumColors(
        activeTrack.palette.primary,
        activeTrack.palette.secondary,
        mode,
      ),
    )
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  const playerProps = {
    track: activeTrack,
    isPlaying,
    onTogglePlay: () => setIsPlaying((value) => !value),
    onPrev: () => selectRelative(-1),
    onNext: () => selectRelative(1),
  }

  return (
    <div
      data-module="spotify"
      className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row lg:gap-3"
    >
      {/* Sidebar: always mounted on desktop, collapse width for reliable toggle */}
      <div
        className={cn(
          'hidden min-h-0 overflow-hidden transition-[width,opacity,margin] duration-300 ease-out lg:block',
          sidebarOpen
            ? 'mr-0 w-64 opacity-100 xl:w-72'
            : 'pointer-events-none m-0 w-0 opacity-0',
        )}
      >
        <div className="h-full w-64 xl:w-72">
          <SpotifySidebar
            tracks={MOCK_TRACKS}
            activeTrackId={activeTrack.id}
            onSelectTrack={selectTrack}
            className="h-full"
          />
        </div>
      </div>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
        {layout !== 'video' ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background: `
                radial-gradient(ellipse at 20% 0%, color-mix(in srgb, ${activeTrack.palette.primary} 22%, transparent), transparent 50%),
                radial-gradient(ellipse at 100% 100%, color-mix(in srgb, ${activeTrack.palette.secondary} 14%, transparent), transparent 45%)
              `,
            }}
            aria-hidden
          />
        ) : null}

        <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] lg:inline-flex"
              aria-label={sidebarOpen ? 'Ocultar sidebar' : 'Mostrar sidebar'}
              aria-expanded={sidebarOpen}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </button>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-[var(--module-spotify)] uppercase">
                Reproductor
              </p>
              <p className="truncate text-sm text-[var(--foreground-muted)]">
                {sidebarOpen
                  ? 'Sidebar abierta'
                  : 'Sidebar oculta · máximo espacio'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PlayerLayoutSwitcher
              value={layout}
              onChange={changeLayout}
              hasVideo={activeTrack.hasVideo}
            />
            <Badge variant={dynamicEnabled ? 'accent' : 'default'}>
              {dynamicEnabled ? 'Tint ON' : 'Tint OFF'}
            </Badge>
            {dynamicEnabled ? (
              <Button variant="ghost" size="sm" onClick={clearAlbumPalette}>
                <Palette className="h-3.5 w-3.5" />
                Quitar
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectTrack(activeTrack.id)}
              >
                <Palette className="h-3.5 w-3.5" />
                Tint
              </Button>
            )}
          </div>
        </header>

        <div className="relative z-10 space-y-2 border-b border-[var(--border)] px-3 py-2 lg:hidden">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--foreground-subtle)]"
              aria-hidden
            />
            <input
              type="search"
              value={mobileQuery}
              onChange={(event) => setMobileQuery(event.target.value)}
              placeholder="Buscar canción, artista…"
              aria-label="Buscar en Spotify"
              className="h-9 w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] pr-9 pl-9 text-sm outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--module-spotify)] focus:ring-2 focus:ring-[var(--module-spotify)]/25"
            />
            {mobileQuery ? (
              <button
                type="button"
                onClick={() => setMobileQuery('')}
                className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--foreground-subtle)]"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {mobileResults.length === 0 ? (
              <p className="px-1 text-xs text-[var(--foreground-muted)]">
                Sin resultados
              </p>
            ) : (
              mobileResults.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(track.id)}
                  className="flex shrink-0 items-center gap-2 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)]/80 px-2.5 py-1.5 text-left backdrop-blur"
                >
                  <span
                    className="h-6 w-6 rounded-full"
                    style={{
                      background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})`,
                    }}
                  />
                  <span className="max-w-28 truncate text-xs font-medium">
                    {track.title}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        <div
          className={cn(
            'relative z-10 min-h-0 flex-1',
            layout === 'video' ? 'overflow-hidden' : 'overflow-y-auto',
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${layout}-${activeTrack.id}`}
              className={cn(
                'h-full',
                layout !== 'video' && 'min-h-[28rem]',
              )}
              initial={{ opacity: 0, y: layout === 'video' ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: layout === 'video' ? 0 : -6 }}
              transition={{ duration: 0.22 }}
            >
              {layout === 'normal' ? <NormalPlayer {...playerProps} /> : null}
              {layout === 'turntable' ? (
                <TurntablePlayer {...playerProps} />
              ) : null}
              {layout === 'video' ? <VideoPlayer {...playerProps} /> : null}
              {layout === 'lyrics' ? <LyricsPlayer {...playerProps} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
