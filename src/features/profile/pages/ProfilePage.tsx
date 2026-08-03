import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardTitle } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/layout/PageHeader'

export function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Perfil"
        description="Información de cuenta simulada. Sin autenticación real en este sprint."
        actions={<Badge>Simulado</Badge>}
      />

      <Card className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar fallback="HU" size="lg" />
        <div className="flex-1 space-y-1">
          <CardTitle>Usuario Hubify</CardTitle>
          <CardDescription>usuario@hubify.app</CardDescription>
          <div className="pt-2">
            <Badge variant="accent">Plan visual · F1.0</Badge>
          </div>
        </div>
        <Button variant="secondary" disabled>
          Editar perfil
        </Button>
      </Card>
    </div>
  )
}
