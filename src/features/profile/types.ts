import type { AuthUser } from '@/features/auth/types'

export type UpdateProfileInput = {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  avatar?: string | null
  bio?: string | null
}

export type ProfileUser = AuthUser
