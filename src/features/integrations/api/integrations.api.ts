import { api, type ApiSuccess } from '@/services/api'

export type IntegrationSummary = {
  id: string
  provider: string
  status: string
  metadata?: Record<string, unknown>
}

export type ProviderConnection = {
  connected: boolean
  provider: string
  integration: IntegrationSummary | null | {
    id: string
    status: string
    scopes?: string[]
    metadata?: Record<string, unknown>
    lastSync?: string | null
    expiresAt?: string | null
  }
}

export async function listIntegrations() {
  const { data } = await api.get<
    ApiSuccess<{ integrations: IntegrationSummary[] }>
  >('/integrations')
  return data.data.integrations
}

export async function getInstagramConnection() {
  const { data } = await api.get<ApiSuccess<ProviderConnection>>(
    '/instagram/connection',
  )
  return data.data
}

export async function startProviderOAuth(provider: string) {
  const { data } = await api.get<
    ApiSuccess<{
      provider: string
      url: string
      redirectUri: string
      scopes: string[]
    }>
  >(`/integrations/${provider}/oauth/start`)
  return data.data
}
