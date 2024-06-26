import { Module } from '@nestjs/common'

import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AccountContoller } from './account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AccountContoller],
  providers: [RegisterOrgUseCase],
})
export class AccountModule {}
