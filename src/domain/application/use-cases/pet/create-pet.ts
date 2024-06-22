import { Pet } from '@/domain/enterprise/entities/pet'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { PetsRepository } from '../../repositories/pets-repository'
import { Either, right } from '@/core/either'

interface CreatePetUseCaseRequest {
  name: string
  specie: string
  age: number
  size: 0 | 1 | 2
  breed: string
  energyLevel: number
  environment: string
  about: string
  authorId: string
}

type CreatePetUseCaseResponse = Either<
  null,
  {
    pet: Pet
  }
>

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    about,
    age,
    energyLevel,
    environment,
    name,
    authorId,
    size,
    specie,
    breed,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = Pet.create({
      about,
      age,
      energyLevel,
      environment,
      name,
      size,
      specie,
      breed,
      authorId: new UniqueEntityId(authorId),
    })

    await this.petsRepository.create(pet)

    return right({ pet })
  }
}
