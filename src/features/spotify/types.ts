export type SpotifyConnection =
  | {
      connected: false
      provider: 'spotify'
      integration: null
    }
  | {
      connected: boolean
      provider: 'spotify'
      integration: {
        id: string
        status: string
        scopes: string[]
        metadata: Record<string, unknown>
        lastSync: string | null
        expiresAt: string | null
      }
    }

export type SpotifyProfile = {
  id: string
  displayName: string
  email: string | null
  product: string | null
  country: string | null
  followers: number
  images: Array<{
    url: string
    height: number | null
    width: number | null
  }>
  externalUrl: string | null
}

export type SpotifyPlayback = {
  isPlaying: boolean
  progressMs?: number | null
  item: {
    id: string
    name: string
    type: string
    artists: string[]
    album: string | null
    image: string | null
    externalUrl: string | null
  } | null
}

export type SpotifyPlaylist = {
  id: string
  name: string
  description: string | null
  public: boolean | null
  collaborative: boolean
  tracks: number
  image: string | null
  externalUrl: string | null
}

export type SpotifyPlaylistsPage = {
  total: number
  limit: number
  offset: number
  items: SpotifyPlaylist[]
}
