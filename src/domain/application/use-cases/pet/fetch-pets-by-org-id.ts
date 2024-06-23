import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, right } from '@/core/either'

interface FilterParams {
  search?: string
  specie?: string
  age?: number
  size?: number
  breed?: string
  energyLevel?: number
  environment?: string
}

interface FetchPetsByOrgIdUseCaseRequest {
  orgId: string
  page: number
  filterParams?: FilterParams
}

type FetchPetsByOrgIdUseCaseResponse = Either<
  null,
  {
    pets: Pet[]
  }
>

export class FetchPetsByOrgIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    page,
    filterParams,
  }: FetchPetsByOrgIdUseCaseRequest): Promise<FetchPetsByOrgIdUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(
      orgId,
      { page },
      filterParams,
    )

    return right({ pets })
  }
}
