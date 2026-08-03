import { FaInstagram } from 'react-icons/fa'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function InstagramPage() {
  return (
    <ModulePlaceholder
      title="Instagram"
      description="Contenido social y métricas, conectados con la cuenta del usuario."
      icon={<FaInstagram className="h-5 w-5" />}
    />
  )
}
