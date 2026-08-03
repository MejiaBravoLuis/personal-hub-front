export const TODO_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const

export type TodoPriority = (typeof TODO_PRIORITIES)[number]

export type TodoReminder = {
  at: string
  channel: string
  sent: boolean
}

export type TodoSubtask = {
  id: string
  title: string
  completed: boolean
  dueDate: string | null
}

export type Todo = {
  id: string
  user: string
  title: string
  description: string | null
  completed: boolean
  priority: TodoPriority
  dueDate: string | null
  reminders: TodoReminder[]
  tags: string[]
  subtasks: TodoSubtask[]
  createdAt: string
  updatedAt: string
}

export type TodoListParams = {
  page?: number
  limit?: number
  search?: string
  completed?: boolean
  priority?: TodoPriority
  tag?: string
  dueBefore?: string
  dueAfter?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title' | 'completed'
  sortOrder?: 'asc' | 'desc'
}

export type CreateTodoInput = {
  title: string
  description?: string | null
  completed?: boolean
  priority?: TodoPriority
  dueDate?: string | null
  reminders?: Array<{
    at: string
    channel?: string
    sent?: boolean
  }>
  tags?: string[]
  subtasks?: Array<{
    title: string
    completed?: boolean
    dueDate?: string | null
  }>
}

export type UpdateTodoInput = Partial<CreateTodoInput>
