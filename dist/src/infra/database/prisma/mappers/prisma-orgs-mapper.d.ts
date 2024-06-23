import { Org } from '@/domain/enterprise/entities/org';
import { Prisma, User as PrismaUser } from '@prisma/client';
export declare class PrismaOrgMapper {
    static toDomain(raw: PrismaUser): Org;
    static toPrisma(org: Org): Prisma.UserUncheckedCreateInput;
}
