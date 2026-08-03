import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)]/60 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--foreground-muted)]">
        {icon ?? <Inbox className="h-5 w-5" aria-hidden />}
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-base font-semibold text-[var(--foreground)]">
          {title}
        </h3>
        {description ? (
          <p className="max-w-sm text-sm text-[var(--foreground-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
