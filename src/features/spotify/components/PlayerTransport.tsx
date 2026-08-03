import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { MockTrack } from '@/features/spotify/data/mockTracks'

type PlayerTransportProps = {
  track: MockTrack
  isPlaying: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
}

export function PlayerTransport({
  track,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
}: PlayerTransportProps) {
  return (
    <div className="w-full max-w-xl space-y-3">
      <div className="space-y-1.5" aria-hidden>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div
            className="h-full rounded-full bg-[var(--module-spotify)] transition-[width] duration-500"
            style={{ width: `${track.progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[var(--foreground-subtle)]">
          <span>1:24</span>
          <span>{track.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <Button variant="ghost" size="icon" aria-label="Aleatorio" disabled>
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Anterior"
          onClick={onPrev}
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-[var(--module-spotify)] text-white hover:bg-[var(--module-spotify)] hover:opacity-90 sm:h-14 sm:w-14"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Siguiente"
          onClick={onNext}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Repetir" disabled>
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <Button variant="ghost" size="icon" aria-label="Me gusta" disabled>
          <Heart className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[var(--foreground-subtle)]" />
          <div className="h-1 w-20 rounded-full bg-[var(--surface-muted)] sm:w-28">
            <div className="h-full w-2/3 rounded-full bg-[var(--foreground-subtle)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
