import type { DynamicPalette } from '@/themes/theme'

export type MockTrack = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  /** 0–1 visual progress */
  progress: number
  /** Simulated colors extracted from album art */
  palette: Pick<DynamicPalette, 'primary' | 'secondary'>
}

/**
 * Mock catalog for the dynamic-theme demo.
 * Later: replace with Spotify API + real color extraction.
 */
export const MOCK_TRACKS: MockTrack[] = [
  {
    id: 'midnight-city',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: '4:03',
    progress: 0.42,
    palette: { primary: '#7c5cff', secondary: '#c4b5fd' },
  },
  {
    id: 'blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    progress: 0.18,
    palette: { primary: '#e11d48', secondary: '#fb7185' },
  },
  {
    id: 'weightless',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Weightless',
    duration: '8:00',
    progress: 0.55,
    palette: { primary: '#0d9488', secondary: '#5eead4' },
  },
  {
    id: 'sunset-lover',
    title: 'Sunset Lover',
    artist: 'Petit Biscuit',
    album: 'Presence',
    duration: '3:57',
    progress: 0.67,
    palette: { primary: '#ea580c', secondary: '#fdba74' },
  },
  {
    id: 'nightcall',
    title: 'Nightcall',
    artist: 'Kavinsky',
    album: 'OutRun',
    duration: '4:17',
    progress: 0.31,
    palette: { primary: '#2563eb', secondary: '#93c5fd' },
  },
]

export const MOCK_PLAYLISTS = [
  { name: 'Focus Flow', tracks: 42 },
  { name: 'Late Drive', tracks: 28 },
  { name: 'Deep Work', tracks: 35 },
] as const
