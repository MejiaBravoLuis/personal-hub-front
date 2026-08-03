import { FormAlert } from '@/features/auth'
import { CensoredModule } from '@/components/common/CensoredModule'
import { getApiErrorMessage } from '@/services/api'
import { useConnectSpotify } from '../hooks/useSpotify'
import { SpotifyLockedPreview } from './SpotifyLockedPreview'

type SpotifyConnectPanelProps = {
  errorMessage?: string | null
}

export function SpotifyConnectPanel({ errorMessage }: SpotifyConnectPanelProps) {
  const connect = useConnectSpotify()

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {errorMessage ? <FormAlert variant="error">{errorMessage}</FormAlert> : null}
      {connect.isError ? (
        <FormAlert variant="error">
          {getApiErrorMessage(
            connect.error,
            'No se pudo iniciar la conexión con Spotify',
          )}
        </FormAlert>
      ) : null}

      <CensoredModule
        locked
        title="Spotify bloqueado"
        description="Conecta tu cuenta para ver reproducción en vivo y tus playlists."
        actionLabel="Conectar con Spotify"
        actionLoading={connect.isPending}
        onAction={() => connect.mutate()}
        accent="var(--module-spotify)"
        className="flex min-h-0 flex-1 flex-col"
      >
        <SpotifyLockedPreview />
      </CensoredModule>
    </div>
  )
}
