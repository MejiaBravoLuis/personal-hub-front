import type { DynamicPalette } from '@/themes/theme'

export type MockTrack = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  /** 0–1 visual progress */
  progress: number
  hasVideo: boolean
  lyrics: string[]
  /** Simulated colors extracted from album art */
  palette: Pick<DynamicPalette, 'primary' | 'secondary'>
  /** Real album art when connected to Spotify */
  imageUrl?: string | null
  externalUrl?: string | null
}

/**
 * Mock catalog for the Spotify module + dynamic-theme demo.
 * Later: replace with Spotify API + real color/lyrics/video data.
 */
export const MOCK_TRACKS: MockTrack[] = [
  {
    id: 'midnight-city',
    title: 'Midnight City',
    artist: 'M83',
    album: "Hurry Up, We're Dreaming",
    duration: '4:03',
    progress: 0.42,
    hasVideo: true,
    lyrics: [
      'Waiting in a car',
      'Waiting for a ride in the dark',
      'The night city grows',
      'Look and see her eyes',
      'They open up and glow',
      'Waiting in a car',
      'Waiting for a ride in the dark',
    ],
    palette: { primary: '#7c5cff', secondary: '#c4b5fd' },
  },
  {
    id: 'blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    progress: 0.18,
    hasVideo: true,
    lyrics: [
      'I\'ve been tryna call',
      'I\'ve been on my own for long enough',
      'Maybe you can show me',
      'How to love, maybe',
      'I feel like I\'m just missing something',
      'When you\'re gone',
    ],
    palette: { primary: '#e11d48', secondary: '#fb7185' },
  },
  {
    id: 'weightless',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Weightless',
    duration: '8:00',
    progress: 0.55,
    hasVideo: false,
    lyrics: [
      '···· instrumental ····',
      'Soft pads drift in',
      'Low pulse under glass',
      'Breath slows with the tide',
      'Weightless, still floating',
    ],
    palette: { primary: '#0d9488', secondary: '#5eead4' },
  },
  {
    id: 'sunset-lover',
    title: 'Sunset Lover',
    artist: 'Petit Biscuit',
    album: 'Presence',
    duration: '3:57',
    progress: 0.67,
    hasVideo: true,
    lyrics: [
      'Colors melt on the horizon',
      'We chase the last warm light',
      'Sunset lover, stay a while',
      'Feet in sand, eyes half closed',
      'Let the evening take us home',
    ],
    palette: { primary: '#ea580c', secondary: '#fdba74' },
  },
  {
    id: 'nightcall',
    title: 'Nightcall',
    artist: 'Kavinsky',
    album: 'OutRun',
    duration: '4:17',
    progress: 0.31,
    hasVideo: false,
    lyrics: [
      'I\'m giving you a night call',
      'To tell you how I feel',
      'I want to drive you through the night',
      'Down the hills',
      'I\'m gonna tell you something you don\'t want to hear',
    ],
    palette: { primary: '#2563eb', secondary: '#93c5fd' },
  },
]

export const MOCK_PLAYLISTS = [
  { id: 'p1', name: 'Focus Flow', tracks: 42 },
  { id: 'p2', name: 'Late Drive', tracks: 28 },
  { id: 'p3', name: 'Deep Work', tracks: 35 },
  { id: 'p4', name: 'Afterglow', tracks: 19 },
] as const

export type PlayerLayout = 'normal' | 'turntable' | 'video' | 'lyrics'

export const PLAYER_LAYOUTS: {
  id: PlayerLayout
  label: string
  hint: string
}[] = [
  { id: 'normal', label: 'Normal', hint: 'Portada clásica' },
  { id: 'turntable', label: 'Tocadiscos', hint: 'Vinilo animado' },
  { id: 'video', label: 'Video', hint: 'Si hay clip' },
  { id: 'lyrics', label: 'Letra', hint: 'Karaoke mock' },
]

export const PLAYER_LAYOUT_STORAGE_KEY = 'hubify-spotify-player-layout'
