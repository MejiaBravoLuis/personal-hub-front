import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ExternalLink,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Search,
  Unplug,
  X,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Loading } from '@/components/feedback/Loading'
import { FormAlert } from '@/features/auth'
import { useTheme } from '@/providers'
import {
  MOCK_TRACKS,
  PLAYER_LAYOUT_STORAGE_KEY,
  type PlayerLayout,
} from '@/features/spotify/data/mockTracks'
import { paletteFromAlbumColors } from '@/features/spotify/lib/paletteFromAlbum'
import { mapPlaybackToTrack } from '@/features/spotify/lib/mapPlaybackToTrack'
import { SpotifySidebar } from '@/features/spotify/components/SpotifySidebar'
import { SpotifyConnectPanel } from '@/features/spotify/components/SpotifyConnectPanel'
import { PlayerLayoutSwitcher } from '@/features/spotify/components/PlayerLayoutSwitcher'
import { NormalPlayer } from '@/features/spotify/components/players/NormalPlayer'
import { TurntablePlayer } from '@/features/spotify/components/players/TurntablePlayer'
import { VideoPlayer } from '@/features/spotify/components/players/VideoPlayer'
import { LyricsPlayer } from '@/features/spotify/components/players/LyricsPlayer'
import {
  useDisconnectSpotify,
  useSpotifyConnection,
  useSpotifyPlayback,
  useSpotifyPlaylists,
  useSpotifyProfile,
  useSyncSpotify,
} from '@/features/spotify/hooks/useSpotify'
import { getApiErrorMessage } from '@/services/api'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const connectionQuery = useSpotifyConnection()
  const connected = Boolean(connectionQuery.data?.connected)

  const profileQuery = useSpotifyProfile(connected)
  const playbackQuery = useSpotifyPlayback(connected)
  const playlistsQuery = useSpotifyPlaylists(connected)
  const disconnect = useDisconnectSpotify()
  const sync = useSyncSpotify()

  const [activeId, setActiveId] = useState(MOCK_TRACKS[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [layout, setLayout] = useState<PlayerLayout>(() =>
    typeof window === 'undefined' ? 'normal' : readStoredLayout(),
  )
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window === 'undefined' ? true : readSidebarOpen(),
  )
  const [mobileQuery, setMobileQuery] = useState('')
  const [banner, setBanner] = useState<string | null>(null)
  const [bannerError, setBannerError] = useState<string | null>(null)

  useEffect(() => {
    const oauth = searchParams.get('oauth')
    if (!oauth) return

    if (oauth === 'connected') {
      setBanner('Spotify conectado correctamente.')
      setBannerError(null)
    } else if (oauth === 'error') {
      setBanner(null)
      setBannerError(
        searchParams.get('message') ||
          'No se pudo completar la conexión con Spotify.',
      )
    }

    const next = new URLSearchParams(searchParams)
    next.delete('oauth')
    next.delete('message')
    next.delete('code')
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const liveTrack = useMemo(
    () => mapPlaybackToTrack(playbackQuery.data),
    [playbackQuery.data],
  )

  const catalog = connected
    ? liveTrack
      ? [liveTrack]
      : []
    : MOCK_TRACKS

  const activeTrack =
    catalog.find((track) => track.id === activeId) ??
    catalog[0] ??
    MOCK_TRACKS[0]

  useEffect(() => {
    if (liveTrack) {
      setActiveId(liveTrack.id)
      setIsPlaying(Boolean(playbackQuery.data?.isPlaying))
    }
  }, [liveTrack, playbackQuery.data?.isPlaying])

  const mobileResults = useMemo(() => {
    const q = mobileQuery.trim().toLowerCase()
    if (!q) return catalog
    return catalog.filter(
      (track) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.album.toLowerCase().includes(q),
    )
  }, [catalog, mobileQuery])

  const selectTrack = (trackId: string) => {
    const track = catalog.find((item) => item.id === trackId)
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
    if (connected) return
    const index = catalog.findIndex((track) => track.id === activeId)
    if (index < 0) return
    const next = catalog[(index + offset + catalog.length) % catalog.length]
    selectTrack(next.id)
  }

  const changeLayout = (next: PlayerLayout) => {
    if (next === 'video' && !activeTrack.hasVideo) return
    setLayout(next)
    localStorage.setItem(PLAYER_LAYOUT_STORAGE_KEY, next)

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
    if (!dynamicEnabled || !activeTrack) return
    applyAlbumPalette(
      paletteFromAlbumColors(
        activeTrack.palette.primary,
        activeTrack.palette.secondary,
        mode,
      ),
    )
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  if (connectionQuery.isLoading) {
    return <Loading label="Revisando conexión de Spotify…" fullScreen />
  }

  if (connectionQuery.isError) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <FormAlert variant="error">
          {getApiErrorMessage(
            connectionQuery.error,
            'No se pudo consultar Spotify',
          )}
        </FormAlert>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {bannerError ? <FormAlert variant="error">{bannerError}</FormAlert> : null}
        <SpotifyConnectPanel errorMessage={null} />
      </div>
    )
  }

  const playerProps = {
    track: activeTrack,
    isPlaying,
    onTogglePlay: () => {
      if (connected) return
      setIsPlaying((value) => !value)
    },
    onPrev: () => selectRelative(-1),
    onNext: () => selectRelative(1),
  }

  const displayName =
    profileQuery.data?.displayName ||
    (connectionQuery.data?.integration?.metadata?.displayName as
      | string
      | undefined) ||
    'Spotify'

  return (
    <div
      data-module="spotify"
      className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row lg:gap-3"
    >
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
            tracks={catalog}
            activeTrackId={activeTrack.id}
            onSelectTrack={selectTrack}
            livePlaylists={playlistsQuery.data?.items}
            connected
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
                Conectado · {displayName}
              </p>
              <p className="truncate text-sm text-[var(--foreground-muted)]">
                {liveTrack
                  ? playbackQuery.data?.isPlaying
                    ? 'Reproduciendo ahora'
                    : 'En pausa / última pista'
                  : 'Nada sonando en Spotify'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PlayerLayoutSwitcher
              value={layout}
              onChange={changeLayout}
              hasVideo={activeTrack.hasVideo}
            />
            <Badge variant="accent">En vivo</Badge>
            <Button
              variant="ghost"
              size="sm"
              loading={sync.isPending}
              onClick={() => {
                void sync.mutateAsync().then(() => {
                  setBanner('Playlists sincronizadas.')
                })
              }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </Button>
            {activeTrack.externalUrl ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open(activeTrack.externalUrl!, '_blank', 'noreferrer')
                }
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Abrir
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              loading={disconnect.isPending}
              onClick={() => {
                void disconnect.mutateAsync().then(() => {
                  setBanner(null)
                  clearAlbumPalette()
                })
              }}
            >
              <Unplug className="h-3.5 w-3.5" />
              Desconectar
            </Button>
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

        <div className="relative z-20 space-y-2 px-4 pt-3">
          {banner ? <FormAlert variant="success">{banner}</FormAlert> : null}
          {bannerError ? (
            <FormAlert variant="error">{bannerError}</FormAlert>
          ) : null}
          <FormAlert variant="info">
            Play/pause aún no está en el API: controla la música desde Spotify;
            Hubify muestra el estado en vivo.
          </FormAlert>
        </div>

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
                  {track.imageUrl ? (
                    <img
                      src={track.imageUrl}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="h-6 w-6 rounded-full"
                      style={{
                        background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})`,
                      }}
                    />
                  )}
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
          {!liveTrack ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <div className="space-y-2">
                <p className="font-display text-xl font-semibold">
                  No hay reproducción activa
                </p>
                <p className="max-w-sm text-sm text-[var(--foreground-muted)]">
                  Abre Spotify y reproduce algo. Hubify actualizará esta vista
                  automáticamente.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${layout}-${activeTrack.id}`}
                className={cn('h-full', layout !== 'video' && 'min-h-[28rem]')}
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
          )}
        </div>
      </section>
    </div>
  )
}
