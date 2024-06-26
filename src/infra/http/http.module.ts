import { AuthenticateOrgUseCase } from '@/domain/application/use-cases/org/authenticate-org'
import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'

import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateContoller } from './modules/session/authenticate.controller'
import { PetModule } from './modules/pet/pet.module'
import { AccountModule } from './modules/account/account.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, PetModule, AccountModule],
  controllers: [AuthenticateContoller],
  providers: [RegisterOrgUseCase, AuthenticateOrgUseCase],
})
export class HttpModule {}
