import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { HashGenerator } from '@/domain/cryptography/hash-generator'

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
  OrgAlreadyExistsError,
  {
    org: Org
  }
>

@Injectable()
export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    password,
    ...request
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      return left(new OrgAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const org = Org.create({ ...request, email, password: hashedPassword })

    await this.orgsRepository.create(org)

    return right({ org })
  }
}
