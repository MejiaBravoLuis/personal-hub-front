import { api, type ApiSuccess } from '@/services/api'
import type {
  AuthUser,
  LoginPayload,
  LoginResult,
  RegisterPayload,
} from '../types'

export async function loginRequest(payload: LoginPayload) {
  const { data } = await api.post<ApiSuccess<LoginResult>>(
    '/auth/login',
    payload,
  )
  return data.data
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await api.post<ApiSuccess<{ user: AuthUser }>>(
    '/auth/register',
    payload,
  )
  return data.data.user
}

export async function meRequest() {
  const { data } = await api.get<ApiSuccess<{ user: AuthUser }>>('/auth/me')
  return data.data.user
}

export async function logoutRequest(refreshToken?: string | null) {
  await api.post('/auth/logout', refreshToken ? { refreshToken } : {})
}
