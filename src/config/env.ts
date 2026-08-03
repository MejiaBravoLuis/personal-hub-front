/**
 * Environment configuration scaffold.
 * No secrets belong here — users will connect their own accounts later.
 */
export const env = {
  appName: 'Hubify',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
