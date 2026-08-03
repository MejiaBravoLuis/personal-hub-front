import axios from 'axios'
import type { ApiErrorBody } from './types'

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    'success' in value &&
    (value as ApiErrorBody).success === false &&
    typeof (value as ApiErrorBody).message === 'string'
  )
}

const AUTH_CODE_MESSAGES: Record<string, string> = {
  AUTH_INVALID_CREDENTIALS: 'Correo/usuario o contraseña incorrectos.',
  AUTH_ACCOUNT_BLOCKED: 'Tu cuenta está bloqueada.',
  AUTH_ACCOUNT_INACTIVE: 'Tu cuenta está inactiva.',
  AUTH_EMAIL_NOT_VERIFIED: 'Debes verificar tu correo antes de entrar.',
  AUTH_PASSWORD_MISMATCH: 'La contraseña actual no es correcta.',
  EMAIL_ALREADY_EXISTS: 'Ese correo ya está registrado.',
  USERNAME_ALREADY_EXISTS: 'Ese usuario ya está en uso.',
  VALIDATION_ERROR: 'Revisa los campos del formulario.',
  RATE_LIMIT_EXCEEDED: 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
}

/** Field → message map from backend Zod validation details */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError(error) || !isApiErrorBody(error.response?.data)) {
    return {}
  }

  const details = error.response.data.details
  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return {}
  }

  const fields: Record<string, string> = {}
  for (const [key, value] of Object.entries(details)) {
    if (typeof value === 'string' && value.trim()) {
      fields[key] = value
    }
  }
  return fields
}

/** Human-readable message from an Axios / API failure */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Algo salió mal. Intenta de nuevo.',
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (isApiErrorBody(data)) {
      return AUTH_CODE_MESSAGES[data.code] ?? data.message
    }
    if (error.code === 'ERR_NETWORK') {
      return 'No se pudo conectar con el servidor. ¿Está el backend en marcha?'
    }
    if (error.message) {
      return error.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
