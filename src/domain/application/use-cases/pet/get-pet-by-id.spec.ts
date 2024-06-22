import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { makePet } from 'tests/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(inMemoryPetsRepository)
  })

  it('should be able get a pet by id', async () => {
    inMemoryPetsRepository.items.push(makePet({}, new UniqueEntityId('pet-01')))

    const result = await sut.execute({ petId: 'pet-01' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      pet: expect.objectContaining({ _id: { value: 'pet-01' } }),
    })
  })
})
