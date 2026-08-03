import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants'
import { getApiErrorMessage, getApiFieldErrors } from '@/services/api'
import { FormAlert } from '../components/FormAlert'
import { registerSchema, type RegisterValues } from '../schemas'
import { useAuthStore } from '../store/auth.store'

export function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useAuthStore((s) => s.register)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  useEffect(() => {
    if (touchedFields.confirmPassword || confirmPassword.length > 0) {
      void trigger('confirmPassword')
    }
  }, [password, confirmPassword, touchedFields.confirmPassword, trigger])

  const onSubmit = async (values: RegisterValues) => {
    setFormError(null)
    clearErrors()
    try {
      await registerUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        username: values.username.trim().toLowerCase(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })
      navigate(ROUTES.login, { replace: true, state: { registered: true } })
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error)
      const fieldMap: Array<keyof RegisterValues> = [
        'firstName',
        'lastName',
        'username',
        'email',
        'password',
      ]

      let hasFieldError = false
      for (const field of fieldMap) {
        if (fieldErrors[field]) {
          setError(field, { type: 'server', message: fieldErrors[field] })
          hasFieldError = true
        }
      }

      if (!hasFieldError) {
        setFormError(
          getApiErrorMessage(error, 'No se pudo crear la cuenta. Revisa tus datos.'),
        )
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Crea tu cuenta
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Empieza a centralizar tus servicios en Hubify.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nombre"
            autoComplete="given-name"
            placeholder="José"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Apellido"
            autoComplete="family-name"
            placeholder="Rodas"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        <Input
          label="Usuario"
          autoComplete="username"
          placeholder="jrodas"
          error={errors.username?.message}
          {...register('username')}
        />
        <Input
          label="Correo"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          error={errors.password?.message}
          hint="Usa al menos 8 caracteres."
          {...register('password')}
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            onChange: () => {
              if (formError) setFormError(null)
            },
          })}
        />

        {formError ? <FormAlert variant="error">{formError}</FormAlert> : null}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Crear cuenta
        </Button>
      </form>
    </div>
  )
}
