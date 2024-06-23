import { PaginationParams } from '@/core/repositories/pagination-params';
import { FilterParams, PetsRepository } from '@/domain/application/repositories/pets-repository';
import { Pet } from '@/domain/enterprise/entities/pet';
export declare class InMemoryPetsRepository implements PetsRepository {
    items: Pet[];
    create(pet: Pet): Promise<void>;
    findManyByOrgId(orgId: string, { page }: PaginationParams, filterParams?: FilterParams): Promise<Pet[]>;
    getById(petId: string): Promise<Pet | null>;
}
