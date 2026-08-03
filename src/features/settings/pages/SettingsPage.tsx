import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/layout/PageHeader'
import { Loading } from '@/components/feedback/Loading'
import { ErrorState } from '@/components/feedback/ErrorState'
import { FormAlert } from '@/features/auth/components/FormAlert'
import { useAuthStore } from '@/features/auth'
import { ROUTES } from '@/constants'
import { useTheme } from '@/providers'
import type { ThemeMode } from '@/themes/theme'
import { getApiErrorMessage } from '@/services/api'
import { cn } from '@/utils/cn'
import {
  useChangePassword,
  useUpdateSettings,
  useUserSettings,
} from '@/features/profile/hooks/useProfile'

const themeOptions: { id: ThemeMode; label: string; hint: string }[] = [
  { id: 'light', label: 'Claro', hint: 'Superficies luminosas' },
  { id: 'dark', label: 'Oscuro', hint: 'Contraste suave' },
  { id: 'system', label: 'Sistema', hint: 'Sigue el OS' },
]

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
    newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma la nueva contraseña'),
  })
  .superRefine((data, ctx) => {
    if (
      data.confirmPassword.length > 0 &&
      data.newPassword !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
      })
    }
  })

type PasswordValues = z.infer<typeof passwordSchema>

export function SettingsPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const {
    mode,
    setMode,
    dynamicEnabled,
    setDynamicEnabled,
  } = useTheme()

  const settingsQuery = useUserSettings(user?.id)
  const updateSettings = useUpdateSettings(user?.id)
  const changePassword = useChangePassword()

  const [settingsMessage, setSettingsMessage] = useState<string | null>(null)
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')

  useEffect(() => {
    if (touchedFields.confirmPassword || confirmPassword.length > 0) {
      void trigger('confirmPassword')
    }
  }, [newPassword, confirmPassword, touchedFields.confirmPassword, trigger])

  const themeHydrated = useRef(false)
  useEffect(() => {
    const theme = settingsQuery.data?.appearance.theme
    if (!theme || themeHydrated.current) return
    themeHydrated.current = true
    setMode(theme)
  }, [settingsQuery.data?.appearance.theme, setMode])

  const persistTheme = async (next: ThemeMode) => {
    setMode(next)
    setSettingsMessage(null)
    setSettingsError(null)
    if (!user?.id) return
    try {
      await updateSettings.mutateAsync({
        appearance: { theme: next },
      })
      setSettingsMessage('Tema guardado en tu cuenta.')
    } catch (error) {
      setSettingsError(getApiErrorMessage(error, 'No se pudo guardar el tema'))
    }
  }

  const toggleNotification = async (
    key: 'email' | 'push' | 'inApp' | 'marketing',
    value: boolean,
  ) => {
    setSettingsMessage(null)
    setSettingsError(null)
    try {
      await updateSettings.mutateAsync({
        notifications: { [key]: value },
      })
      setSettingsMessage('Preferencias de notificación actualizadas.')
    } catch (error) {
      setSettingsError(
        getApiErrorMessage(error, 'No se pudieron guardar las notificaciones'),
      )
    }
  }

  const onPasswordSubmit = async (values: PasswordValues) => {
    setPasswordMessage(null)
    setPasswordError(null)
    try {
      await changePassword.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      reset()
      setPasswordMessage(
        'Contraseña actualizada. Te vamos a pedir iniciar sesión de nuevo.',
      )
      await logout()
      navigate(ROUTES.login, { replace: true })
    } catch (error) {
      setPasswordError(
        getApiErrorMessage(error, 'No se pudo cambiar la contraseña'),
      )
    }
  }

  if (settingsQuery.isLoading) {
    return <Loading label="Cargando configuración…" fullScreen />
  }

  if (settingsQuery.isError) {
    return (
      <ErrorState
        title="No se pudo cargar la configuración"
        description={getApiErrorMessage(settingsQuery.error)}
        action={
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              void settingsQuery.refetch()
            }}
          >
            Reintentar
          </Button>
        }
      />
    )
  }

  const notifications = settingsQuery.data?.notifications

  return (
    <div className="space-y-4">
      <PageHeader
        title="Configuración"
        description="Preferencias de apariencia, notificaciones y seguridad."
      />

      {settingsMessage ? (
        <FormAlert variant="success">{settingsMessage}</FormAlert>
      ) : null}
      {settingsError ? <FormAlert variant="error">{settingsError}</FormAlert> : null}

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <Badge variant="default">Tema</Badge>
        </CardHeader>
        <CardDescription className="mb-4">
          Se guarda en tu cuenta y se aplica en este dispositivo.
        </CardDescription>
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                void persistTheme(option.id)
              }}
              className={cn(
                'rounded-[var(--radius-md)] border px-4 py-3 text-left transition-colors',
                mode === option.id
                  ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]',
              )}
            >
              <span className="block text-sm font-medium">{option.label}</span>
              <span className="mt-1 block text-xs text-[var(--foreground-muted)]">
                {option.hint}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tema dinámico</CardTitle>
          <Badge variant={dynamicEnabled ? 'accent' : 'default'}>
            {dynamicEnabled ? 'Activo' : 'Listo'}
          </Badge>
        </CardHeader>
        <CardDescription className="mb-4">
          El tint de álbum de Spotify se aplica en el cliente (aún no se
          persiste en el backend).
        </CardDescription>
        <Button
          variant={dynamicEnabled ? 'secondary' : 'primary'}
          onClick={() => setDynamicEnabled(!dynamicEnabled)}
        >
          {dynamicEnabled ? 'Desactivar tint dinámico' : 'Activar tint dinámico'}
        </Button>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <Badge variant="accent">Cuenta</Badge>
        </CardHeader>
        <CardDescription className="mb-4">
          Preferencias sincronizadas con el backend.
        </CardDescription>
        <div className="space-y-3">
          {(
            [
              ['email', 'Correo'],
              ['push', 'Push'],
              ['inApp', 'En la app'],
              ['marketing', 'Marketing'],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--border)] px-3 py-2.5"
            >
              <span className="text-sm font-medium">{label}</span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--accent)]"
                checked={Boolean(notifications?.[key])}
                disabled={updateSettings.isPending}
                onChange={(event) => {
                  void toggleNotification(key, event.target.checked)
                }}
              />
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardDescription className="mb-4">
          Al cambiarla se cierran tus sesiones activas.
        </CardDescription>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onPasswordSubmit)}
          noValidate
        >
          <Input
            label="Contraseña actual"
            type="password"
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />
          <Input
            label="Nueva contraseña"
            type="password"
            autoComplete="new-password"
            error={errors.newPassword?.message}
            hint="Mínimo 8 caracteres."
            {...register('newPassword')}
          />
          <Input
            label="Confirmar nueva contraseña"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {passwordMessage ? (
            <FormAlert variant="success">{passwordMessage}</FormAlert>
          ) : null}
          {passwordError ? (
            <FormAlert variant="error">{passwordError}</FormAlert>
          ) : null}

          <Button
            type="submit"
            loading={isSubmitting || changePassword.isPending}
          >
            Actualizar contraseña
          </Button>
        </form>
      </Card>
    </div>
  )
}
