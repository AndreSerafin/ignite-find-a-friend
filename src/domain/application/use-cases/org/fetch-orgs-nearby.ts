import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '../../repositories/orgs-repository'
import { Either, right } from '@/core/either'

interface FetchOrgsNearbyIdUseCaseRequest {
  currentLatitude: number
  currentLongitude: number
  page: number
}

type FetchOrgsNearbyIdUseCaseResponse = Either<
  null,
  {
    orgs: Org[]
  }
>

export class FetchOrgsNearbyIdUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    currentLatitude,
    currentLongitude,
    page,
  }: FetchOrgsNearbyIdUseCaseRequest): Promise<FetchOrgsNearbyIdUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby(
      {
        latitude: currentLatitude,
        longitude: currentLongitude,
      },
      { page },
    )

    return right({ orgs })
  }
}
