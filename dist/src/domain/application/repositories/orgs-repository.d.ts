import { PaginationParams } from '@/core/repositories/pagination-params';
import { Org } from '@/domain/enterprise/entities/org';
export interface FindManyNearbyParams {
    latitude: number;
    longitude: number;
}
export declare abstract class OrgsRepository {
    abstract create(org: Org): Promise<void>;
    abstract findManyNearby(findManyNearbyParams: FindManyNearbyParams, params: PaginationParams): Promise<Org[]>;
}
