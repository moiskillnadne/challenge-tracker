import z from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'email.emailCannotBeEmpty')
  .email('email.invalidEmail')

export const codeSchema = z
  .string()
  .regex(/^\d{6}$/, { message: 'code.shouldContainSixDigits' })
