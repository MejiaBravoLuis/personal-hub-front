import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

type LoadingProps = {
  label?: string
  className?: string
  fullScreen?: boolean
}

export function Loading({
  label = 'Cargando…',
  className,
  fullScreen = false,
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-[var(--foreground-muted)]',
        fullScreen && 'min-h-[50vh]',
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  )
}
