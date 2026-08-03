import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/layout/PageHeader'
import { useTheme } from '@/providers'
import type { ThemeMode } from '@/themes/theme'
import { cn } from '@/utils/cn'

const themeOptions: { id: ThemeMode; label: string; hint: string }[] = [
  { id: 'light', label: 'Claro', hint: 'Superficies luminosas' },
  { id: 'dark', label: 'Oscuro', hint: 'Contraste suave' },
  { id: 'system', label: 'Sistema', hint: 'Sigue el OS' },
]

export function SettingsPage() {
  const {
    mode,
    setMode,
    dynamicEnabled,
    setDynamicEnabled,
  } = useTheme()

  return (
    <div>
      <PageHeader
        title="Configuración"
        description="Preferencias visuales de la plataforma. Preparado para tema dinámico (Spotify)."
      />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Apariencia</CardTitle>
            <Badge variant="default">Tema</Badge>
          </CardHeader>
          <CardDescription className="mb-4">
            Todos los colores usan variables CSS. Nunca hardcodees tokens en
            componentes.
          </CardDescription>
          <div className="grid gap-3 sm:grid-cols-3">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={cn(
                  'rounded-[var(--radius-md)] border px-4 py-3 text-left transition-colors',
                  mode === option.id
                    ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]',
                )}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                <span className="mt-1 block text-xs text-[var(--foreground-muted)]">
                  {option.hint}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tema dinámico</CardTitle>
            <Badge variant={dynamicEnabled ? 'accent' : 'default'}>
              {dynamicEnabled ? 'Activo' : 'Listo'}
            </Badge>
          </CardHeader>
          <CardDescription className="mb-4">
            También puedes activarlo desde Spotify: al elegir una canción mock
            se aplica la paleta sobre bordes y acentos de toda la plataforma.
          </CardDescription>
          <Button
            variant={dynamicEnabled ? 'secondary' : 'primary'}
            onClick={() => setDynamicEnabled(!dynamicEnabled)}
          >
            {dynamicEnabled ? 'Desactivar tint dinámico' : 'Activar tint dinámico'}
          </Button>
        </Card>
      </div>
    </div>
  )
}
