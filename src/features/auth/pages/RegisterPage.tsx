import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Ingresa tu nombre'),
    email: z.email('Ingresa un correo válido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (_values: RegisterValues) => {
    await new Promise((resolve) => setTimeout(resolve, 450))
    navigate(ROUTES.dashboard)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Crea tu cuenta
        </h2>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">
          Empieza a centralizar tus servicios. Sin APIs reales en este sprint.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Nombre"
          autoComplete="name"
          placeholder="Tu nombre"
          error={errors.name?.message}
          {...register('name')}
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
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Crear cuenta
        </Button>
      </form>
    </div>
  )
}
