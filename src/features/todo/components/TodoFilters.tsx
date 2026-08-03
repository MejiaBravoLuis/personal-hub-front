import { Search } from 'lucide-react'
import { cn } from '@/utils/cn'
import { TODO_PRIORITIES, type TodoPriority } from '../types'
import { PRIORITY_LABELS } from '../lib/priority'

export type TodoStatusFilter = 'all' | 'active' | 'completed'

type TodoFiltersProps = {
  status: TodoStatusFilter
  onStatusChange: (status: TodoStatusFilter) => void
  search: string
  onSearchChange: (value: string) => void
  priority: TodoPriority | 'all'
  onPriorityChange: (value: TodoPriority | 'all') => void
}

const STATUS_OPTIONS: Array<{ id: TodoStatusFilter; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'active', label: 'Activas' },
  { id: 'completed', label: 'Hechas' },
]

export function TodoFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
  priority,
  onPriorityChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)] p-1">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onStatusChange(option.id)}
            className={cn(
              'rounded-[var(--radius-full)] px-3.5 py-1.5 text-sm font-medium transition-colors',
              status === option.id
                ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2 sm:max-w-md sm:flex-row sm:justify-end">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar tareas</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--foreground-subtle)]"
            aria-hidden
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar…"
            className="h-10 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] pr-3 pl-9 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
          />
        </label>
        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(event.target.value as TodoPriority | 'all')
          }
          aria-label="Filtrar por prioridad"
          className="h-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
        >
          <option value="all">Toda prioridad</option>
          {TODO_PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {PRIORITY_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
