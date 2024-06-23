import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrgsRepository,
} from '@/domain/application/repositories/orgs-repository'
import { getDistanceBetweenCoordinates } from '@/domain/application/utils/get-distance-beetwen-coordinates'
import { Org } from '@/domain/enterprise/entities/org'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(org: Org): Promise<void> {
    this.items.push(org)
  }

  async findManyNearby(
    findManyNearbyParams: FindManyNearbyParams,
    { page }: PaginationParams,
  ): Promise<Org[]> {
    const orgs = this.items
      .filter((item) => {
        const distance = getDistanceBetweenCoordinates(
          {
            latitude: findManyNearbyParams.latitude,
            longitude: findManyNearbyParams.longitude,
          },
          {
            latitude: item.latitude,
            longitude: item.longitude,
          },
        )

        return distance < 10
      })
      .slice((page - 1) * 20, page * 20)

    return orgs
  }
}
