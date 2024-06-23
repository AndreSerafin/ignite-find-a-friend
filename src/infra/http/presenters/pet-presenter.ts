import { Pet } from '@/domain/enterprise/entities/pet'

export class PetPresenter {
  static toHTTP(pets: Pet) {
    return {
      id: pets.id.toString(),
      org_id: pets.authorId.toString(),
      name: pets.name,
      specie: pets.specie,
      age: pets.age,
      size: pets.size,
      breed: pets.breed,
      energy_level: pets.energyLevel,
      environment: pets.environment,
      about: pets.about,
      created_at: pets.createdAt,
      updated_at: pets.updatedAt,
    }
  }
}
