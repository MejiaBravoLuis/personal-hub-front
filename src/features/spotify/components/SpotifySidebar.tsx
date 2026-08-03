import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Home,
  Search,
  Library,
  Plus,
  Music2,
  Film,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  MOCK_PLAYLISTS,
  type MockTrack,
} from '@/features/spotify/data/mockTracks'
import type { SpotifyPlaylist } from '@/features/spotify/types'
import { cn } from '@/utils/cn'

type SidebarView = 'home' | 'search' | 'library'

type SidebarPlaylist = {
  id: string
  name: string
  tracks: number
  image?: string | null
  externalUrl?: string | null
}

type SpotifySidebarProps = {
  tracks: MockTrack[]
  activeTrackId: string
  onSelectTrack: (id: string) => void
  className?: string
  /** Opens search view from outside (e.g. mobile) */
  forceView?: SidebarView
  /** Live playlists when Spotify is connected */
  livePlaylists?: SpotifyPlaylist[]
  connected?: boolean
}

const navItems: { id: SidebarView; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'search', label: 'Buscar', icon: Search },
  { id: 'library', label: 'Tu biblioteca', icon: Library },
]

function matchesQuery(track: MockTrack, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    track.title.toLowerCase().includes(q) ||
    track.artist.toLowerCase().includes(q) ||
    track.album.toLowerCase().includes(q)
  )
}

export function SpotifySidebar({
  tracks,
  activeTrackId,
  onSelectTrack,
  className,
  forceView,
  livePlaylists,
  connected = false,
}: SpotifySidebarProps) {
  const [view, setView] = useState<SidebarView>('home')
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (forceView) setView(forceView)
  }, [forceView])

  useEffect(() => {
    if (view === 'search') {
      const id = window.setTimeout(() => searchRef.current?.focus(), 50)
      return () => window.clearTimeout(id)
    }
  }, [view])

  const results = useMemo(
    () => tracks.filter((track) => matchesQuery(track, query)),
    [tracks, query],
  )

  const catalogPlaylists: SidebarPlaylist[] = useMemo(() => {
    if (livePlaylists?.length) {
      return livePlaylists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        tracks: playlist.tracks,
        image: playlist.image,
        externalUrl: playlist.externalUrl,
      }))
    }
    return MOCK_PLAYLISTS.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      tracks: playlist.tracks,
    }))
  }, [livePlaylists])

  const playlists = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return catalogPlaylists
    return catalogPlaylists.filter((playlist) =>
      playlist.name.toLowerCase().includes(q),
    )
  }, [catalogPlaylists, query])

  return (
    <aside className={cn('flex h-full min-h-0 w-full flex-col gap-2', className)}>
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3">
        <div className="mb-3 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--module-spotify)] text-white">
            <Music2 className="h-4 w-4" aria-hidden />
          </div>
          <span className="font-display text-sm font-semibold">Spotify</span>
        </div>
        <nav aria-label="Navegación Spotify">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = view === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setView(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-[color-mix(in_srgb,var(--module-spotify)_14%,transparent)] text-[var(--foreground)]'
                        : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3">
        {view === 'search' ? (
          <SearchPanel
            query={query}
            onQueryChange={setQuery}
            results={results}
            playlists={playlists}
            activeTrackId={activeTrackId}
            onSelectTrack={onSelectTrack}
            searchRef={searchRef}
            connected={connected}
          />
        ) : null}

        {view === 'home' ? (
          <>
            <p className="mb-2 px-2 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
              Recientes
            </p>
            <TrackList
              tracks={tracks}
              activeTrackId={activeTrackId}
              onSelectTrack={onSelectTrack}
            />
          </>
        ) : null}

        {view === 'library' ? (
          <>
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
                Biblioteca
              </p>
              <button
                type="button"
                className="rounded-full p-1 text-[var(--foreground-subtle)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                aria-label="Crear playlist"
                disabled
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <PlaylistList playlists={catalogPlaylists} />
            <p className="mb-2 px-2 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
              Canciones
            </p>
            <TrackList
              tracks={tracks}
              activeTrackId={activeTrackId}
              onSelectTrack={onSelectTrack}
            />
          </>
        ) : null}
      </div>
    </aside>
  )
}

function PlaylistList({ playlists }: { playlists: SidebarPlaylist[] }) {
  if (playlists.length === 0) {
    return (
      <p className="mb-3 px-2 text-sm text-[var(--foreground-muted)]">
        No hay playlists todavía.
      </p>
    )
  }

  return (
    <ul className="mb-3 space-y-0.5 border-b border-[var(--border)] pb-3">
      {playlists.map((playlist) => {
        const content = (
          <>
            {playlist.image ? (
              <img
                src={playlist.image}
                alt=""
                className="h-10 w-10 rounded-[var(--radius-sm)] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[color-mix(in_srgb,var(--module-spotify)_16%,var(--surface-muted))] text-[var(--module-spotify)]">
                <Music2 className="h-4 w-4" aria-hidden />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{playlist.name}</p>
              <p className="text-xs text-[var(--foreground-muted)]">
                Playlist · {playlist.tracks}
              </p>
            </div>
          </>
        )

        return (
          <li key={playlist.id}>
            {playlist.externalUrl ? (
              <a
                href={playlist.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left transition-colors hover:bg-[var(--surface-muted)]"
              >
                {content}
              </a>
            ) : (
              <div className="flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left">
                {content}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function SearchPanel({
  query,
  onQueryChange,
  results,
  playlists,
  activeTrackId,
  onSelectTrack,
  searchRef,
  connected,
}: {
  query: string
  onQueryChange: (value: string) => void
  results: MockTrack[]
  playlists: SidebarPlaylist[]
  activeTrackId: string
  onSelectTrack: (id: string) => void
  searchRef: React.RefObject<HTMLInputElement | null>
  connected: boolean
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--foreground-subtle)]"
          aria-hidden
        />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="¿Qué quieres escuchar?"
          aria-label="Buscar en Spotify"
          className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-muted)] pr-9 pl-9 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-subtle)] focus:border-[var(--module-spotify)] focus:ring-2 focus:ring-[var(--module-spotify)]/25"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--foreground-subtle)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
        {!query.trim() ? (
          <p className="px-1 text-xs text-[var(--foreground-subtle)]">
            {connected
              ? 'Filtra tus playlists y la pista actual.'
              : 'Busca por canción, artista o álbum (demo local).'}
          </p>
        ) : null}

        {query.trim() && playlists.length > 0 ? (
          <div>
            <p className="mb-1.5 px-1 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
              Playlists
            </p>
            <PlaylistList playlists={playlists} />
          </div>
        ) : null}

        <div>
          <p className="mb-1.5 px-1 text-xs font-medium tracking-wide text-[var(--foreground-muted)] uppercase">
            Canciones
            {query.trim() ? ` · ${results.length}` : ''}
          </p>
          {results.length === 0 ? (
            <p className="px-1 py-4 text-sm text-[var(--foreground-muted)]">
              Sin resultados para “{query.trim()}”
            </p>
          ) : (
            <TrackList
              tracks={results}
              activeTrackId={activeTrackId}
              onSelectTrack={onSelectTrack}
              showMeta
            />
          )}
        </div>
      </div>
    </div>
  )
}

function TrackList({
  tracks,
  activeTrackId,
  onSelectTrack,
  showMeta = false,
}: {
  tracks: MockTrack[]
  activeTrackId: string
  onSelectTrack: (id: string) => void
  showMeta?: boolean
}) {
  return (
    <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto">
      {tracks.map((track) => {
        const active = track.id === activeTrackId
        return (
          <li key={track.id}>
            <button
              type="button"
              onClick={() => onSelectTrack(track.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2 py-2 text-left transition-colors',
                active
                  ? 'bg-[color-mix(in_srgb,var(--module-spotify)_12%,transparent)]'
                  : 'hover:bg-[var(--surface-muted)]',
              )}
            >
              <span
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[var(--radius-sm)]"
                style={{
                  background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})`,
                }}
                aria-hidden
              >
                {track.imageUrl ? (
                  <img
                    src={track.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
                {track.hasVideo ? (
                  <Film className="absolute right-0.5 bottom-0.5 h-3 w-3 text-white drop-shadow" />
                ) : null}
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    'truncate text-sm font-medium',
                    active && 'text-[var(--module-spotify)]',
                  )}
                >
                  {track.title}
                </p>
                <p className="truncate text-xs text-[var(--foreground-muted)]">
                  {showMeta
                    ? `${track.artist} · ${track.album}`
                    : track.artist}
                </p>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
