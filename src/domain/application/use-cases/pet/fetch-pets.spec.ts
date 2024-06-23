import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository'
import { makePet } from 'test/factories/make-pet'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { makeOrg } from 'test/factories/make-org'
import { FetchPetsUseCase } from './fetch-pets'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch org pets use case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(inMemoryPetsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    inMemoryPetsRepository.items.push(
      makePet({ authorId: new UniqueEntityId('org-01') }),
      makePet({ authorId: new UniqueEntityId('org-01') }),
      makePet({ authorId: new UniqueEntityId('org-02') }),
    )

    inMemoryPetsRepository.orgs.push(
      makeOrg({ city: 'Goiania' }, new UniqueEntityId('org-01')),
    )

    const result = await sut.execute({
      filterParams: { city: 'Goiania' },
      page: 1,
    })

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

    inMemoryPetsRepository.orgs.push(
      makeOrg({ city: 'Goiania' }, new UniqueEntityId('org-01')),
    )

    const result = await sut.execute({
      page: 1,
      filterParams: { city: 'Goiania', search: 'Bolota' },
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.pets).toHaveLength(2)
  })
})
