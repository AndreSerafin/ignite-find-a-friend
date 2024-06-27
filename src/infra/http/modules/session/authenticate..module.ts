import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateContoller } from './authenticate.controller'
import { AuthenticateOrgUseCase } from '@/domain/application/use-cases/org/authenticate-org'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateContoller],
  providers: [AuthenticateOrgUseCase],
})
export class AuthenticateModule {}
