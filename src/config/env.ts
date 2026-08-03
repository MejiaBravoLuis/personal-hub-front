/**
 * Environment configuration.
 * Secrets never live here — only public Vite vars.
 */
export const env = {
  appName: 'Hubify',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
} as const
