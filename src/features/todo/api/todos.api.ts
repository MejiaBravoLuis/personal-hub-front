import {
  api,
  type ApiPaginatedSuccess,
  type ApiSuccess,
} from '@/services/api'
import type {
  CreateTodoInput,
  Todo,
  TodoListParams,
  UpdateTodoInput,
} from '../types'

function toQuery(params: TodoListParams = {}) {
  const query: Record<string, string> = {}

  if (params.page != null) query.page = String(params.page)
  if (params.limit != null) query.limit = String(params.limit)
  if (params.search) query.search = params.search
  if (params.completed != null) query.completed = String(params.completed)
  if (params.priority) query.priority = params.priority
  if (params.tag) query.tag = params.tag
  if (params.dueBefore) query.dueBefore = params.dueBefore
  if (params.dueAfter) query.dueAfter = params.dueAfter
  if (params.sortBy) query.sortBy = params.sortBy
  if (params.sortOrder) query.sortOrder = params.sortOrder

  return query
}

export async function listTodos(params: TodoListParams = {}) {
  const { data } = await api.get<ApiPaginatedSuccess<Todo[]>>('/todos', {
    params: toQuery(params),
  })
  return {
    todos: data.data,
    pagination: data.pagination,
  }
}

export async function getTodo(id: string) {
  const { data } = await api.get<ApiSuccess<{ todo: Todo }>>(`/todos/${id}`)
  return data.data.todo
}

export async function createTodo(payload: CreateTodoInput) {
  const { data } = await api.post<ApiSuccess<{ todo: Todo }>>('/todos', payload)
  return data.data.todo
}

export async function updateTodo(id: string, payload: UpdateTodoInput) {
  const { data } = await api.patch<ApiSuccess<{ todo: Todo }>>(
    `/todos/${id}`,
    payload,
  )
  return data.data.todo
}

export async function deleteTodo(id: string) {
  const { data } = await api.delete<ApiSuccess<{ todo: Todo }>>(`/todos/${id}`)
  return data.data.todo
}
