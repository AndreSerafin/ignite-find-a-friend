import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FilterParams {
  search?: string
  specie?: string
  age?: number
  city: string
  size?: 'small' | 'big' | 'medium'
  breed?: string
  energyLevel?: number
  environment?: string
}

interface FetchPetsUseCaseRequest {
  page: number
  filterParams?: FilterParams
}

type FetchPetsUseCaseResponse = Either<
  null,
  {
    pets: Pet[]
  }
>

@Injectable()
export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
    filterParams,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany({ page }, filterParams)

    return right({ pets })
  }
}
