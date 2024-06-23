import { OrgsRepository } from '../../repositories/orgs-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { WrongCredentialError } from './errors/wrong-credentials-error'
import { Encrypter } from '@/domain/cryptography/encrypter'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

type AuthenticateOrgUseCaseResponse = Either<
  WrongCredentialError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      return left(new WrongCredentialError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      org.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialError())
    }

    const accessToken = await this.encrypter.encrypt({ sub: org.id.toString() })

    return right({ accessToken })
  }
}
