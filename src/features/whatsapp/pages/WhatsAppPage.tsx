import { MessageCircle } from 'lucide-react'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function WhatsAppPage() {
  return (
    <ModulePlaceholder
      title="WhatsApp"
      description="Mensajería y contactos desde un módulo independiente dentro de la plataforma."
      icon={<MessageCircle className="h-5 w-5" />}
    />
  )
}
