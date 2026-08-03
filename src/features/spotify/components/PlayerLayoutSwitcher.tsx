import { PLAYER_LAYOUTS, type PlayerLayout } from '@/features/spotify/data/mockTracks'
import { cn } from '@/utils/cn'

type PlayerLayoutSwitcherProps = {
  value: PlayerLayout
  onChange: (layout: PlayerLayout) => void
  hasVideo: boolean
}

export function PlayerLayoutSwitcher({
  value,
  onChange,
  hasVideo,
}: PlayerLayoutSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Diseño del reproductor"
      className="inline-flex flex-wrap gap-1 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)] p-1"
    >
      {PLAYER_LAYOUTS.map((layout) => {
        const disabled = layout.id === 'video' && !hasVideo
        const selected = value === layout.id

        return (
          <button
            key={layout.id}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={disabled}
            title={disabled ? 'Esta canción no tiene video' : layout.hint}
            onClick={() => onChange(layout.id)}
            className={cn(
              'rounded-[var(--radius-full)] px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
              selected
                ? 'bg-[var(--module-spotify)] text-white'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
              disabled && 'cursor-not-allowed opacity-40 hover:text-[var(--foreground-muted)]',
            )}
          >
            {layout.label}
          </button>
        )
      })}
    </div>
  )
}
