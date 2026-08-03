import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { APP_NAME, APP_TAGLINE, ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/providers'

export function AuthLayout() {
  const location = useLocation()
  const { mode, toggleMode } = useTheme()
  const isRegister = location.pathname === ROUTES.register

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 10%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%),
            radial-gradient(ellipse 60% 40% at 90% 80%, color-mix(in srgb, var(--dynamic-secondary) 16%, transparent), transparent 50%)
          `,
        }}
      />

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between">
          <Link to={ROUTES.root} className="font-display text-xl font-semibold tracking-tight">
            {APP_NAME}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cambiar tema"
            onClick={toggleMode}
          >
            {mode === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden lg:block">
            <p className="mb-3 text-sm font-medium tracking-wide text-[var(--accent)] uppercase">
              Plataforma modular
            </p>
            <h1 className="font-display max-w-xl text-4xl font-semibold tracking-tight text-[var(--foreground)] xl:text-5xl">
              Un solo lugar para todos tus servicios digitales.
            </h1>
            <p className="mt-4 max-w-lg text-base text-[var(--foreground-muted)]">
              {APP_TAGLINE}. Conecta cuentas, administra módulos y trabaja sin
              saltar entre aplicaciones.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 flex rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)]/70 p-1 shadow-[var(--shadow-sm)] backdrop-blur">
              <Link
                to={ROUTES.login}
                className={`flex-1 rounded-[var(--radius-full)] px-4 py-2 text-center text-sm font-medium transition-colors ${
                  !isRegister
                    ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                Iniciar sesión
              </Link>
              <Link
                to={ROUTES.register}
                className={`flex-1 rounded-[var(--radius-full)] px-4 py-2 text-center text-sm font-medium transition-colors ${
                  isRegister
                    ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                Crear cuenta
              </Link>
            </div>

            <div className="glass-panel rounded-[var(--radius-xl)] p-6 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: isRegister ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRegister ? -12 : 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
