import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants'

const loginSchema = z.object({
  email: z.email('Ingresa un correo válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (_values: LoginValues) => {
    await new Promise((resolve) => setTimeout(resolve, 450))
    navigate(ROUTES.dashboard)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Bienvenido de nuevo
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Entra a tu espacio Hubify. La autenticación real llegará más adelante.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>
    </div>
  )
}
