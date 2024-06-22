import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { Optional } from '@/@types/optional'

export interface OrgProps {
  name: string
  address: string
  whatsapp: string
  authorName: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt?: Date
}

export class Org extends Entity<OrgProps> {
  static create(props: Optional<OrgProps, 'createdAt'>, id?: UniqueEntityId) {
    const org = new Org(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return org
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  get whatsapp() {
    return this.props.whatsapp
  }

  set whatsapp(whatsapp: string) {
    this.props.whatsapp = whatsapp
    this.touch()
  }

  get authorName() {
    return this.props.authorName
  }

  set authorName(authorName: string) {
    this.props.authorName = authorName
    this.touch()
  }

  get cep() {
    return this.props.cep
  }

  set cep(cep: string) {
    this.props.cep = cep
    this.touch()
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
    this.touch()
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
    this.touch()
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
    this.touch()
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
