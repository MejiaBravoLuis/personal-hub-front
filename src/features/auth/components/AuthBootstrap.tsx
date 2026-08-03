import { useEffect, type ReactNode } from 'react'
import { Loading } from '@/components/feedback/Loading'
import { useAuthStore } from '../store/auth.store'

type AuthBootstrapProps = {
  children: ReactNode
}

/** Hydrates session from stored tokens before rendering routes */
export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const status = useAuthStore((s) => s.status)
  const bootstrap = useAuthStore((s) => s.bootstrap)

  useEffect(() => {
    void bootstrap()
  }, [bootstrap])

  if (status === 'bootstrapping') {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loading label="Preparando tu sesión…" />
      </div>
    )
  }

  return children
}
