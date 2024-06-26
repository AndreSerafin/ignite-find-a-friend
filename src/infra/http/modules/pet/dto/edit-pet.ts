import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

const editPetBodySchema = z.object({
  name: z.string().optional(),
  specie: z.string().optional(),
  age: z.number().optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  breed: z.string().optional(),
  energyLevel: z.number().optional(),
  environment: z.string().optional(),
  about: z.string().optional(),
})

export const editPetBodyValidationPipe = new ZodValidationPipe(
  editPetBodySchema,
)

export type EditPetBodySchema = z.infer<typeof editPetBodySchema>
