import { z } from 'nestjs-zod/z'

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
