import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { DeletePetUseCase } from '@/domain/application/use-cases/pet/delete-pet'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

@Controller('/pets/:petId')
export class DeletePetContoller {
  constructor(private deletePet: DeletePetUseCase) {}

  @Delete()
  @UsePipes()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const result = await this.deletePet.execute({
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
  }
}
