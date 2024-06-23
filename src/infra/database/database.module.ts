import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { OrgsRepository } from '@/domain/application/repositories/orgs-repository'
import { PrismaOrgsRepository } from './prisma/repositories/prisma-orgs-repository'
import { PetsRepository } from '@/domain/application/repositories/pets-repository'
import { PrismaPetsRepository } from './prisma/repositories/prisma-pets-repository'

@Module({
  providers: [
    PrismaService,
    { provide: OrgsRepository, useClass: PrismaOrgsRepository },
    { provide: PetsRepository, useClass: PrismaPetsRepository },
  ],
  exports: [PrismaService, OrgsRepository, PetsRepository],
})
export class DatabaseModule {}
