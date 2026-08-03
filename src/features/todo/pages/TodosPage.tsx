import { CheckSquare } from 'lucide-react'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function TodosPage() {
  return (
    <ModulePlaceholder
      title="Todos"
      description="Lista de tareas nativa de Hubify. La lógica CRUD llegará en un sprint posterior."
      icon={<CheckSquare className="h-5 w-5" />}
      accentLabel="Vista previa"
    />
  )
}
