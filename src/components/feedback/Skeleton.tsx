import { cn } from '@/utils/cn'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-[var(--radius-md)] bg-[linear-gradient(90deg,var(--surface-muted)_25%,var(--surface-hover)_50%,var(--surface-muted)_75%)] bg-[length:200%_100%] animate-[shimmer_1.4s_ease_infinite]',
        className,
      )}
    />
  )
}
