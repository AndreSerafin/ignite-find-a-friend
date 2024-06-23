import { Pet } from '@/domain/enterprise/entities/pet';
import { PetsRepository } from '../../repositories/pets-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Either } from '@/core/either';
interface GetPetByIdUseCaseRequest {
    petId: string;
}
type GetPetByIdUseCaseResponse = Either<ResourceNotFoundError, {
    pet: Pet;
}>;
export declare class GetPetByIdUseCase {
    private petsRepository;
    constructor(petsRepository: PetsRepository);
    execute({ petId, }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse>;
}
export {};
