import { Pet } from '@/domain/enterprise/entities/pet';
import { PetsRepository } from '../../repositories/pets-repository';
import { Either } from '@/core/either';
interface CreatePetUseCaseRequest {
    name: string;
    specie: string;
    age: number;
    size: 0 | 1 | 2;
    breed: string;
    energyLevel: number;
    environment: string;
    about: string;
    authorId: string;
}
type CreatePetUseCaseResponse = Either<null, {
    pet: Pet;
}>;
export declare class CreatePetUseCase {
    private petsRepository;
    constructor(petsRepository: PetsRepository);
    execute({ about, age, energyLevel, environment, name, authorId, size, specie, breed, }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse>;
}
export {};
