import { PaginationParams } from '@/core/repositories/pagination-params';
import { Org } from '@/domain/enterprise/entities/org';
export interface FindManyNearbyParams {
    latitude: number;
    longitude: number;
}
export interface OrgsRepository {
    create(org: Org): Promise<void>;
    findManyNearby(findManyNearbyParams: FindManyNearbyParams, params: PaginationParams): Promise<Org[]>;
}
