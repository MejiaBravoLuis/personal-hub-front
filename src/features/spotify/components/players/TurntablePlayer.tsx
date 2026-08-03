import { motion } from 'motion/react'
import type { MockTrack } from '@/features/spotify/data/mockTracks'
import { PlayerTransport } from '@/features/spotify/components/PlayerTransport'

type PlayerStageProps = {
  track: MockTrack
  isPlaying: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
}

export function TurntablePlayer({
  track,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerStageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-4 py-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-[min(72vw,22rem)] w-[min(72vw,22rem)] rounded-full bg-[var(--surface-muted)] shadow-[var(--shadow-lg)] ring-1 ring-[var(--border)]" />

        <motion.div
          key={track.id}
          className="relative z-10 h-[min(64vw,19rem)] w-[min(64vw,19rem)] rounded-full shadow-[var(--shadow-md)]"
          style={{
            background: `
              radial-gradient(circle at center, #111 0 14%, transparent 15%),
              repeating-radial-gradient(circle at center, #1a1a1a 0 2px, #0d0d0d 2px 4px),
              linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})
            `,
          }}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 3.2, ease: 'linear', repeat: Infinity }
              : { duration: 0.6 }
          }
        >
          <div
            className="absolute top-1/2 left-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-[#0a0a0a] shadow-inner"
            style={{
              background: `linear-gradient(145deg, ${track.palette.primary}, ${track.palette.secondary})`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4d4d8]" />
        </motion.div>

        <motion.div
          className="absolute top-[8%] right-[6%] z-20 origin-top-right"
          animate={{ rotate: isPlaying ? 18 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div className="relative h-36 w-1.5 rounded-full bg-[linear-gradient(180deg,#cbd5e1,#64748b)] shadow-sm sm:h-44">
            <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full border-2 border-[var(--border-strong)] bg-[var(--surface)]" />
            <div className="absolute -bottom-1 -left-1.5 h-4 w-4 rounded-[2px] bg-[#94a3b8]" />
          </div>
        </motion.div>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-xs font-medium tracking-wide text-[var(--module-spotify)] uppercase">
          Tocadiscos
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {track.title}
        </h2>
        <p className="text-[var(--foreground-muted)]">{track.artist}</p>
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
