import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, right } from '@/core/either'

interface FetchPetsByOrgIdUseCaseRequest {
  orgId: string
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
  }: FetchPetsByOrgIdUseCaseRequest): Promise<FetchPetsByOrgIdUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(orgId)

    return right({ pets })
  }
}
