import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditPetUseCase } from '@/domain/application/use-cases/pet/edit-pet'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const editPetBodySchema = z.object({
  name: z.string().optional(),
  specie: z.string().optional(),
  age: z.number().optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  breed: z.string().optional(),
  energyLevel: z.number().optional(),
  environment: z.string().optional(),
  about: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editPetBodySchema)

type EditPetBodySchema = z.infer<typeof editPetBodySchema>

@Controller('/pets/:petId')
export class EditPetContoller {
  constructor(private editPet: EditPetUseCase) {}

  @Patch()
  @UsePipes()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditPetBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('petId') petId: string,
  ) {
    const data = body

    const result = await this.editPet.execute({
      ...data,
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
