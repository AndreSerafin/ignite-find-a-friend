import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

const createPetBodySchema = z.object({
  name: z.string(),
  specie: z.string(),
  age: z.number(),
  size: z.enum(['small', 'medium', 'big']),
  breed: z.string(),
  energyLevel: z.number(),
  environment: z.string(),
  about: z.string(),
})

export const createPetBodyValidationPipe = new ZodValidationPipe(
  createPetBodySchema,
)

export type CreatePetBodySchema = z.infer<typeof createPetBodySchema>
