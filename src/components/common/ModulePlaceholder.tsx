import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/Card'
import { EmptyState } from '@/components/feedback/EmptyState'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'

type ModulePlaceholderProps = {
  title: string
  description: string
  icon: ReactNode
  accentLabel?: string
}

export function ModulePlaceholder({
  title,
  description,
  icon,
  accentLabel = 'Módulo visual',
}: ModulePlaceholderProps) {
  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={<Badge variant="accent">{accentLabel}</Badge>}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="min-h-28">
            <CardTitle className="text-sm text-[var(--foreground-muted)]">
              Espacio reservado {item}
            </CardTitle>
            <CardDescription className="mt-2">
              Placeholder listo para datos reales en sprints futuros.
            </CardDescription>
          </Card>
        ))}
      </div>

      <EmptyState
        icon={icon}
        title={`${title} aún no está conectado`}
        description="Este sprint solo construye la experiencia visual. Las integraciones OAuth / API Keys llegarán después, sin rediseñar la interfaz."
        action={
          <Button variant="secondary" disabled>
            Conectar próximamente
          </Button>
        }
      />
    </div>
  )
}
