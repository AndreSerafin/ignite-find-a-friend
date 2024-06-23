import { UniqueEntityId } from '@/core/unique-entity-id';
import { Org, OrgProps } from '@/domain/enterprise/entities/org';
export declare function makeOrg(override?: Partial<OrgProps>, id?: UniqueEntityId): Org;
