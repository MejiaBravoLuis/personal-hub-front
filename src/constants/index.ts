export const ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  spotify: '/spotify',
  instagram: '/instagram',
  whatsapp: '/whatsapp',
  canvas: '/canvas',
  todos: '/todos',
  calendar: '/calendar',
  profile: '/profile',
  settings: '/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const APP_NAME = 'Hubify'
export const APP_TAGLINE = 'Tu plataforma de productividad modular'
