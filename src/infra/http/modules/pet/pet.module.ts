import { Module } from '@nestjs/common'

import { CreatePetUseCase } from '@/domain/application/use-cases/pet/create-pet'
import { DeletePetUseCase } from '@/domain/application/use-cases/pet/delete-pet'
import { EditPetUseCase } from '@/domain/application/use-cases/pet/edit-pet'
import { FetchPetsUseCase } from '@/domain/application/use-cases/pet/fetch-pets'
import { FetchPetsByOrgIdUseCase } from '@/domain/application/use-cases/pet/fetch-pets-by-org-id'
import { GetPetByIdUseCase } from '@/domain/application/use-cases/pet/get-pet-by-id'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { PetController } from './pet.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [PetController],
  providers: [
    CreatePetUseCase,
    FetchPetsUseCase,
    FetchPetsByOrgIdUseCase,
    EditPetUseCase,
    DeletePetUseCase,
    GetPetByIdUseCase,
  ],
})
export class PetModule {}
