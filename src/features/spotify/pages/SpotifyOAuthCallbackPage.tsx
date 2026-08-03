import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Loading } from '@/components/feedback/Loading'
import { ROUTES } from '@/constants'
import { useQueryClient } from '@tanstack/react-query'
import { spotifyKeys } from '../hooks/useSpotify'

/** Handles backend OAuth redirect: /integrations/spotify?status=... */
export function SpotifyOAuthCallbackPage() {
  const [params] = useSearchParams()
  const queryClient = useQueryClient()
  const status = params.get('status')
  const message = params.get('message')
  const code = params.get('code')

  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey: spotifyKeys.all })
  }, [queryClient])

  if (!status) {
    return <Navigate to={ROUTES.spotify} replace />
  }

  const search = new URLSearchParams()
  search.set('oauth', status)
  if (message) search.set('message', message)
  if (code) search.set('code', code)

  return (
    <div className="grid min-h-dvh place-items-center">
      <Loading label="Volviendo a Spotify…" />
      <Navigate to={`${ROUTES.spotify}?${search.toString()}`} replace />
    </div>
  )
}
