import { UniqueEntityId } from '@/core/unique-entity-id'
import { Pet } from '@/domain/enterprise/entities/pet'
import { Prisma, Pet as PrismaPet } from '@prisma/client'

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        about: raw.about,
        age: raw.age,
        authorId: new UniqueEntityId(raw.authorId),
        breed: raw.breed,
        energyLevel: raw.energyLevel,
        environment: raw.environment,
        name: raw.name,
        size:
          raw.size === 'small'
            ? 'small'
            : raw.size === 'medium'
              ? 'medium'
              : 'big',
        specie: raw.specie,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(pet: Pet): Prisma.PetUncheckedCreateInput {
    return {
      id: pet.id.toString(),
      about: pet.about,
      age: pet.age,
      authorId: pet.authorId.toString(),
      breed: pet.breed,
      energyLevel: pet.energyLevel,
      environment: pet.environment,
      name: pet.name,
      size:
        pet.size === 'small'
          ? 'small'
          : pet.size === 'medium'
            ? 'medium'
            : 'big',
      specie: pet.specie,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    }
  }
}
