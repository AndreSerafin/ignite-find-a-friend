import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/domain/application/use-cases/org/errors/org-already-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  address: z.string(),
  whatsapp: z.string(),
  authorName: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountContoller {
  constructor(private registerOrg: RegisterOrgUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const data = body

    const result = await this.registerOrg.execute(data)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrgAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
