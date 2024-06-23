import { Org } from '@/domain/enterprise/entities/org';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { Either } from '@/core/either';
interface CreateOrgUseCaseRequest {
    name: string;
    address: string;
    whatsapp: string;
    authorName: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    latitude: number;
    longitude: number;
}
type CreateOrgUseCaseResponse = Either<null, {
    org: Org;
}>;
export declare class CreateOrgUseCase {
    private orgsRepository;
    constructor(orgsRepository: OrgsRepository);
    execute(request: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse>;
}
export {};
