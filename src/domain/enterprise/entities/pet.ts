import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { Optional } from '@/@types/optional'

enum Size {
  SMALL,
  MEDIUM,
  BIG,
}

export interface PetProps {
  name: string
  specie: string
  age: number
  size: Size
  breed: string
  energyLevel: number
  environment: string
  about: string
  authorId: UniqueEntityId

  createdAt: Date
  updatedAt?: Date
}

export class Pet extends Entity<PetProps> {
  static create(props: Optional<PetProps, 'createdAt'>, id?: UniqueEntityId) {
    const pet = new Pet(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return pet
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get specie() {
    return this.props.specie
  }

  set specie(specie: string) {
    this.props.specie = specie
    this.touch()
  }

  get size() {
    return this.props.size
  }

  set size(size: Size) {
    this.props.size = size
    this.touch()
  }

  get breed() {
    return this.props.breed
  }

  set breed(breed: string) {
    this.props.breed = breed
    this.touch()
  }

  get energyLevel() {
    return this.props.energyLevel
  }

  set energyLevel(energyLevel: number) {
    this.props.energyLevel = energyLevel
    this.touch()
  }

  get about() {
    return this.props.about
  }

  set about(about: string) {
    this.props.about = about
    this.touch()
  }

  get excerptAbout() {
    return this.props.about.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
