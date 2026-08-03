import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '@/utils/cn'

export type DropdownItem = {
  id: string
  label: string
  onSelect: () => void
  danger?: boolean
}

type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'start' | 'end'
  className?: string
  label?: string
}

export function Dropdown({
  trigger,
  items,
  align = 'end',
  className,
  label = 'Abrir menú',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        className="inline-flex"
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cn(
            'absolute top-[calc(100%+8px)] z-40 min-w-44 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-1 shadow-[var(--shadow-md)]',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className={cn(
                'flex w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--surface-muted)] focus:bg-[var(--surface-muted)] focus:outline-none',
                item.danger
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--foreground)]',
              )}
              onClick={() => {
                item.onSelect()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
