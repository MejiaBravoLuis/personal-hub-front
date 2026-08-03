import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyThemeAttributes,
  DEFAULT_DYNAMIC_PALETTE,
  THEME_STORAGE_KEY,
  type DynamicPalette,
  type ThemeMode,
} from '@/themes/theme'

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
  dynamicEnabled: boolean
  setDynamicEnabled: (enabled: boolean) => void
  dynamicPalette: DynamicPalette
  setDynamicPalette: (palette: DynamicPalette) => void
  /** Enables dynamic tint and applies an album palette in one step */
  applyAlbumPalette: (palette: DynamicPalette) => void
  clearAlbumPalette: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredMode(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    typeof window === 'undefined' ? 'system' : readStoredMode(),
  )
  const [dynamicEnabled, setDynamicEnabled] = useState(false)
  const [dynamicPalette, setDynamicPalette] = useState<DynamicPalette>(
    DEFAULT_DYNAMIC_PALETTE,
  )

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    localStorage.setItem(THEME_STORAGE_KEY, next)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  const applyAlbumPalette = useCallback((palette: DynamicPalette) => {
    setDynamicPalette(palette)
    setDynamicEnabled(true)
  }, [])

  const clearAlbumPalette = useCallback(() => {
    setDynamicEnabled(false)
    setDynamicPalette(DEFAULT_DYNAMIC_PALETTE)
  }, [])

  useEffect(() => {
    applyThemeAttributes(mode, dynamicEnabled, dynamicPalette)

    if (mode !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () =>
      applyThemeAttributes(mode, dynamicEnabled, dynamicPalette)

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode, dynamicEnabled, dynamicPalette])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
      dynamicEnabled,
      setDynamicEnabled,
      dynamicPalette,
      setDynamicPalette,
      applyAlbumPalette,
      clearAlbumPalette,
    }),
    [
      mode,
      setMode,
      toggleMode,
      dynamicEnabled,
      dynamicPalette,
      applyAlbumPalette,
      clearAlbumPalette,
    ],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
