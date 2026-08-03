import { useQuery } from '@tanstack/react-query'
import { useSpotifyConnection } from '@/features/spotify/hooks/useSpotify'
import {
  getInstagramConnection,
  listIntegrations,
} from '../api/integrations.api'

export const integrationKeys = {
  all: ['integrations'] as const,
  list: ['integrations', 'list'] as const,
  instagram: ['integrations', 'instagram', 'connection'] as const,
}

function isConnectedStatus(status?: string) {
  return status === 'CONNECTED'
}

/**
 * Connection locks for external modules.
 * Native modules (todos, profile, settings) stay unlocked.
 */
export function useModuleLocks() {
  const spotify = useSpotifyConnection()
  const instagram = useQuery({
    queryKey: integrationKeys.instagram,
    queryFn: getInstagramConnection,
    staleTime: 20_000,
  })
  const integrations = useQuery({
    queryKey: integrationKeys.list,
    queryFn: listIntegrations,
    staleTime: 20_000,
  })

  const canvas = integrations.data?.find(
    (item) => item.provider === 'canvas' && isConnectedStatus(item.status),
  )
  const whatsapp = integrations.data?.find(
    (item) => item.provider === 'whatsapp' && isConnectedStatus(item.status),
  )

  return {
    isLoading:
      spotify.isLoading || instagram.isLoading || integrations.isLoading,
    locks: {
      spotify: !spotify.data?.connected,
      instagram: !instagram.data?.connected,
      canvas: !canvas,
      /** No WhatsApp provider yet — keep locked */
      whatsapp: !whatsapp,
    },
    spotify,
    instagram,
    integrations,
  }
}
