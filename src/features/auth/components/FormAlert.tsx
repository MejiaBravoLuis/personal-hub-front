import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/utils/cn'

type FormAlertProps = {
  variant: 'error' | 'success' | 'info'
  children: string
  className?: string
}

export function FormAlert({ variant, children, className }: FormAlertProps) {
  const Icon = variant === 'success' ? CheckCircle2 : AlertCircle

  return (
    <p
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-2 rounded-[var(--radius-md)] border px-3 py-2.5 text-sm',
        variant === 'error' &&
          'border-[color-mix(in_srgb,var(--danger)_40%,var(--border))] bg-[color-mix(in_srgb,var(--danger)_8%,var(--surface))] text-[var(--danger)]',
        variant === 'success' &&
          'border-[color-mix(in_srgb,var(--success)_40%,var(--border))] bg-[color-mix(in_srgb,var(--success)_8%,var(--surface))] text-[var(--success)]',
        variant === 'info' &&
          'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]',
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  )
}
