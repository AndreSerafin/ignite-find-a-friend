import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { faker } from '@faker-js/faker'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create org use case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(inMemoryOrgsRepository)
  })

  it('should be able to create a org', async () => {
    const result = await sut.execute({
      address: 'N. 400',
      authorName: 'John Doe',
      name: 'Org-01',
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      neighborhood: 'Centro',
      state: 'GO',
      street: 'Avenida Goiás',
      whatsapp: faker.phone.number(),
    })

    expect(result.isRight).toBeTruthy()
    expect(inMemoryOrgsRepository.items[0].name).toBe('Org-01')
    expect(inMemoryOrgsRepository.items[0].authorName).toBe('John Doe')
  })
})
