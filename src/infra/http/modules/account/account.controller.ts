import { OrgAlreadyExistsError } from '@/domain/application/use-cases/org/errors/org-already-exists-error'
import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/register-org'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import {
  CreateAccountBodySchema,
  createAccountBodySchema,
} from './dto/create-account'

@Controller('/accounts')
@Public()
export class AccountContoller {
  constructor(private registerOrg: RegisterOrgUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async create(@Body() body: CreateAccountBodySchema) {
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
