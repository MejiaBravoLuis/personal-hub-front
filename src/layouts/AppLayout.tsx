import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { AppDock } from '@/components/layout/AppDock'
import { AppHeader } from '@/components/layout/AppHeader'
import { Container } from '@/components/layout/Container'
import { ROUTES } from '@/constants'
import { cn } from '@/utils/cn'

/** Modules that own the full viewport between header and dock */
const FULL_BLEED_ROUTES = new Set<string>([ROUTES.whatsapp, ROUTES.spotify])

export function AppLayout() {
  const location = useLocation()
  const isFullBleed = FULL_BLEED_ROUTES.has(location.pathname)

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AppHeader />
      <main
        className={cn(
          'flex min-h-0 flex-1 flex-col',
          isFullBleed
            ? 'pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-0'
            : 'pb-28 pt-6 sm:pb-32 sm:pt-8',
        )}
      >
        {isFullBleed ? (
          <div className="flex min-h-0 flex-1 flex-col px-2 pt-2 sm:px-4 sm:pt-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <Container>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Container>
        )}
      </main>
      <AppDock />
    </div>
  )
}
