import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants'
import { getApiErrorMessage } from '@/services/api'
import { loginSchema, toLoginPayload, type LoginValues } from '../schemas'
import { useAuthStore } from '../store/auth.store'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [formError, setFormError] = useState<string | null>(null)

  const registeredMessage =
    (location.state as { registered?: boolean } | null)?.registered === true
      ? 'Cuenta creada. Ya puedes iniciar sesión.'
      : null

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  const onSubmit = async (values: LoginValues) => {
    setFormError(null)
    try {
      await login(toLoginPayload(values))
      const from =
        (location.state as { from?: string } | null)?.from || ROUTES.dashboard
      navigate(from, { replace: true })
    } catch (error) {
      setFormError(getApiErrorMessage(error, 'No se pudo iniciar sesión'))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Bienvenido de nuevo
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Entra con tu correo o usuario de Hubify.
        </p>
      </div>

      {registeredMessage ? (
        <p
          className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]"
          role="status"
        >
          {registeredMessage}
        </p>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Correo o usuario"
          autoComplete="username"
          placeholder="tu@email.com o usuario"
          error={errors.identifier?.message}
          {...register('identifier')}
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        {formError ? (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}
