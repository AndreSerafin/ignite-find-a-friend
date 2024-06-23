import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { EditPetUseCase } from './edit-pet'
import { makePet } from 'test/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: EditPetUseCase

describe('Edit pet use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new EditPetUseCase(inMemoryPetsRepository)
  })

  it('should be able to edit a pet', async () => {
    inMemoryPetsRepository.items.push(
      makePet(
        { name: 'Bolota', authorId: new UniqueEntityId('org-01') },
        new UniqueEntityId('pet-01'),
      ),
    )

    await sut.execute({
      petId: 'pet-01',
      authorId: 'org-01',
      name: 'Brutus',
      breed: 'Pit-bull',
    })

    expect(inMemoryPetsRepository.items[0]).toEqual(
      expect.objectContaining({ name: 'Brutus', breed: 'Pit-bull' }),
    )
  })

  it('should not be able to edit a pet created by another author', async () => {
    inMemoryPetsRepository.items.push(
      makePet(
        { name: 'Bolota', authorId: new UniqueEntityId('org-02') },
        new UniqueEntityId('pet-01'),
      ),
    )

    const result = await sut.execute({
      petId: 'pet-01',
      authorId: 'org-01',
      name: 'Brutus',
      breed: 'Pit-bull',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
