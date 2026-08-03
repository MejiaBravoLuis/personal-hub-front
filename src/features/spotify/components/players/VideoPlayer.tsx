import { motion } from 'motion/react'
import { Film, Play, Pause } from 'lucide-react'
import type { MockTrack } from '@/features/spotify/data/mockTracks'
import { PlayerTransport } from '@/features/spotify/components/PlayerTransport'

type PlayerStageProps = {
  track: MockTrack
  isPlaying: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
}

export function VideoPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerStageProps) {
  if (!track.hasVideo) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <Film className="h-10 w-10 text-[var(--foreground-subtle)]" />
        <div>
          <h2 className="font-display text-xl font-semibold">Sin video</h2>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            Esta canción no tiene clip. Prueba Normal, Tocadiscos o Letra.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <motion.div
        key={track.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0a]"
        style={{
          background: `
            linear-gradient(120deg, ${track.palette.primary}cc, transparent 55%),
            linear-gradient(300deg, ${track.palette.secondary}99, #0a0a0a)
          `,
        }}
      >
        <button
          type="button"
          onClick={onTogglePlay}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white"
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25 sm:h-20 sm:w-20">
            {isPlaying ? (
              <Pause className="h-7 w-7 fill-current sm:h-8 sm:w-8" />
            ) : (
              <Play className="h-7 w-7 fill-current sm:h-8 sm:w-8" />
            )}
          </span>
          <span className="text-xs tracking-[0.25em] uppercase opacity-80">
            Music video · mock
          </span>
        </button>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-4 sm:px-7 sm:pb-5">
          <div className="flex items-end justify-between gap-3 text-white">
            <div>
              <p className="font-display text-2xl font-semibold drop-shadow sm:text-3xl">
                {track.title}
              </p>
              <p className="text-sm text-white/80 sm:text-base">{track.artist}</p>
            </div>
            {isPlaying ? (
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] backdrop-blur">
                LIVE MOCK
              </span>
            ) : null}
          </div>
        </div>
      </motion.div>

      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-xl justify-center">
          <PlayerTransport
            track={track}
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  )
}
