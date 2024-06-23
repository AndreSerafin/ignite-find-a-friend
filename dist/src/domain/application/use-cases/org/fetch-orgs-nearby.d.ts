import { Org } from '@/domain/enterprise/entities/org';
import { OrgsRepository } from '../../repositories/orgs-repository';
import { Either } from '@/core/either';
interface FetchOrgsNearbyIdUseCaseRequest {
    currentLatitude: number;
    currentLongitude: number;
    page: number;
}
type FetchOrgsNearbyIdUseCaseResponse = Either<null, {
    orgs: Org[];
}>;
export declare class FetchOrgsNearbyIdUseCase {
    private orgsRepository;
    constructor(orgsRepository: OrgsRepository);
    execute({ currentLatitude, currentLongitude, page, }: FetchOrgsNearbyIdUseCaseRequest): Promise<FetchOrgsNearbyIdUseCaseResponse>;
}
export {};
