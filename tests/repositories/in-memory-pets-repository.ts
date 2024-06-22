import { PetsRepository } from '@/domain/application/repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(pet: Pet): Promise<void> {
    this.items.push(pet)
  }

  async findManyByOrgId(orgId: string): Promise<Pet[]> {
    const pets = this.items.filter((pet) => pet.authorId.toString() === orgId)

    return pets
  }
}
