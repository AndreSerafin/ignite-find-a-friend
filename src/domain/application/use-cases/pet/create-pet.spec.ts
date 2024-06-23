import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { faker } from '@faker-js/faker'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(inMemoryPetsRepository)
  })

  it('should be able to create a pet', () => {
    sut.execute({
      name: 'Bolota',
      about: faker.lorem.paragraph(),
      age: 7,
      authorId: 'org-01',
      energyLevel: 3,
      environment: 'Ambiente amplo',
      size: 'small',
      specie: 'Dog',
      breed: 'Shih tzu',
    })

    expect(inMemoryPetsRepository.items[0].name).toBe('Bolota')
  })
})
