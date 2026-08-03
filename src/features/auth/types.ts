export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  avatar?: string | null
  bio?: string | null
  role: string
  status: string
  provider: string
  verified: boolean
  lastLogin?: string | null
  createdAt?: string
  updatedAt?: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  email?: string
  username?: string
  password: string
}

export type RegisterPayload = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export type LoginResult = AuthTokens & {
  user: AuthUser
}
