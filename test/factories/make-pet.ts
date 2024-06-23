import { UniqueEntityId } from '@/core/unique-entity-id'
import { Pet, PetProps } from '@/domain/enterprise/entities/pet'
import { faker } from '@faker-js/faker'

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityId) {
  const pet = Pet.create(
    {
      authorId: new UniqueEntityId(),
      age: faker.number.int({ min: 0, max: 20 }),
      about: faker.lorem.paragraph(1),
      breed: faker.lorem.word(),
      energyLevel: faker.number.int({ min: 0, max: 5 }),
      environment: faker.lorem.word(),
      name: faker.animal.dog.name,
      size: faker.number.int({ min: 0, max: 3 }),
      specie: 'Dog',
      ...override,
    },
    id,
  )
  return pet
}
