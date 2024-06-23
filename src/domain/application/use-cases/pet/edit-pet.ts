import { Pet } from '@/domain/enterprise/entities/pet'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface EditPetUseCaseRequest {
  petId: string
  authorId: string
  name?: string
  specie?: string
  age?: number
  size?: 'small' | 'medium' | 'big'
  breed?: string
  energyLevel?: number
  environment?: string
  about?: string
}

type EditPetUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet
  }
>

@Injectable()
export class EditPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
    authorId,
    ...rest
  }: EditPetUseCaseRequest): Promise<EditPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      return left(new ResourceNotFoundError())
    }

    if (pet.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    console.log(rest.name)

    pet.update({ ...rest })

    await this.petsRepository.save(pet)

    return right({ pet })
  }
}
