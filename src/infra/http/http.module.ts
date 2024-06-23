import { Module } from '@nestjs/common'
import { GetPetContoller } from './controllers/pet/get-pet.controller'
import { CreateAccountContoller } from './controllers/account/create-account.controller'
import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/create-org'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [GetPetContoller, CreateAccountContoller],
  providers: [RegisterOrgUseCase],
})
export class HttpModule {}
