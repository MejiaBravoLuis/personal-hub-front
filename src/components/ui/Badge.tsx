import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--surface-muted)] text-[var(--foreground-muted)] border border-[var(--border)]',
        accent:
          'bg-[var(--accent-muted)] text-[var(--accent-hover)]',
        success:
          'bg-[color-mix(in_srgb,var(--success)_18%,transparent)] text-[var(--success)]',
        warning:
          'bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]',
        danger:
          'bg-[color-mix(in_srgb,var(--danger)_18%,transparent)] text-[var(--danger)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
