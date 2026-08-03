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

/** Human-readable message from an Axios / API failure */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Algo salió mal. Intenta de nuevo.',
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (isApiErrorBody(data)) {
      return data.message
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
