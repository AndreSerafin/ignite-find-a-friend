import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { PetPresenter } from '../../presenters/pet-presenter'
import { FetchPetsByOrgIdUseCase } from '@/domain/application/use-cases/pet/fetch-pets-by-org-id'

const fetchPetsQuerySchema = z.object({
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

@Controller('orgs/:orgId/pets/')
export class FetchPetsByOrgIdContoller {
  constructor(private fetchPets: FetchPetsByOrgIdUseCase) {}

  @Get()
  @UsePipes()
  async handle(
    @Param('orgId') params,
    @Query(queryValidationPipe) queryFilters: FetchPetsQuerySchema,
  ) {
    const orgId = params
    const { page, age, breed, energyLevel, environment, search, size, specie } =
      queryFilters

    const result = await this.fetchPets.execute({
      orgId,
      page,
      filterParams: {
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
