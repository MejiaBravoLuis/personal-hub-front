export type ThemeMode = 'light' | 'dark' | 'system'

/** Album-driven colors that re-tint the whole shell. */
export type DynamicPalette = {
  primary: string
  secondary: string
  surface: string
  foreground: string
}

export const THEME_STORAGE_KEY = 'hubify-theme'

export const DEFAULT_DYNAMIC_PALETTE: DynamicPalette = {
  primary: '#0ea5e9',
  secondary: '#38bdf8',
  surface: '#111827',
  foreground: '#f1f5f9',
}

export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return mode
}

/**
 * Applies base theme (light/dark) and optional dynamic album tint.
 * Keeps data-theme for light/dark and uses data-dynamic separately
 * so dynamic mode never loses the underlying theme.
 */
export function applyThemeAttributes(
  mode: ThemeMode,
  dynamicEnabled: boolean,
  palette: DynamicPalette = DEFAULT_DYNAMIC_PALETTE,
) {
  const root = document.documentElement
  const resolved = resolveTheme(mode)

  root.dataset.theme = resolved
  root.dataset.dynamic = dynamicEnabled ? 'true' : 'false'
  root.style.colorScheme = resolved

  root.style.setProperty('--dynamic-primary', palette.primary)
  root.style.setProperty('--dynamic-secondary', palette.secondary)
  root.style.setProperty('--dynamic-surface', palette.surface)
  root.style.setProperty('--dynamic-foreground', palette.foreground)
}
