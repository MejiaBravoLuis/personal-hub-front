import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getApiErrorMessage } from '@/services/api'
import { useCreateTodo } from '../hooks/useTodos'
import { TODO_PRIORITIES, type TodoPriority } from '../types'
import { PRIORITY_LABELS } from '../lib/priority'

const composerSchema = z.object({
  title: z.string().trim().min(1, 'Escribe una tarea').max(200),
  priority: z.enum(TODO_PRIORITIES),
  dueDate: z.string().optional(),
})

type ComposerValues = z.infer<typeof composerSchema>

export function TodoComposer() {
  const createTodo = useCreateTodo()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComposerValues>({
    resolver: zodResolver(composerSchema),
    defaultValues: {
      title: '',
      priority: 'MEDIUM',
      dueDate: '',
    },
  })

  const onSubmit = async (values: ComposerValues) => {
    setError(null)
    try {
      await createTodo.mutateAsync({
        title: values.title.trim(),
        priority: values.priority as TodoPriority,
        dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
      })
      reset({ title: '', priority: values.priority, dueDate: '' })
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo crear la tarea'))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <Input
            label="Nueva tarea"
            placeholder="¿Qué quieres hacer?"
            autoComplete="off"
            error={errors.title?.message}
            {...register('title')}
          />
        </div>
        <label className="flex w-full flex-col gap-1.5 text-sm sm:w-36">
          <span className="font-medium text-[var(--foreground)]">Prioridad</span>
          <select
            className="h-11 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--foreground)] shadow-[var(--shadow-sm)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
            {...register('priority')}
          >
            {TODO_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </label>
        <div className="w-full sm:w-44">
          <Input label="Vence" type="date" {...register('dueDate')} />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            loading={isSubmitting || createTodo.isPending}
          >
            <Plus className="h-4 w-4" aria-hidden />
            Agregar
          </Button>
        </div>
      </div>
      {error ? (
        <p className="text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}
