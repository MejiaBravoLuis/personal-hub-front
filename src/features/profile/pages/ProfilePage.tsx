import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardTitle } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/layout/PageHeader'
import { FormAlert } from '@/features/auth/components/FormAlert'
import { useAuthStore } from '@/features/auth'
import { getApiErrorMessage, getApiFieldErrors } from '@/services/api'
import { useUpdateProfile } from '../hooks/useProfile'

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'El nombre es obligatorio').max(50),
  lastName: z.string().trim().min(1, 'El apellido es obligatorio').max(50),
  username: z
    .string()
    .trim()
    .min(3, 'Entre 3 y 30 caracteres')
    .max(30, 'Entre 3 y 30 caracteres')
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      'Solo letras, números, puntos, guiones y guiones bajos',
    ),
  email: z.email('Ingresa un correo válido'),
  bio: z.string().max(500, 'Máximo 500 caracteres').optional(),
  avatar: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^https?:\/\//.test(value),
      'Debe ser una URL válida (http/https)',
    )
    .optional(),
})

type ProfileValues = z.infer<typeof profileSchema>

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useUpdateProfile()
  const [success, setSuccess] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      bio: '',
      avatar: '',
    },
  })

  useEffect(() => {
    if (!user) return
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      bio: user.bio ?? '',
      avatar: user.avatar ?? '',
    })
  }, [user, reset])

  if (!user) {
    return null
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim()
  const fallback =
    `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() ||
    user.username.slice(0, 2).toUpperCase()

  const onSubmit = async (values: ProfileValues) => {
    setSuccess(null)
    setFormError(null)
    try {
      await updateProfile.mutateAsync({
        userId: user.id,
        payload: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          username: values.username.trim().toLowerCase(),
          email: values.email.trim().toLowerCase(),
          bio: values.bio?.trim() ? values.bio.trim() : null,
          avatar: values.avatar?.trim() ? values.avatar.trim() : null,
        },
      })
      setSuccess('Perfil actualizado correctamente.')
    } catch (error) {
      const fieldErrors = getApiFieldErrors(error)
      let hasFieldError = false
      for (const field of [
        'firstName',
        'lastName',
        'username',
        'email',
        'bio',
        'avatar',
      ] as const) {
        if (fieldErrors[field]) {
          setError(field, { type: 'server', message: fieldErrors[field] })
          hasFieldError = true
        }
      }
      if (!hasFieldError) {
        setFormError(getApiErrorMessage(error, 'No se pudo actualizar el perfil'))
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil"
        description="Edita los datos de tu cuenta Hubify."
        actions={
          <Badge variant={user.verified ? 'accent' : 'default'}>
            {user.verified ? 'Verificado' : 'Sin verificar'}
          </Badge>
        }
      />

      <Card className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Avatar
          src={user.avatar ?? undefined}
          fallback={fallback}
          size="lg"
        />
        <div className="flex-1 space-y-1">
          <CardTitle>{fullName}</CardTitle>
          <CardDescription>
            @{user.username} · {user.email}
          </CardDescription>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="accent">{user.role}</Badge>
            <Badge>{user.status}</Badge>
          </div>
        </div>
      </Card>

      <Card>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <CardTitle>Información personal</CardTitle>
            <CardDescription className="mt-1">
              Estos cambios se guardan en el backend.
            </CardDescription>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nombre"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Apellido"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
          <Input
            label="Usuario"
            error={errors.username?.message}
            {...register('username')}
          />
          <Input
            label="Correo"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Avatar (URL)"
            placeholder="https://…"
            error={errors.avatar?.message}
            {...register('avatar')}
          />
          <label className="flex w-full flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--foreground)]">Bio</span>
            <textarea
              rows={3}
              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-[var(--shadow-sm)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/30"
              placeholder="Cuéntanos algo sobre ti"
              {...register('bio')}
            />
            {errors.bio?.message ? (
              <span className="text-xs text-[var(--danger)]" role="alert">
                {errors.bio.message}
              </span>
            ) : null}
          </label>

          {success ? <FormAlert variant="success">{success}</FormAlert> : null}
          {formError ? <FormAlert variant="error">{formError}</FormAlert> : null}

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isSubmitting || updateProfile.isPending}
              disabled={!isDirty}
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
