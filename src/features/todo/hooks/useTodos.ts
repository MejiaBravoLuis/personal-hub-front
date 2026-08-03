import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  createTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from '../api/todos.api'
import type {
  CreateTodoInput,
  TodoListParams,
  UpdateTodoInput,
} from '../types'

export const todoKeys = {
  all: ['todos'] as const,
  list: (params: TodoListParams) => [...todoKeys.all, 'list', params] as const,
}

export function useTodos(params: TodoListParams) {
  return useQuery({
    queryKey: todoKeys.list(params),
    queryFn: () => listTodos(params),
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateTodoInput) => createTodo(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoInput }) =>
      updateTodo(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}
