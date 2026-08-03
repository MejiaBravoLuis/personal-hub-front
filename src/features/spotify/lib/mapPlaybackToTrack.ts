import type { MockTrack } from '../data/mockTracks'
import type { SpotifyPlayback } from '../types'

const FALLBACK_PALETTE = {
  primary: '#1DB954',
  secondary: '#116c3a',
}

/** Adapts Spotify playback into the existing player track shape */
export function mapPlaybackToTrack(
  playback: SpotifyPlayback | undefined,
): MockTrack | null {
  const item = playback?.item
  if (!item) return null

  const progress =
    typeof playback?.progressMs === 'number' && playback.progressMs > 0
      ? Math.min(playback.progressMs / 210_000, 0.98)
      : 0.08

  return {
    id: item.id,
    title: item.name,
    artist: item.artists.join(', ') || 'Artista',
    album: item.album || 'Álbum',
    duration: '—',
    progress,
    hasVideo: false,
    lyrics: [
      'Reproducción en vivo desde Spotify',
      'El control de play/pause aún no está en el backend',
      'Usa la app de Spotify para controlar la sesión',
    ],
    palette: FALLBACK_PALETTE,
    imageUrl: item.image,
    externalUrl: item.externalUrl,
  }
}
