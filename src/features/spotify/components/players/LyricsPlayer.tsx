import { motion } from 'motion/react'
import type { MockTrack } from '@/features/spotify/data/mockTracks'
import { PlayerTransport } from '@/features/spotify/components/PlayerTransport'
import { cn } from '@/utils/cn'

type PlayerStageProps = {
  track: MockTrack
  isPlaying: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
}

export function LyricsPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerStageProps) {
  const activeLine = Math.min(
    Math.floor(track.progress * track.lyrics.length),
    track.lyrics.length - 1,
  )

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 px-4 py-6">
      <div className="w-full max-w-2xl text-center">
        <p className="text-xs font-medium tracking-wide text-[var(--module-spotify)] uppercase">
          Letra
        </p>
        <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {track.title}
        </h2>
        <p className="text-sm text-[var(--foreground-muted)]">{track.artist}</p>
      </div>

      <motion.div
        key={track.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex min-h-0 w-full max-w-2xl flex-1 items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-6 py-8"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, color-mix(in srgb, ${track.palette.primary} 18%, transparent), transparent 60%)`,
        }}
      >
        <ul className="space-y-4 text-center">
          {track.lyrics.map((line, index) => {
            const distance = Math.abs(index - activeLine)
            return (
              <li
                key={`${track.id}-${index}`}
                className={cn(
                  'font-display transition-all duration-500',
                  index === activeLine
                    ? 'scale-105 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl'
                    : 'text-lg text-[var(--foreground-muted)] sm:text-xl',
                  distance > 2 && 'opacity-30',
                  distance === 2 && 'opacity-50',
                  distance === 1 && 'opacity-75',
                )}
              >
                {line}
              </li>
            )
          })}
        </ul>

        {isPlaying ? (
          <span className="absolute top-4 right-4 rounded-full bg-[var(--accent-muted)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent-hover)]">
            Sync mock
          </span>
        ) : null}
      </motion.div>

      <PlayerTransport
        track={track}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  )
}
