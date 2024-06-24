import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeletePetUseCaseRequest {
  petId: string
  authorId: string
}

type DeletePetUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    pet: Pet
  }
>

@Injectable()
export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
    authorId,
  }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    if (pet.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.petsRepository.delete(pet)

    return right({ pet })
  }
}
