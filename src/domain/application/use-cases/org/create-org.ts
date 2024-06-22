import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '../../repositories/orgs-repository'

interface CreateOrgUseCaseRequest {
  name: string
  address: string
  whatsapp: string
  authorName: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const org = Org.create(request)

    await this.orgsRepository.create(org)

    return { org }
  }
}
