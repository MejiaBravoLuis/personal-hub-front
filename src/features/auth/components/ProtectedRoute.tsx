import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuthStore } from '../store/auth.store'

export function ProtectedRoute() {
  const status = useAuthStore((s) => s.status)
  const location = useLocation()

  if (status !== 'authenticated') {
    return (
      <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
    )
  }

  return <Outlet />
}
