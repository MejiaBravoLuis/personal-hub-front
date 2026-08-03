import { useDeferredValue, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/layout/PageHeader'
import { TodoComposer } from '../components/TodoComposer'
import {
  TodoFilters,
  type TodoStatusFilter,
} from '../components/TodoFilters'
import { TodoList } from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'
import type { TodoListParams, TodoPriority } from '../types'

export function TodosPage() {
  const [status, setStatus] = useState<TodoStatusFilter>('all')
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState<TodoPriority | 'all'>('all')
  const deferredSearch = useDeferredValue(search.trim())

  const params = useMemo<TodoListParams>(() => {
    const next: TodoListParams = {
      page: 1,
      limit: 50,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }

    if (status === 'active') next.completed = false
    if (status === 'completed') next.completed = true
    if (deferredSearch) next.search = deferredSearch
    if (priority !== 'all') next.priority = priority

    return next
  }, [deferredSearch, priority, status])

  const query = useTodos(params)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Todos"
        description="Tu lista nativa en Hubify, conectada al backend."
        actions={<Badge variant="accent">En vivo</Badge>}
      />

      <TodoComposer />

      <TodoFilters
        status={status}
        onStatusChange={setStatus}
        search={search}
        onSearchChange={setSearch}
        priority={priority}
        onPriorityChange={setPriority}
      />

      <TodoList
        todos={query.data?.todos ?? []}
        isLoading={query.isLoading}
        isError={query.isError}
        error={query.error}
        onRetry={() => {
          void query.refetch()
        }}
        totalItems={query.data?.pagination.totalItems}
      />
    </div>
  )
}
