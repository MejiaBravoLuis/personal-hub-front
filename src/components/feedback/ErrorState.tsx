import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/utils/cn'

type ErrorStateProps = {
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}

export function ErrorState({
  title = 'Algo salió mal',
  description = 'No pudimos cargar este contenido. Inténtalo de nuevo más tarde.',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--danger)_35%,var(--border))] bg-[color-mix(in_srgb,var(--danger)_6%,var(--surface))] px-6 py-10 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-[var(--danger)]">
        <AlertTriangle className="h-5 w-5" aria-hidden />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <p className="max-w-sm text-sm text-[var(--foreground-muted)]">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}
