import { UniqueEntityId } from '@/core/unique-entity-id'
import { Org } from '@/domain/enterprise/entities/org'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaOrgMapper {
  static toDomain(raw: PrismaUser): Org {
    return Org.create(
      {
        address: raw.address,
        authorName: raw.authorName,
        cep: raw.cep,
        city: raw.city,
        email: raw.email,
        latitude: raw.latitude.toNumber(),
        longitude: raw.longitude.toNumber(),
        name: raw.name,
        neighborhood: raw.neighborhood,
        password: raw.password,
        state: raw.state,
        street: raw.street,
        whatsapp: raw.whatsapp,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(org: Org): Prisma.UserUncheckedCreateInput {
    return {
      id: org.id.toString(),
      address: org.address,
      authorName: org.authorName,
      cep: org.cep,
      city: org.city,
      email: org.email,
      latitude: org.latitude,
      longitude: org.longitude,
      name: org.name,
      neighborhood: org.neighborhood,
      password: org.password,
      state: org.state,
      street: org.street,
      whatsapp: org.whatsapp,
    }
  }
}
