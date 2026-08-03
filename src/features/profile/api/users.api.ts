import { api, type ApiSuccess } from '@/services/api'
import type { AuthUser } from '@/features/auth/types'
import type { UpdateProfileInput } from '../types'

export type UserSettings = {
  appearance: {
    theme: 'light' | 'dark' | 'system'
    accentColor: string | null
    animations: boolean
  }
  dashboard: {
    layout: string
    widgets: string[]
    dock: string[]
  }
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
    marketing: boolean
  }
  experimental: Record<string, unknown>
}

export type UpdateSettingsInput = {
  appearance?: Partial<UserSettings['appearance']>
  dashboard?: Partial<UserSettings['dashboard']>
  language?: string
  timezone?: string
  notifications?: Partial<UserSettings['notifications']>
  experimental?: Record<string, unknown>
}

export async function updateProfile(userId: string, payload: UpdateProfileInput) {
  const { data } = await api.patch<ApiSuccess<{ user: AuthUser }>>(
    `/users/${userId}`,
    payload,
  )
  return data.data.user
}

export async function getUserSettings(userId: string) {
  const { data } = await api.get<ApiSuccess<{ settings: UserSettings }>>(
    `/users/${userId}/settings`,
  )
  return data.data.settings
}

export async function updateUserSettings(
  userId: string,
  payload: UpdateSettingsInput,
) {
  const { data } = await api.patch<ApiSuccess<{ settings: UserSettings }>>(
    `/users/${userId}/settings`,
    payload,
  )
  return data.data.settings
}

export async function changePassword(payload: {
  currentPassword: string
  newPassword: string
}) {
  const { data } = await api.post<ApiSuccess<null>>(
    '/auth/change-password',
    payload,
  )
  return data
}
