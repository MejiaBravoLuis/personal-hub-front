import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/providers'
import { router } from '@/router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
