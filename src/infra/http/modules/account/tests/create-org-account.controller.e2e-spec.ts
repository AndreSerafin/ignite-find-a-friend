import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrgFactory } from 'test/factories/make-org'

describe('Create Org Account Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrgFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const mockUser = {
      email: 'johndoe@example.com',
      password: '123456',
      address: 'Qd.15, Lt.25',
      authorName: 'John Doe',
      cep: '75064-360',
      city: 'Anápolis',
      latitude: -16.29304422014285,
      longitude: -48.96736472608177,
      name: "John Doe's Organization",
      neighborhood: 'Vila Jaiara',
      state: 'GO',
      street: 'Rua sussuapara',
      whatsapp: '6283334433',
    }
    const response = await request(app.getHttpServer())
      .post(`/accounts`)
      .send(mockUser)

    expect(response.statusCode).toBe(201)

    const petOnDatabase = await prisma.user.findFirst({
      where: { email: mockUser.email },
    })

    expect(petOnDatabase).toBeTruthy()
  })
})
