import { Org } from '@/domain/enterprise/entities/org'

export interface OrgsRepository {
  create(org: Org): Promise<void>
}
