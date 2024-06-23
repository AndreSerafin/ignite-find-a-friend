import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchPetsUseCase } from '@/domain/application/use-cases/pet/fetch-pets'
import { PetPresenter } from '../../presenters/pet-presenter'

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

const queryValidationPipe = new ZodValidationPipe(fetchPetsQuerySchema)

type FetchPetsQuerySchema = z.infer<typeof fetchPetsQuerySchema>

@Controller('/pets')
export class FetchPetsContoller {
  constructor(private fetchPets: FetchPetsUseCase) {}

  @Get()
  @UsePipes()
  async handle(@Query(queryValidationPipe) queryFilters: FetchPetsQuerySchema) {
    const {
      page,
      age,
      breed,
      energyLevel,
      environment,
      search,
      size,
      specie,
      city,
    } = queryFilters

    const result = await this.fetchPets.execute({
      page,
      filterParams: {
        city,
        age,
        breed,
        energyLevel,
        environment,
        search,
        size,
        specie,
      },
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const pets = result.value.pets.map(PetPresenter.toHTTP)

    return { pets }
  }
}
