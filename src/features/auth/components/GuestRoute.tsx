import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuthStore } from '../store/auth.store'

/** Auth pages: redirect away when already signed in */
export function GuestRoute() {
  const status = useAuthStore((s) => s.status)

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
