import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { DeletePetUseCase } from './delete-pet'
import { makePet } from 'test/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete pet use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(inMemoryPetsRepository)
  })

  it('should be able to delete a pet', async () => {
    inMemoryPetsRepository.items.push(
      makePet(
        { name: 'Bolota', authorId: new UniqueEntityId('org-01') },
        new UniqueEntityId('pet-01'),
      ),
    )

    await sut.execute({
      petId: 'pet-01',
      authorId: 'org-01',
    })

    expect(inMemoryPetsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a pet created by another author', async () => {
    inMemoryPetsRepository.items.push(
      makePet(
        { name: 'Bolota', authorId: new UniqueEntityId('org-02') },
        new UniqueEntityId('pet-01'),
      ),
    )

    const result = await sut.execute({
      petId: 'pet-01',
      authorId: 'org-01',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
