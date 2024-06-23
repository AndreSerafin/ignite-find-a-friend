import { Module } from '@nestjs/common'
import { GetPetContoller } from './controllers/get-pet.controller';

@Module({
    controllers:[GetPetContoller]
})
export class HttpModule {}
