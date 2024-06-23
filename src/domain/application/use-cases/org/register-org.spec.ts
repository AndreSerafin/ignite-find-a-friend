import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { faker } from '@faker-js/faker'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let fakeHasher: FakeHasher
let sut: RegisterOrgUseCase

describe('Create org use case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterOrgUseCase(inMemoryOrgsRepository, fakeHasher)
  })

  it('should be able to create a org', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
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
  it('should be able to hash org password upon registration', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
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

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight).toBeTruthy()
    expect(inMemoryOrgsRepository.items[0].password).toEqual(hashedPassword)
  })
})
