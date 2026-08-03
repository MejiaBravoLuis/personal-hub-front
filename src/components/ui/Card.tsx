import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-[border-color,box-shadow,transform,background] duration-200',
          interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
          className,
        )}
        {...props}
      />
    )
  },
)

Card.displayName = 'Card'

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3 flex items-start justify-between gap-3', className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-display text-base font-semibold tracking-tight text-[var(--foreground)]', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-[var(--foreground-muted)]', className)} {...props} />
  )
}
