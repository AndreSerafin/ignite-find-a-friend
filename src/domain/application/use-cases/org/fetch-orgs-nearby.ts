import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '../../repositories/orgs-repository'

interface FetchOrgsNearbyIdUseCaseRequest {
  currentLatitude: number
  currentLongitude: number
}

interface FetchOrgsNearbyIdUseCaseResponse {
  orgs: Org[]
}

export class FetchOrgsNearbyIdUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    currentLatitude,
    currentLongitude,
  }: FetchOrgsNearbyIdUseCaseRequest): Promise<FetchOrgsNearbyIdUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: currentLatitude,
      longitude: currentLongitude,
    })

    return { orgs }
  }
}
