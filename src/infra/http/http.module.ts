import { Module } from '@nestjs/common'
import { CreateAccountContoller } from './controllers/account/create-account.controller'
import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateContoller } from './controllers/session/authenticate.controller'
import { AuthenticateOrgUseCase } from '@/domain/application/use-cases/org/authenticate-org'
import { CreatePetContoller } from './controllers/pet/create-pet.controller'
import { CreatePetUseCase } from '@/domain/application/use-cases/pet/create-pet'
import { FetchPetsContoller } from './controllers/pet/fetch-pets.controller'
import { FetchPetsUseCase } from '@/domain/application/use-cases/pet/fetch-pets'
import { FetchPetsByOrgIdUseCase } from '@/domain/application/use-cases/pet/fetch-pets-by-org-id'
import { FetchPetsByOrgIdContoller } from './controllers/pet/fetch-pets-by-org-id.controller'
import { EditPetContoller } from './controllers/pet/edit-pet.controller'
import { EditPetUseCase } from '@/domain/application/use-cases/pet/edit-pet'
import { DeletePetContoller } from './controllers/pet/delete-pet.controller'
import { DeletePetUseCase } from '@/domain/application/use-cases/pet/delete-pet'
import { GetPetByIdUseCase } from '@/domain/application/use-cases/pet/get-pet-by-id'
import { GetPetByIdContoller } from './controllers/pet/get-pet-by-id.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountContoller,
    AuthenticateContoller,
    CreatePetContoller,
    FetchPetsContoller,
    FetchPetsByOrgIdContoller,
    EditPetContoller,
    DeletePetContoller,
    GetPetByIdContoller,
  ],
  providers: [
    RegisterOrgUseCase,
    AuthenticateOrgUseCase,
    CreatePetUseCase,
    FetchPetsUseCase,
    FetchPetsByOrgIdUseCase,
    EditPetUseCase,
    DeletePetUseCase,
    GetPetByIdUseCase,
  ],
})
export class HttpModule {}
