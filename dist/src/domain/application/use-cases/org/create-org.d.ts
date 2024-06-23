import { Org } from '@/domain/enterprise/entities/org';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { Either } from '@/core/either';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';
import { HashGenerator } from '@/domain/cryptography/hash-generator';
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
type RegisterOrgUseCaseResponse = Either<OrgAlreadyExistsError, {
    org: Org;
}>;
export declare class RegisterOrgUseCase {
    private orgsRepository;
    private hashGenerator;
    constructor(orgsRepository: OrgsRepository, hashGenerator: HashGenerator);
    execute({ email, password, ...request }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse>;
}
export {};
