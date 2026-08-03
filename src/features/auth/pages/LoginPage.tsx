import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants'
import { getApiErrorMessage, getApiFieldErrors } from '@/services/api'
import { FormAlert } from '../components/FormAlert'
import { loginSchema, toLoginPayload, type LoginValues } from '../schemas'
import { useAuthStore } from '../store/auth.store'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [formError, setFormError] = useState<string | null>(null)

  const registeredMessage =
    (location.state as { registered?: boolean } | null)?.registered === true
      ? 'Cuenta creada correctamente. Ya puedes iniciar sesión.'
      : null

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { identifier: '', password: '' },
  })

  const onSubmit = async (values: LoginValues) => {
    setFormError(null)
    clearErrors()
    try {
      await login(toLoginPayload(values))
      const from =
        (location.state as { from?: string } | null)?.from || ROUTES.dashboard
      navigate(from, { replace: true })
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error)
      let hasFieldError = false

      for (const [field, message] of Object.entries(fieldErrors)) {
        if (field === 'email' || field === 'username' || field === 'identifier') {
          setError('identifier', { type: 'server', message })
          hasFieldError = true
        }
        if (field === 'password') {
          setError('password', { type: 'server', message })
          hasFieldError = true
        }
      }

      if (!hasFieldError) {
        setFormError(
          getApiErrorMessage(error, 'No se pudo iniciar sesión. Revisa tus datos.'),
        )
      }
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
        <FormAlert variant="success">{registeredMessage}</FormAlert>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Correo o usuario"
          autoComplete="username"
          placeholder="tu@email.com o usuario"
          error={errors.identifier?.message}
          {...register('identifier', {
            onChange: () => {
              if (formError) setFormError(null)
            },
          })}
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            onChange: () => {
              if (formError) setFormError(null)
            },
          })}
        />

        {formError ? <FormAlert variant="error">{formError}</FormAlert> : null}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}
