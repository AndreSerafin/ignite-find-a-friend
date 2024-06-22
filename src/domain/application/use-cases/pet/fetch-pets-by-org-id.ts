import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'

interface FetchPetsByOrgIdUseCaseRequest {
  orgId: string
}

interface FetchPetsByOrgIdUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByOrgIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
  }: FetchPetsByOrgIdUseCaseRequest): Promise<FetchPetsByOrgIdUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(orgId)

    return { pets }
  }
}
