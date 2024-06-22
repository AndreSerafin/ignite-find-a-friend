import { Pet } from '@/domain/enterprise/entities/pet'

export interface PetsRepository {
  create(pet: Pet): Promise<void>
}
