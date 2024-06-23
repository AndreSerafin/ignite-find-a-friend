import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyParams,
  OrgsRepository,
} from '@/domain/application/repositories/orgs-repository'
import { Org } from '@/domain/enterprise/entities/org'
import { PrismaService } from '../prisma.service'
import { PrismaOrgMapper } from '../mappers/prisma-orgs-mapper'
import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaOrgsRepository implements OrgsRepository {
  constructor(private prisma: PrismaService) {}

  async create(org: Org): Promise<void> {
    const data = PrismaOrgMapper.toPrisma(org)

    await this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await this.prisma.user.findFirst({ where: { email } })

    if (!org) {
      return null
    }

    return PrismaOrgMapper.toDomain(org)
  }

  async findManyNearby(
    { latitude, longitude }: FindManyNearbyParams,
    { page }: PaginationParams,
  ): Promise<Org[]> {
    const pageSize = 20
    const offset = (page - 1) * pageSize

    const orgs = await this.prisma.$queryRaw<User[]>`
    SELECT * from users
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    LIMIT ${pageSize} OFFSET ${offset}
  `

    return orgs.map((org) => PrismaOrgMapper.toDomain(org))
  }
}
