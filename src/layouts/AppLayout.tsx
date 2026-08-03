import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { AppDock } from '@/components/layout/AppDock'
import { AppHeader } from '@/components/layout/AppHeader'
import { Container } from '@/components/layout/Container'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-dvh">
      <AppHeader />
      <main className="pb-28 pt-6 sm:pb-32 sm:pt-8">
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
      </main>
      <AppDock />
    </div>
  )
}
