import { PetsRepository } from '@/domain/application/repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(pet: Pet): Promise<void> {
    this.items.push(pet)
  }

  async findManyByOrgId(orgId: string): Promise<Pet[]> {
    const pets = this.items.filter((item) => item.authorId.toString() === orgId)

    return pets
  }

  async getById(petId: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id.toString() === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
