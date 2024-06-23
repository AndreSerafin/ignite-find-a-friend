import { UniqueEntityId } from '@/core/unique-entity-id'
import { Org, OrgProps } from '@/domain/enterprise/entities/org'
import { faker } from '@faker-js/faker'

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
