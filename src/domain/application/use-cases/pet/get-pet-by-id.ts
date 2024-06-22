import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

interface GetPetByIdUseCaseRequest {
  petId: string
}

type GetPetByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet
  }
>

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.getById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    return right({ pet })
  }
}
