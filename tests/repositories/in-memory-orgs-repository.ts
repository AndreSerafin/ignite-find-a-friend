import { OrgsRepository } from '@/domain/application/repositories/orgs-repository'
import { Org } from '@/domain/enterprise/entities/org'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(org: Org): Promise<void> {
    this.items.push(org)
  }
}
