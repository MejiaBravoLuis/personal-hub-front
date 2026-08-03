import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  disconnectSpotify,
  getSpotifyConnection,
  getSpotifyPlayback,
  getSpotifyPlaylists,
  getSpotifyProfile,
  startSpotifyOAuth,
  syncSpotify,
} from '../api/spotify.api'

export const spotifyKeys = {
  all: ['spotify'] as const,
  connection: ['spotify', 'connection'] as const,
  profile: ['spotify', 'profile'] as const,
  playback: ['spotify', 'playback'] as const,
  playlists: ['spotify', 'playlists'] as const,
}

export function useSpotifyConnection() {
  return useQuery({
    queryKey: spotifyKeys.connection,
    queryFn: getSpotifyConnection,
    staleTime: 15_000,
  })
}

export function useSpotifyProfile(enabled: boolean) {
  return useQuery({
    queryKey: spotifyKeys.profile,
    queryFn: getSpotifyProfile,
    enabled,
  })
}

export function useSpotifyPlayback(enabled: boolean) {
  return useQuery({
    queryKey: spotifyKeys.playback,
    queryFn: getSpotifyPlayback,
    enabled,
    refetchInterval: enabled ? 12_000 : false,
  })
}

export function useSpotifyPlaylists(enabled: boolean) {
  return useQuery({
    queryKey: spotifyKeys.playlists,
    queryFn: () => getSpotifyPlaylists(30, 0),
    enabled,
  })
}

export function useConnectSpotify() {
  return useMutation({
    mutationFn: startSpotifyOAuth,
    onSuccess: (result) => {
      window.location.assign(result.url)
    },
  })
}

export function useDisconnectSpotify() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: disconnectSpotify,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: spotifyKeys.all })
    },
  })
}

export function useSyncSpotify() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: syncSpotify,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: spotifyKeys.all })
    },
  })
}
