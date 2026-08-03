import { GraduationCap } from 'lucide-react'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function CanvasPage() {
  return (
    <ModulePlaceholder
      title="Canvas LMS"
      description="Cursos, entregas y anuncios académicos. Cada usuario conectará su propia API Key."
      icon={<GraduationCap className="h-5 w-5" />}
    />
  )
}
