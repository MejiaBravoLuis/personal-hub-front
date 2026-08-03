import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <label className="flex w-full flex-col gap-1.5 text-sm">
        {label ? (
          <span className="font-medium text-[var(--foreground)]">{label}</span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[var(--foreground)] shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] placeholder:text-[var(--foreground-subtle)] hover:border-[var(--border-strong)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30 disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/30',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error ? (
          <span
            id={`${inputId}-error`}
            className="text-xs text-[var(--danger)]"
            role="alert"
          >
            {error}
          </span>
        ) : hint ? (
          <span
            id={`${inputId}-hint`}
            className="text-xs text-[var(--foreground-muted)]"
          >
            {hint}
          </span>
        ) : null}
      </label>
    )
  },
)

Input.displayName = 'Input'
