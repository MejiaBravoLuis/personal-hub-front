import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'
import { env } from '@/config/env'
import type { ApiSuccess } from './types'
import { tokenStorage } from './token-storage'

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

type TokenPair = {
  accessToken: string
  refreshToken: string
}

let refreshPromise: Promise<string> | null = null

async function rotateTokens(): Promise<string> {
  const refreshToken = tokenStorage.getRefresh()
  if (!refreshToken) {
    throw new Error('Missing refresh token')
  }

  const { data } = await axios.post<ApiSuccess<TokenPair>>(
    `${env.apiUrl}/auth/refresh`,
    { refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  const pair = data.data
  tokenStorage.set(pair.accessToken, pair.refreshToken)
  return pair.accessToken
}

function clearSessionAndRedirect() {
  tokenStorage.clear()
  if (window.location.pathname !== '/login') {
    window.location.assign('/login')
  }
}

export function attachInterceptors(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const accessToken = tokenStorage.getAccess()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const original = error.config as RetryConfig | undefined
      const status = error.response?.status

      if (!original || status !== 401 || original._retry) {
        return Promise.reject(error)
      }

      // Do not try to refresh the refresh/login endpoints themselves
      const url = original.url ?? ''
      if (
        url.includes('/auth/login') ||
        url.includes('/auth/register') ||
        url.includes('/auth/refresh')
      ) {
        return Promise.reject(error)
      }

      original._retry = true

      try {
        refreshPromise ??= rotateTokens().finally(() => {
          refreshPromise = null
        })
        const accessToken = await refreshPromise
        original.headers.Authorization = `Bearer ${accessToken}`
        return client(original)
      } catch {
        clearSessionAndRedirect()
        return Promise.reject(error)
      }
    },
  )
}
