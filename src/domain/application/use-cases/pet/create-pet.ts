import { PetsRepository } from '../../repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'
import { UniqueEntityId } from '@/core/unique-entity-id'

interface CreatePetsUseCaseRequest {
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

interface CreatePetsUseCaseResponse {
  pet: Pet
}

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
  }: CreatePetsUseCaseRequest): Promise<CreatePetsUseCaseResponse> {
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

    return { pet }
  }
}
