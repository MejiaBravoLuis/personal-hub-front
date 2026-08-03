import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', fallback = 'U', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-muted)] font-semibold text-[var(--foreground-muted)]',
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden>{fallback.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
