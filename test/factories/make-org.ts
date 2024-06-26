import { UniqueEntityId } from '@/core/unique-entity-id'
import { Org, OrgProps } from '@/domain/enterprise/entities/org'
import { PrismaOrgMapper } from '@/infra/database/prisma/mappers/prisma-orgs-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeOrg(override: Partial<OrgProps> = {}, id?: UniqueEntityId) {
  const org = Org.create(
    {
      address: faker.location.streetAddress(),
      authorName: faker.person.fullName(),
      name: faker.company.name(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      neighborhood: faker.lorem.word(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsapp: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
  return org
}

@Injectable()
export class OrgFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrg(data: Partial<OrgProps> = {}): Promise<Org> {
    const org = makeOrg(data)

    await this.prisma.user.create({
      data: PrismaOrgMapper.toPrisma(org),
    })

    return org
  }
}
