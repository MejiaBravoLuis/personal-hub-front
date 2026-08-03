import type { TodoPriority } from '../types'

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
}

export const PRIORITY_STYLES: Record<TodoPriority, string> = {
  LOW: 'bg-[var(--surface-muted)] text-[var(--foreground-muted)]',
  MEDIUM: 'bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent-hover)]',
  HIGH: 'bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]',
  URGENT: 'bg-[color-mix(in_srgb,var(--danger)_18%,transparent)] text-[var(--danger)]',
}
