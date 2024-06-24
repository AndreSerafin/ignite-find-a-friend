import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { makePet } from 'test/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(inMemoryPetsRepository)
  })

  it('should be able get a pet by id', async () => {
    inMemoryPetsRepository.items.push(
      makePet(
        { name: 'Bolota', authorId: new UniqueEntityId('org-01') },
        new UniqueEntityId('pet-01'),
      ),
    )

    const result = await sut.execute({ petId: 'pet-01', authorId: 'org-01' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      pet: expect.objectContaining({ name: 'Bolota' }),
    })
  })
})
