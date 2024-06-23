import { Org } from '@/domain/enterprise/entities/org';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { Either } from '@/core/either';
interface RegisterOrgUseCaseRequest {
    name: string;
    address: string;
    email: string;
    password: string;
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
type RegisterOrgUseCaseResponse = Either<null, {
    org: Org;
}>;
export declare class RegisterOrgUseCase {
    private orgsRepository;
    constructor(orgsRepository: OrgsRepository);
    execute(request: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse>;
}
export {};
