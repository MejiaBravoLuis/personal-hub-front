import axios from 'axios'
import { env } from '@/config/env'
import { attachInterceptors } from './interceptors'

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20_000,
})

attachInterceptors(api)
