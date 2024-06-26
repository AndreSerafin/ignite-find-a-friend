import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'nestjs-zod/z'

const fetchPetsByOrgIdQuerySchema = z.object({
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

export const fetchPetsByOrgIdQueryValidationPipe = new ZodValidationPipe(
  fetchPetsByOrgIdQuerySchema,
)

export type FetchPetsByOrgIdQuerySchema = z.infer<
  typeof fetchPetsByOrgIdQuerySchema
>
