import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pet } from '@/domain/enterprise/entities/pet'

export interface FilterParams {
  search?: string
  specie?: string
  age?: number
  size?: number
  breed?: string
  energyLevel?: number
  environment?: string
}

export interface PetsRepository {
  create(pet: Pet): Promise<void>

  findManyByOrgId(
    orgId: string,
    paginationParams: PaginationParams,
    filterParams?: FilterParams,
  ): Promise<Pet[]>

  getById(petId: string): Promise<Pet | null>
}
