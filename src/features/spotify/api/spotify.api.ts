import { api, type ApiSuccess } from '@/services/api'
import type {
  SpotifyConnection,
  SpotifyPlayback,
  SpotifyPlaylistsPage,
  SpotifyProfile,
} from '../types'

export async function getSpotifyConnection() {
  const { data } = await api.get<ApiSuccess<SpotifyConnection>>(
    '/spotify/connection',
  )
  return data.data
}

export async function getSpotifyProfile() {
  const { data } = await api.get<ApiSuccess<{ profile: SpotifyProfile }>>(
    '/spotify/profile',
  )
  return data.data.profile
}

export async function getSpotifyPlayback() {
  const { data } = await api.get<ApiSuccess<{ playback: SpotifyPlayback }>>(
    '/spotify/playback',
  )
  return data.data.playback
}

export async function getSpotifyPlaylists(limit = 20, offset = 0) {
  const { data } = await api.get<ApiSuccess<{ playlists: SpotifyPlaylistsPage }>>(
    '/spotify/playlists',
    { params: { limit, offset } },
  )
  return data.data.playlists
}

export async function startSpotifyOAuth() {
  const { data } = await api.get<
    ApiSuccess<{
      provider: string
      url: string
      redirectUri: string
      scopes: string[]
    }>
  >('/integrations/spotify/oauth/start')
  return data.data
}

export async function disconnectSpotify() {
  const { data } = await api.post<ApiSuccess<{ integration: unknown }>>(
    '/integrations/spotify/disconnect',
  )
  return data.data.integration
}

export async function syncSpotify() {
  const { data } = await api.post<
    ApiSuccess<{
      integration: unknown
      sync: { items: number; syncedAt: string }
    }>
  >('/integrations/spotify/sync')
  return data.data
}
