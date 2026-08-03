import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun, Monitor } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/constants'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Dropdown } from '@/components/ui/Dropdown'
import { Search } from '@/components/ui/Search'
import { useTheme } from '@/providers'
import type { ThemeMode } from '@/themes/theme'
import { cn } from '@/utils/cn'

type AppHeaderProps = {
  className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
  const navigate = useNavigate()
  const { mode, setMode } = useTheme()

  const themeIcon =
    mode === 'dark' ? (
      <Moon className="h-4 w-4" />
    ) : mode === 'light' ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    )

  const cycleTheme = () => {
    const order: ThemeMode[] = ['light', 'dark', 'system']
    const next = order[(order.indexOf(mode) + 1) % order.length]
    setMode(next)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.dashboard}
          className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]"
        >
          {APP_NAME}
        </Link>

        <div className="mx-auto hidden w-full max-w-md md:block">
          <Search
            placeholder="Buscar módulos, acciones…"
            aria-label="Buscar en Hubify"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Tema actual: ${mode}. Cambiar tema`}
            onClick={cycleTheme}
          >
            {themeIcon}
          </Button>

          <Dropdown
            label="Menú de cuenta"
            items={[
              {
                id: 'profile',
                label: 'Perfil',
                onSelect: () => navigate(ROUTES.profile),
              },
              {
                id: 'settings',
                label: 'Configuración',
                onSelect: () => navigate(ROUTES.settings),
              },
              {
                id: 'logout',
                label: 'Cerrar sesión',
                danger: true,
                onSelect: () => navigate(ROUTES.login),
              },
            ]}
            trigger={
              <Avatar
                fallback="HU"
                size="sm"
                className="cursor-pointer transition-transform hover:scale-105"
              />
            }
          />
        </div>
      </div>
    </header>
  )
}
