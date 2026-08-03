import { Music2 } from 'lucide-react'
import { ModulePlaceholder } from '@/components/common/ModulePlaceholder'

export function SpotifyPage() {
  return (
    <ModulePlaceholder
      title="Spotify"
      description="Módulo musical de Hubify. El tema dinámico tomará colores de la portada del álbum en un sprint futuro."
      icon={<Music2 className="h-5 w-5" />}
    />
  )
}
