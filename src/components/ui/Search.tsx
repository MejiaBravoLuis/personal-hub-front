import { Search as SearchIcon } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type SearchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  onClear?: () => void
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--foreground-subtle)]"
          aria-hidden
        />
        <input
          ref={ref}
          type="search"
          className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)] pr-3 pl-9 text-sm text-[var(--foreground)] shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/25"
          {...props}
        />
      </div>
    )
  },
)

Search.displayName = 'Search'
