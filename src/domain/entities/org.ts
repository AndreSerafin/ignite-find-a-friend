import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { Optional } from '@/@types/optional'

interface OrgProps {
  name: string
  address: string
  whatsapp: string
  author_name: string
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
  create(props: Optional<OrgProps, 'createdAt'>, id: UniqueEntityId) {
    const org = new Org(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return org
  }
}
