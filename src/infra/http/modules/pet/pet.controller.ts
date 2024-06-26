import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { CreatePetUseCase } from '@/domain/application/use-cases/pet/create-pet'
import { DeletePetUseCase } from '@/domain/application/use-cases/pet/delete-pet'
import { EditPetUseCase } from '@/domain/application/use-cases/pet/edit-pet'
import { FetchPetsUseCase } from '@/domain/application/use-cases/pet/fetch-pets'
import { FetchPetsByOrgIdUseCase } from '@/domain/application/use-cases/pet/fetch-pets-by-org-id'
import { GetPetByIdUseCase } from '@/domain/application/use-cases/pet/get-pet-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { PetPresenter } from '../../presenters/pet-presenter'
import {
  CreatePetBodySchema,
  createPetBodyValidationPipe,
} from './dto/create-pet'
import { EditPetBodySchema, editPetBodyValidationPipe } from './dto/edit-pet'
import {
  FetchPetsQuerySchema,
  fetchPetsQueryValidationPipe,
} from './dto/fetch-pets'
import {
  FetchPetsByOrgIdQuerySchema,
  fetchPetsByOrgIdQueryValidationPipe,
} from './dto/fetch-pets-by-org-id'

@Controller('/pets')
export class PetController {
  constructor(
    private createPet: CreatePetUseCase,
    private fetchPets: FetchPetsUseCase,
    private fetchPetsByOrgId: FetchPetsByOrgIdUseCase,
    private getPetById: GetPetByIdUseCase,
    private editPet: EditPetUseCase,
    private deletePet: DeletePetUseCase,
  ) {}

  @Post()
  @UsePipes()
  @HttpCode(201)
  async create(
    @Body(createPetBodyValidationPipe) body: CreatePetBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const data = body

    const result = await this.createPet.execute({ ...data, authorId: user.sub })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }

  @Get()
  @UsePipes()
  async fetch(
    @Query(fetchPetsQueryValidationPipe) queryFilters: FetchPetsQuerySchema,
  ) {
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

  @Get('/orgs/:orgId/pets')
  @UsePipes()
  async fetchByOrgId(
    @Param('orgId') params,
    @Query(fetchPetsByOrgIdQueryValidationPipe)
    queryFilters: FetchPetsByOrgIdQuerySchema,
  ) {
    const orgId = params
    const { page, age, breed, energyLevel, environment, search, size, specie } =
      queryFilters

    const result = await this.fetchPetsByOrgId.execute({
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

  @Get('/:petId')
  @UsePipes()
  @HttpCode(200)
  async getById(
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const result = await this.getPetById.execute({
      petId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    const pet = PetPresenter.toHTTP(result.value.pet)

    return { pet }
  }

  @Delete('/:petId')
  @UsePipes()
  @HttpCode(204)
  async delete(
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const result = await this.deletePet.execute({
      petId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }

  @Patch('/:petId')
  @UsePipes()
  @HttpCode(204)
  async update(
    @Body(editPetBodyValidationPipe) body: EditPetBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const data = body

    const result = await this.editPet.execute({
      ...data,
      petId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
