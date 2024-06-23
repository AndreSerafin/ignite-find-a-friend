import { PaginationParams } from '@/core/repositories/pagination-params';
import { FindManyNearbyParams, OrgsRepository } from '@/domain/application/repositories/orgs-repository';
import { Org } from '@/domain/enterprise/entities/org';
import { PrismaService } from '../prisma.service';
export declare class PrismaOrgsRepository implements OrgsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(org: Org): Promise<void>;
    findByEmail(email: string): Promise<Org | null>;
    findManyNearby({ latitude, longitude }: FindManyNearbyParams, { page }: PaginationParams): Promise<Org[]>;
}
