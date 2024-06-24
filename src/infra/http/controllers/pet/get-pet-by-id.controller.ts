import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { GetPetByIdUseCase } from '@/domain/application/use-cases/pet/get-pet-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { PetPresenter } from '../../presenters/pet-presenter'

@Controller('/pets/:petId')
export class GetPetByIdContoller {
  constructor(private getPetById: GetPetByIdUseCase) {}

  @Get()
  @UsePipes()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const result = await this.getPetById.execute({
      petId,
      authorId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    const pet = PetPresenter.toHTTP(result.value.pet)

    return { pet }
  }
}
