import { CalendarDays } from 'lucide-react'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function CalendarPage() {
  return (
    <ModulePlaceholder
      title="Calendario"
      description="Agenda unificada para eventos de Canvas, Todos y futuras integraciones."
      icon={<CalendarDays className="h-5 w-5" />}
      accentLabel="Vista previa"
    />
  )
}
