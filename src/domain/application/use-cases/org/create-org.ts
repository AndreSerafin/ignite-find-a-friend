import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  email: string
  password: string
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

type RegisterOrgUseCaseResponse = Either<
  null,
  {
    org: Org
  }
>

@Injectable()
export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const org = Org.create(request)

    await this.orgsRepository.create(org)

    return right({ org })
  }
}
