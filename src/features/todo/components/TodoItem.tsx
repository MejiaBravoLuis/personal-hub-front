import { useState } from 'react'
import { motion } from 'motion/react'
import dayjs from 'dayjs'
import { Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getApiErrorMessage } from '@/services/api'
import { cn } from '@/utils/cn'
import { useDeleteTodo, useUpdateTodo } from '../hooks/useTodos'
import { PRIORITY_LABELS, PRIORITY_STYLES } from '../lib/priority'
import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()
  const [error, setError] = useState<string | null>(null)

  const busy = updateTodo.isPending || deleteTodo.isPending

  const toggleCompleted = async () => {
    setError(null)
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        payload: { completed: !todo.completed },
      })
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo actualizar'))
    }
  }

  const remove = async () => {
    setError(null)
    try {
      await deleteTodo.mutateAsync(todo.id)
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo eliminar'))
    }
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]/70 px-3 py-3 transition-colors hover:border-[var(--border-strong)] sm:px-4"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => {
            void toggleCompleted()
          }}
          disabled={busy}
          aria-pressed={todo.completed}
          aria-label={
            todo.completed ? 'Marcar como pendiente' : 'Marcar como hecha'
          }
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
            todo.completed
              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]'
              : 'border-[var(--border-strong)] text-transparent hover:border-[var(--accent)]',
          )}
        >
          <Check className="h-3.5 w-3.5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={cn(
                'font-medium text-[var(--foreground)]',
                todo.completed &&
                  'text-[var(--foreground-muted)] line-through',
              )}
            >
              {todo.title}
            </p>
            <span
              className={cn(
                'inline-flex rounded-[var(--radius-full)] px-2 py-0.5 text-[11px] font-medium',
                PRIORITY_STYLES[todo.priority],
              )}
            >
              {PRIORITY_LABELS[todo.priority]}
            </span>
          </div>

          {todo.description ? (
            <p className="line-clamp-2 text-sm text-[var(--foreground-muted)]">
              {todo.description}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--foreground-subtle)]">
            {todo.dueDate ? (
              <span>Vence {dayjs(todo.dueDate).format('D MMM YYYY')}</span>
            ) : null}
            {todo.subtasks.length > 0 ? (
              <span>
                {todo.subtasks.filter((item) => item.completed).length}/
                {todo.subtasks.length} subtareas
              </span>
            ) : null}
            {todo.tags.length > 0 ? (
              <span>{todo.tags.map((tag) => `#${tag}`).join(' ')}</span>
            ) : null}
          </div>

          {error ? (
            <p className="text-xs text-[var(--danger)]" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Eliminar tarea"
          disabled={busy}
          className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
          onClick={() => {
            void remove()
          }}
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </motion.li>
  )
}
