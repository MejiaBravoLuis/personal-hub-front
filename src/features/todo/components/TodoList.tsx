import { AnimatePresence } from 'motion/react'
import { CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { Loading } from '@/components/feedback/Loading'
import { getApiErrorMessage } from '@/services/api'
import type { Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  isLoading: boolean
  isError: boolean
  error: unknown
  onRetry: () => void
  totalItems?: number
}

export function TodoList({
  todos,
  isLoading,
  isError,
  error,
  onRetry,
  totalItems,
}: TodoListProps) {
  if (isLoading) {
    return <Loading label="Cargando tus tareas…" fullScreen />
  }

  if (isError) {
    return (
      <ErrorState
        title="No se pudieron cargar las tareas"
        description={getApiErrorMessage(error)}
        action={
          <Button type="button" variant="secondary" onClick={onRetry}>
            Reintentar
          </Button>
        }
      />
    )
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        title="Sin tareas por ahora"
        description="Crea la primera arriba y empieza a organizar tu día."
        icon={<CheckSquare className="h-5 w-5" />}
      />
    )
  }

  return (
    <div className="space-y-3">
      {totalItems != null ? (
        <p className="text-xs text-[var(--foreground-muted)]">
          {totalItems} tarea{totalItems === 1 ? '' : 's'}
        </p>
      ) : null}
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
