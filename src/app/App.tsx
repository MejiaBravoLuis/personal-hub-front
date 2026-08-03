import { RouterProvider } from 'react-router-dom'
import { AuthBootstrap } from '@/features/auth'
import { QueryProvider, ThemeProvider } from '@/providers'
import { router } from '@/router'

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthBootstrap>
          <RouterProvider router={router} />
        </AuthBootstrap>
      </ThemeProvider>
    </QueryProvider>
  )
}
