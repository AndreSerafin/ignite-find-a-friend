import { z } from 'nestjs-zod/z'

export const createAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  address: z.string(),
  whatsapp: z.string(),
  authorName: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>
