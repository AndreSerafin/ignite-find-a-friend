import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

const fetchPetsQuerySchema = z.object({
  city: z.string(),
  search: z.string().optional(),
  specie: z.string().optional(),
  age: z.number().optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  breed: z.string().optional(),
  energyLevel: z.number().optional(),
  environment: z.string().optional(),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

export const fetchPetsQueryValidationPipe = new ZodValidationPipe(
  fetchPetsQuerySchema,
)

export type FetchPetsQuerySchema = z.infer<typeof fetchPetsQuerySchema>
