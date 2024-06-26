import { UniqueEntityId } from '@/core/unique-entity-id'
import { Pet, PetProps } from '@/domain/enterprise/entities/pet'
import { PrismaPetMapper } from '@/infra/database/prisma/mappers/prisma-pets-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { randomInt } from 'node:crypto'

type Size = 'small' | 'medium' | 'big'

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityId) {
  const size: Size[] = ['small', 'medium', 'big']

  const pet = Pet.create(
    {
      authorId: new UniqueEntityId(),
      age: faker.number.int({ min: 0, max: 20 }),
      about: faker.lorem.paragraph(1),
      breed: faker.lorem.word(),
      energyLevel: faker.number.int({ min: 0, max: 5 }),
      environment: faker.lorem.word(),
      name: faker.animal.dog.name,
      size: size[randomInt(0, 3)],
      specie: 'Dog',
      ...override,
    },
    id,
  )
  return pet
}

@Injectable()
export class PetFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPet(data: Partial<PetProps> = {}): Promise<Pet> {
    const pet = makePet(data)

    await this.prisma.pet.create({
      data: PrismaPetMapper.toPrisma(pet),
    })

    return pet
  }
}
