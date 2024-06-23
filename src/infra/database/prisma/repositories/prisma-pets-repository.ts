import {
  FilterParams,
  PetsRepository,
} from '@/domain/application/repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pet } from '@/domain/enterprise/entities/pet'
import { PrismaPetMapper } from '../mappers/prisma-pets-mapper'

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet)

    await this.prisma.pet.create({ data })
  }

  async save(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet)
    await this.prisma.pet.update({
      where: { id: pet.id.toString() },
      data,
    })
  }

  async findMany(
    { page }: PaginationParams,
    {
      age,
      city,
      breed,
      energyLevel,
      environment,
      search,
      size,
      specie,
    }: FilterParams = {},
  ): Promise<Pet[]> {
    const data = await this.prisma.pet.findMany({
      where: {
        age,
        breed: { contains: breed, mode: 'insensitive' },
        energyLevel,
        environment: { contains: environment, mode: 'insensitive' },
        size: { contains: size, mode: 'insensitive' },
        specie: { contains: specie, mode: 'insensitive' },
        about: { contains: search, mode: 'insensitive' },
        name: { contains: search, mode: 'insensitive' },
        org: { city: { contains: city, mode: 'insensitive' } },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return data.map(PrismaPetMapper.toDomain)
  }

  async findManyByOrgId(
    orgId: string,
    { page }: PaginationParams,
    {
      age,
      breed,
      energyLevel,
      environment,
      search,
      size,
      specie,
    }: FilterParams = {},
  ): Promise<Pet[]> {
    const data = await this.prisma.pet.findMany({
      where: {
        age,
        breed: { contains: breed, mode: 'insensitive' },
        energyLevel,
        environment: { contains: environment, mode: 'insensitive' },
        size: { contains: size, mode: 'insensitive' },
        specie: { contains: specie, mode: 'insensitive' },
        about: { contains: search, mode: 'insensitive' },
        name: { contains: search, mode: 'insensitive' },
        authorId: orgId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return data.map(PrismaPetMapper.toDomain)
  }

  async findById(petId: string): Promise<Pet | null> {
    const data = await this.prisma.pet.findFirst({ where: { id: petId } })

    if (!data) {
      return null
    }

    return PrismaPetMapper.toDomain(data)
  }
}
