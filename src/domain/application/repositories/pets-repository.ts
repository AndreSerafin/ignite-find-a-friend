import { Pet } from '@/domain/enterprise/entities/pet'

export interface PetsRepository {
  create(pet: Pet): Promise<void>

  findManyByOrgId(orgId: string): Promise<Pet[]>
}
