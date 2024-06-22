import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'
import { FetchPetsByOrgIdUseCase } from './fetch-pets-by-org-id'
import { makePet } from 'tests/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsByOrgIdUseCase

describe('Fetch org pets use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByOrgIdUseCase(inMemoryPetsRepository)
  })

  it('should be able to fetch all pets by org id', async () => {
    inMemoryPetsRepository.items.push(
      makePet({ authorId: new UniqueEntityId('org-01') }),
      makePet({ authorId: new UniqueEntityId('org-01') }),
      makePet({ authorId: new UniqueEntityId('org-02') }),
    )

    const { pets } = await sut.execute({ orgId: 'org-01' })

    expect(pets).toHaveLength(2)
  })
})
