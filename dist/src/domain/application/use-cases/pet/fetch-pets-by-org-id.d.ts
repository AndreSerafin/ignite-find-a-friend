import { Pet } from '@/domain/enterprise/entities/pet';
import { PetsRepository } from '../../repositories/pets-repository';
import { Either } from '@/core/either';
interface FilterParams {
    search?: string;
    specie?: string;
    age?: number;
    size?: number;
    breed?: string;
    energyLevel?: number;
    environment?: string;
}
interface FetchPetsByOrgIdUseCaseRequest {
    orgId: string;
    page: number;
    filterParams?: FilterParams;
}
type FetchPetsByOrgIdUseCaseResponse = Either<null, {
    pets: Pet[];
}>;
export declare class FetchPetsByOrgIdUseCase {
    private petsRepository;
    constructor(petsRepository: PetsRepository);
    execute({ orgId, page, filterParams, }: FetchPetsByOrgIdUseCaseRequest): Promise<FetchPetsByOrgIdUseCaseResponse>;
}
export {};
