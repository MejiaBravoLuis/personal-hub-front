/** Standard success envelope from Hubify backend */
export type ApiSuccess<T> = {
  success: true
  message: string
  data: T
  timestamp: string
  requestId: string | null
}

export type ApiPagination = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/** Paginated list envelope (`sendPaginated`) */
export type ApiPaginatedSuccess<T> = ApiSuccess<T> & {
  pagination: ApiPagination
}

/** Standard error envelope from Hubify backend */
export type ApiErrorBody = {
  success: false
  status: number
  code: string
  message: string
  details: unknown
  path: string
  method: string
  timestamp: string
  requestId: string | null
}
