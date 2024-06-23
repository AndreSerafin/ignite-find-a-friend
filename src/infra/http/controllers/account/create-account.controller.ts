import { RegisterOrgUseCase } from '@/domain/application/use-cases/org/create-org'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'

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
export class CreateAccountContoller {
  constructor(private registerOrg: RegisterOrgUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  handle(@Body() body: CreateAccountBodySchema) {
    const {
      address,
      authorName,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password,
      state,
      street,
      whatsapp,
    } = body

    this.registerOrg.execute({
      address,
      authorName,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password,
      state,
      street,
      whatsapp,
    })

    return body
  }
}
