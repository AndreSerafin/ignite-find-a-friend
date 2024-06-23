import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { FetchOrgsNearbyIdUseCase } from './fetch-orgs-nearby'
import { makeOrg } from 'tests/factories/make-org'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsNearbyIdUseCase

describe('Fetch nearby orgs use case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsNearbyIdUseCase(inMemoryOrgsRepository)
  })

  it('should be able to fetch all pets by org id', async () => {
    inMemoryOrgsRepository.items.push(
      makeOrg({ latitude: -23.55052, longitude: -46.633308 }),
      makeOrg({ latitude: -23.55052, longitude: -46.633308 }),
      makeOrg({ latitude: -23.55052, longitude: -46.633308 }),
      makeOrg({ latitude: -22.906847, longitude: -43.172896 }),
      makeOrg({ latitude: -15.794229, longitude: -47.882166 }),
      makeOrg({ latitude: -3.119028, longitude: -60.021731 }),
    )

    const result = await sut.execute({
      currentLatitude: -23.55052,
      currentLongitude: -46.633308,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.orgs).toHaveLength(3)
  })
})
