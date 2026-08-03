import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

type CensoredModuleProps = {
  locked: boolean
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  actionTo?: string
  actionLoading?: boolean
  loading?: boolean
  children: ReactNode
  className?: string
  /** Soft accent for the unlock chip */
  accent?: string
  compact?: boolean
}

/**
 * Blurs module content until the related integration is connected.
 * Unlocked modules render children normally.
 */
export function CensoredModule({
  locked,
  title,
  description = 'Conecta esta cuenta para desbloquear el módulo.',
  actionLabel = 'Conectar',
  onAction,
  actionTo,
  actionLoading = false,
  loading = false,
  children,
  className,
  accent = 'var(--accent)',
  compact = false,
}: CensoredModuleProps) {
  const navigate = useNavigate()

  if (!locked && !loading) {
    return <>{children}</>
  }

  const showAction = Boolean(onAction || actionTo)

  return (
    <div className={cn('relative overflow-hidden rounded-[inherit]', className)}>
      <div
        aria-hidden={locked || undefined}
        className={cn(
          'transition-[filter,opacity,transform] duration-500',
          locked &&
            'pointer-events-none select-none blur-[7px] saturate-75 brightness-[0.92] scale-[1.01]',
          loading && !locked && 'opacity-70',
        )}
      >
        {children}
      </div>

      {locked ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--background)_28%,transparent)] p-4 backdrop-blur-[2px]">
          <div
            className={cn(
              'w-full max-w-sm rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]/92 text-center shadow-[var(--shadow-md)] backdrop-blur-xl',
              compact ? 'space-y-3 p-4' : 'space-y-4 p-5 sm:p-6',
            )}
          >
            <div
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[var(--shadow-sm)]"
              style={{ background: accent }}
            >
              <Lock className="h-5 w-5" aria-hidden />
            </div>
            <div className="space-y-1.5">
              <p className="font-display text-lg font-semibold tracking-tight">
                {title}
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">
                {description}
              </p>
            </div>

            {showAction ? (
              <Button
                type="button"
                className="w-full"
                loading={actionLoading}
                onClick={() => {
                  if (onAction) {
                    onAction()
                    return
                  }
                  if (actionTo) navigate(actionTo)
                }}
              >
                <Link2 className="h-4 w-4" aria-hidden />
                {actionLabel}
              </Button>
            ) : (
              <p className="text-xs text-[var(--foreground-subtle)]">
                Pronto disponible
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
