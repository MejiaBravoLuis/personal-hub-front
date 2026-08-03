import type { DynamicPalette, ThemeMode } from '@/themes/theme'
import { resolveTheme } from '@/themes/theme'

/**
 * Builds a full dynamic palette from album accents,
 * preserving readable surfaces for the active light/dark mode.
 *
 * Later: swap this for a real extractor (e.g. Vibrant / backend).
 */
export function paletteFromAlbumColors(
  primary: string,
  secondary: string,
  mode: ThemeMode,
): DynamicPalette {
  const resolved = resolveTheme(mode)

  if (resolved === 'dark') {
    return {
      primary,
      secondary,
      surface: '#111827',
      foreground: '#f1f5f9',
    }
  }

  return {
    primary,
    secondary,
    surface: '#ffffff',
    foreground: '#0f172a',
  }
}
