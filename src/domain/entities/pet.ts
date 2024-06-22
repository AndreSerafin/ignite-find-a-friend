import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { Optional } from '@/@types/optional'

interface PetProps {
  name: string
  specie: string
  age: number
  weight: number
  height: number
  breed?: string
  color?: string
  cityId: UniqueEntityId
  orgId: UniqueEntityId

  createdAt: Date
  updatedAt?: Date
}

export class Pet extends Entity<PetProps> {
  create(props: Optional<PetProps, 'createdAt'>, id: UniqueEntityId) {
    const pet = new Pet(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return pet
  }
}
