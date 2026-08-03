import { create } from 'zustand'
import { tokenStorage } from '@/services/api'
import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
} from '../api/auth.api'
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from '../types'

export type AuthStatus = 'bootstrapping' | 'authenticated' | 'anonymous'

type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  bootstrap: () => Promise<void>
  login: (payload: LoginPayload) => Promise<AuthUser>
  register: (payload: RegisterPayload) => Promise<AuthUser>
  logout: () => Promise<void>
  setUser: (user: AuthUser | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: 'bootstrapping',

  setUser: (user) => {
    set({
      user,
      status: user ? 'authenticated' : 'anonymous',
    })
  },

  bootstrap: async () => {
    const access = tokenStorage.getAccess()
    const refresh = tokenStorage.getRefresh()

    if (!access && !refresh) {
      set({ user: null, status: 'anonymous' })
      return
    }

    try {
      const user = await meRequest()
      set({ user, status: 'authenticated' })
    } catch {
      tokenStorage.clear()
      set({ user: null, status: 'anonymous' })
    }
  },

  login: async (payload) => {
    const result = await loginRequest(payload)
    tokenStorage.set(result.accessToken, result.refreshToken)
    set({ user: result.user, status: 'authenticated' })
    return result.user
  },

  register: async (payload) => {
    return registerRequest(payload)
  },

  logout: async () => {
    const refreshToken = tokenStorage.getRefresh()
    try {
      if (get().status === 'authenticated') {
        await logoutRequest(refreshToken)
      }
    } catch {
      // Still clear local session even if the API call fails
    } finally {
      tokenStorage.clear()
      set({ user: null, status: 'anonymous' })
    }
  },
}))
