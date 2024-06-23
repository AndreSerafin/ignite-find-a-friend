import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { FetchPetsByOrgIdUseCase } from './fetch-pets-by-org-id'
import { makePet } from 'test/factories/make-pet'
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

    const result = await sut.execute({ orgId: 'org-01', page: 1 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.pets).toHaveLength(2)
  })

  it('should be able to fetch all pets by org id with filters', async () => {
    inMemoryPetsRepository.items.push(
      makePet({ authorId: new UniqueEntityId('org-01') }),
      makePet({ authorId: new UniqueEntityId('org-01'), name: 'Bolota-1' }),
      makePet({ authorId: new UniqueEntityId('org-01'), name: 'Bolota-2' }),
      makePet({ authorId: new UniqueEntityId('org-02') }),
    )

    const result = await sut.execute({
      orgId: 'org-01',
      page: 1,
      filterParams: { search: 'Bolota' },
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.pets).toHaveLength(2)
  })
})
