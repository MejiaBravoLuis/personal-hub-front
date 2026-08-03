import { motion } from 'motion/react'
import { Music2 } from 'lucide-react'
import type { MockTrack } from '@/features/spotify/data/mockTracks'
import { PlayerTransport } from '@/features/spotify/components/PlayerTransport'

type PlayerStageProps = {
  track: MockTrack
  isPlaying: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
}

export function NormalPlayer({
  track,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerStageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-4 py-6">
      <motion.div
        key={track.id}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-sm"
      >
        <div
          className="aspect-square overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]"
          style={{
            background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary} 55%, #0f172a)`,
          }}
        >
          {track.imageUrl ? (
            <img
              src={track.imageUrl}
              alt={`Portada de ${track.album}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/90">
              <Music2 className="h-14 w-14 opacity-80" aria-hidden />
              <span className="text-xs tracking-[0.2em] uppercase opacity-60">
                Album art
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="space-y-1 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {track.title}
        </h2>
        <p className="text-[var(--foreground-muted)]">
          {track.artist} · {track.album}
        </p>
      </div>

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
