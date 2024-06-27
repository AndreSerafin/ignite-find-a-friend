import { AuthenticateOrgUseCase } from '@/domain/application/use-cases/org/authenticate-org'
import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'

import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { PetModule } from './modules/pet/pet.module'
import { AccountModule } from './modules/account/account.module'
import { AuthenticateModule } from './modules/session/authenticate..module'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    PetModule,
    AccountModule,
    AuthenticateModule,
  ],
  providers: [RegisterOrgUseCase, AuthenticateOrgUseCase],
})
export class HttpModule {}
