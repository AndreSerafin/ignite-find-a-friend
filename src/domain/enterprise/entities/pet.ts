import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { Optional } from '@/@types/optional'

export interface PetProps {
  name: string
  specie: string
  age: number
  size: 'small' | 'medium' | 'big'
  breed: string
  energyLevel: number
  environment: string
  about: string
  authorId: UniqueEntityId

  createdAt: Date
  updatedAt?: Date | null
}

export class Pet extends Entity<PetProps> {
  static create(props: Optional<PetProps, 'createdAt'>, id?: UniqueEntityId) {
    const pet = new Pet(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return pet
  }

  update(pet: Partial<PetProps>) {
    this.props.about = pet.about ?? this.about
    this.props.age = pet.age ?? this.age
    this.props.breed = pet.breed ?? this.breed
    this.props.energyLevel = pet.energyLevel ?? this.energyLevel
    this.props.environment = pet.environment ?? this.environment
    this.props.name = pet.name ?? this.name
    this.props.size = pet.size ?? this.size
    this.props.specie = pet.specie ?? this.specie

    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get age() {
    return this.props.age
  }

  set age(age: number) {
    this.props.age = age
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

  set size(size: 'small' | 'medium' | 'big') {
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

  get environment() {
    return this.props.environment
  }

  set environment(environment: string) {
    this.props.environment = environment
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
