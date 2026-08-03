import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '@/utils/cn'

type TooltipProps = {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

export function Tooltip({
  content,
  children,
  side = 'top',
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const show = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const hide = () => {
    timeoutRef.current = window.setTimeout(() => setOpen(false), 80)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--foreground)] shadow-[var(--shadow-md)]',
            side === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]',
            className,
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
