import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FilterParams,
  PetsRepository,
} from '@/domain/application/repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(pet: Pet): Promise<void> {
    this.items.push(pet)
  }

  async findMany(
    { page }: PaginationParams,
    filterParams: FilterParams = {},
  ): Promise<Pet[]> {
    const { age, breed, energyLevel, environment, search, size, specie } =
      filterParams

    const filters = (item: Pet) =>
      (age !== undefined ? item.age === age : true) &&
      (breed ? item.breed === breed : true) &&
      (energyLevel !== undefined ? item.energyLevel === energyLevel : true) &&
      (environment ? item.environment === environment : true) &&
      (search
        ? item.name.includes(search) || item.about.includes(search)
        : true) &&
      (size !== undefined ? item.size === size : true) &&
      (specie ? item.specie === specie : true)

    const pets = this.items.filter(filters).slice((page - 1) * 20, page * 20)

    return pets
  }

  async findManyByOrgId(
    orgId: string,
    { page }: PaginationParams,
    filterParams: FilterParams = {},
  ): Promise<Pet[]> {
    const { age, breed, energyLevel, environment, search, size, specie } =
      filterParams

    const filters = (item: Pet) =>
      (age !== undefined ? item.age === age : true) &&
      (breed ? item.breed === breed : true) &&
      (energyLevel !== undefined ? item.energyLevel === energyLevel : true) &&
      (environment ? item.environment === environment : true) &&
      (search
        ? item.name.includes(search) || item.about.includes(search)
        : true) &&
      (size !== undefined ? item.size === size : true) &&
      (specie ? item.specie === specie : true)

    const pets = this.items
      .filter((item) => item.authorId.toString() === orgId)
      .filter(filters)
      .slice((page - 1) * 20, page * 20)

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