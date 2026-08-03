import { Music2 } from 'lucide-react'
import { MOCK_TRACKS } from '@/features/spotify/data/mockTracks'

/** Decorative blurred preview shown while Spotify is locked */
export function SpotifyLockedPreview() {
  const track = MOCK_TRACKS[0]

  return (
    <div className="relative flex min-h-[28rem] flex-1 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, color-mix(in srgb, ${track.palette.primary} 22%, transparent), transparent 50%),
            radial-gradient(ellipse at 100% 100%, color-mix(in srgb, ${track.palette.secondary} 14%, transparent), transparent 45%)
          `,
        }}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        <div
          className="aspect-square w-full max-w-[16rem] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]"
          style={{
            background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary} 55%, #0f172a)`,
          }}
        >
          <div className="flex h-full items-center justify-center text-white/80">
            <Music2 className="h-14 w-14" aria-hidden />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="font-display text-2xl font-semibold">{track.title}</p>
          <p className="text-sm text-[var(--foreground-muted)]">
            {track.artist} · {track.album}
          </p>
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div
            className="h-full rounded-full bg-[var(--module-spotify)]"
            style={{ width: '42%' }}
          />
        </div>
      </div>
    </div>
  )
}
