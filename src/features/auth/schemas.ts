import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Ingresa tu correo o usuario'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

export type LoginValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
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
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .superRefine((data, ctx) => {
    if (
      data.confirmPassword.length > 0 &&
      data.password !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterValues = z.infer<typeof registerSchema>

export function toLoginPayload(values: LoginValues) {
  const identifier = values.identifier.trim()
  const password = values.password

  if (identifier.includes('@')) {
    return { email: identifier.toLowerCase(), password }
  }

  return { username: identifier.toLowerCase(), password }
}
