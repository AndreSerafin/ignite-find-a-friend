import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreatePetUseCase } from '@/domain/application/use-cases/pet/create-pet'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createPetBodySchema = z.object({
  name: z.string(),
  specie: z.string(),
  age: z.number(),
  size: z.enum(['small', 'medium', 'big']),
  breed: z.string(),
  energyLevel: z.number(),
  environment: z.string(),
  about: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createPetBodySchema)

type CreatePetBodySchema = z.infer<typeof createPetBodySchema>

@Controller('/pets')
export class CreatePetContoller {
  constructor(private createPet: CreatePetUseCase) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(bodyValidationPipe) body: CreatePetBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const data = body

    const result = await this.createPet.execute({ ...data, authorId: user.sub })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
