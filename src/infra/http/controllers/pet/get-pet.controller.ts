import { Controller, Get } from '@nestjs/common'

@Controller('/pets')
export class GetPetContoller {
  @Get()
  handle() {
    return { teste: 'Hello world' }
  }
}
