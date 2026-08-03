export type IgStory = {
  id: string
  label: string
  self?: boolean
  unseen?: boolean
}

export type IgPost = {
  id: string
  user: string
  caption: string
  likes: string
  comments: number
  time: string
  tone: 'warm' | 'cool' | 'neutral'
}

export type IgMessage = {
  id: string
  from: string
  preview: string
  time: string
  unread: boolean
}

export type IgExploreItem = {
  id: string
  label: string
  tone: 'warm' | 'cool' | 'neutral'
}

export const IG_PROFILE = {
  username: 'hubify.user',
  name: 'Hubify',
  bio: 'Plataforma modular · mock visual F1.0',
  posts: 128,
  followers: '4.2k',
  following: 310,
}

export const IG_STORIES: IgStory[] = [
  { id: '1', label: 'Tú', self: true },
  { id: '2', label: 'maya', unseen: true },
  { id: '3', label: 'leo', unseen: true },
  { id: '4', label: 'studio', unseen: true },
  { id: '5', label: 'nova' },
  { id: '6', label: 'kai', unseen: true },
  { id: '7', label: 'aria' },
  { id: '8', label: 'frame' },
]

export const IG_FEED: IgPost[] = [
  {
    id: '1',
    user: 'studio.light',
    caption: 'Morning light studies · #design',
    likes: '2.4k',
    comments: 48,
    time: '2 h',
    tone: 'warm',
  },
  {
    id: '2',
    user: 'urban.frames',
    caption: 'City grain after rain',
    likes: '891',
    comments: 22,
    time: '5 h',
    tone: 'cool',
  },
  {
    id: '3',
    user: 'soft.archive',
    caption: 'Quiet corners and slow mornings',
    likes: '1.1k',
    comments: 31,
    time: '1 d',
    tone: 'neutral',
  },
  {
    id: '4',
    user: 'maya.studio',
    caption: 'New set dropping Friday ✨',
    likes: '3.8k',
    comments: 120,
    time: '1 d',
    tone: 'warm',
  },
]

export const IG_MESSAGES: IgMessage[] = [
  {
    id: '1',
    from: 'maya.studio',
    preview: '¿Te gustó el set de hoy?',
    time: '2m',
    unread: true,
  },
  {
    id: '2',
    from: 'leo.frames',
    preview: 'Te envió una foto',
    time: '18m',
    unread: true,
  },
  {
    id: '3',
    from: 'nova.archive',
    preview: 'Respuesta a tu story',
    time: '1h',
    unread: true,
  },
  {
    id: '4',
    from: 'studio.light',
    preview: 'Nos vemos en el lab',
    time: 'Ayer',
    unread: false,
  },
  {
    id: '5',
    from: 'kai.motion',
    preview: 'El reel quedó brutal',
    time: 'Ayer',
    unread: false,
  },
  {
    id: '6',
    from: 'aria.tone',
    preview: 'Gracias por el follow 🙌',
    time: '2d',
    unread: false,
  },
]

export const IG_EXPLORE: IgExploreItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `e${i + 1}`,
  label: ['Design', 'Travel', 'Food', 'Art', 'City', 'Nature'][i % 6],
  tone: (['warm', 'cool', 'neutral'] as const)[i % 3],
}))

export const IG_GRID = Array.from({ length: 9 }, (_, i) => ({
  id: `g${i + 1}`,
  tone: (['warm', 'cool', 'neutral'] as const)[i % 3],
}))

export type InstagramView = 'home' | 'search' | 'messages' | 'profile'

export function toneGradient(tone: 'warm' | 'cool' | 'neutral') {
  if (tone === 'warm') {
    return 'linear-gradient(145deg, color-mix(in srgb, var(--module-instagram-from) 45%, var(--surface-muted)), var(--surface-muted))'
  }
  if (tone === 'cool') {
    return 'linear-gradient(145deg, color-mix(in srgb, var(--module-instagram-to) 40%, var(--surface-muted)), var(--surface-muted))'
  }
  return 'linear-gradient(145deg, color-mix(in srgb, var(--foreground) 8%, var(--surface-muted)), var(--surface-muted))'
}
