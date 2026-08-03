import { useMutation } from '@tanstack/react-query'
import { startProviderOAuth } from '../api/integrations.api'

export function useConnectProvider(provider: string) {
  return useMutation({
    mutationFn: () => startProviderOAuth(provider),
    onSuccess: (result) => {
      window.location.assign(result.url)
    },
  })
}
