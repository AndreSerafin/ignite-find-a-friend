import { PaginationParams } from '@/core/repositories/pagination-params';
import { FindManyNearbyParams, OrgsRepository } from '@/domain/application/repositories/orgs-repository';
import { Org } from '@/domain/enterprise/entities/org';
export declare class InMemoryOrgsRepository implements OrgsRepository {
    items: Org[];
    create(org: Org): Promise<void>;
    findManyNearby(findManyNearbyParams: FindManyNearbyParams, { page }: PaginationParams): Promise<Org[]>;
}
