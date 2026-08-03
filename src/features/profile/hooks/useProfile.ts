import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth'
import {
  changePassword,
  getUserSettings,
  updateProfile,
  updateUserSettings,
  type UpdateSettingsInput,
} from '../api/users.api'
import type { UpdateProfileInput } from '../types'

export const profileKeys = {
  settings: (userId: string) => ['user-settings', userId] as const,
}

export function useUserSettings(userId?: string) {
  return useQuery({
    queryKey: profileKeys.settings(userId ?? 'anonymous'),
    queryFn: () => getUserSettings(userId!),
    enabled: Boolean(userId),
  })
}

export function useUpdateProfile() {
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string
      payload: UpdateProfileInput
    }) => updateProfile(userId, payload),
    onSuccess: (user) => {
      setUser(user)
    },
  })
}

export function useUpdateSettings(userId?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateSettingsInput) => {
      if (!userId) throw new Error('Missing user id')
      return updateUserSettings(userId, payload)
    },
    onSuccess: async (settings) => {
      if (!userId) return
      queryClient.setQueryData(profileKeys.settings(userId), settings)
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  })
}
