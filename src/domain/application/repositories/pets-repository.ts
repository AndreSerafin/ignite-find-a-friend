import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pet } from '@/domain/enterprise/entities/pet'

export interface FilterParams {
  search?: string
  specie?: string
  age?: number
  city?: string
  size?: 'small' | 'medium' | 'big'
  breed?: string
  energyLevel?: number
  environment?: string
}

export abstract class PetsRepository {
  abstract create(pet: Pet): Promise<void>

  abstract findMany(
    paginationParams: PaginationParams,
    filterParams?: FilterParams,
  ): Promise<Pet[]>

  abstract findManyByOrgId(
    orgId: string,
    paginationParams: PaginationParams,
    filterParams?: FilterParams,
  ): Promise<Pet[]>

  abstract getById(petId: string): Promise<Pet | null>
}
