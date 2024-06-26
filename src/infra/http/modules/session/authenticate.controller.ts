import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { AuthenticateOrgUseCase } from '@/domain/application/use-cases/org/authenticate-org'
import { WrongCredentialError } from '@/domain/application/use-cases/org/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import {
  AuthenticateBodySchema,
  authenticateBodySchema,
} from './dto/authenticate'

@Controller('/session')
@Public()
export class AuthenticateContoller {
  constructor(private authenticateOrg: AuthenticateOrgUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const data = body

    const result = await this.authenticateOrg.execute(data)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { access_token: result.value.accessToken }
  }
}
