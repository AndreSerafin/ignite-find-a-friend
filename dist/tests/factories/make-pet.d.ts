import { UniqueEntityId } from '@/core/unique-entity-id';
import { Pet, PetProps } from '@/domain/enterprise/entities/pet';
export declare function makePet(override?: Partial<PetProps>, id?: UniqueEntityId): Pet;
