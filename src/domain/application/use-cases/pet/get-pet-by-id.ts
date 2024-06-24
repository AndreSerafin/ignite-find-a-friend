import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface GetPetByIdUseCaseRequest {
  petId: string
  authorId: string
}

type GetPetByIdUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    pet: Pet
  }
>

@Injectable()
export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
    authorId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    if (pet.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    return right({ pet })
  }
}
