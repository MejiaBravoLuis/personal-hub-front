import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardTitle } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuthStore } from '@/features/auth'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    return null
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim()
  const fallback =
    `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() ||
    user.username.slice(0, 2).toUpperCase()

  return (
    <div>
      <PageHeader
        title="Perfil"
        description="Datos de tu cuenta conectada al backend de Hubify."
        actions={
          <Badge variant={user.verified ? 'accent' : 'default'}>
            {user.verified ? 'Verificado' : 'Sin verificar'}
          </Badge>
        }
      />

      <Card className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar
          src={user.avatar ?? undefined}
          fallback={fallback}
          size="lg"
        />
        <div className="flex-1 space-y-1">
          <CardTitle>{fullName}</CardTitle>
          <CardDescription>
            @{user.username} · {user.email}
          </CardDescription>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="accent">{user.role}</Badge>
            <Badge>{user.status}</Badge>
          </div>
        </div>
        <Button variant="secondary" disabled>
          Editar perfil
        </Button>
      </Card>
    </div>
  )
}
