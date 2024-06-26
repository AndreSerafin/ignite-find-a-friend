import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrgFactory } from 'test/factories/make-org'
import { PetFactory } from 'test/factories/make-pet'

describe('Fetch Pets by city Controller (E2E)', () => {
  let app: INestApplication
  let orgFactory: OrgFactory
  let petFactory: PetFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PetFactory, OrgFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    orgFactory = moduleRef.get(OrgFactory)
    petFactory = moduleRef.get(PetFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /pets', async () => {
    const user = await orgFactory.makePrismaOrg({ city: 'Goiânia' })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      petFactory.makePrismaPet({
        authorId: user.id,
        name: 'Pet-01',
      }),
      petFactory.makePrismaPet({
        authorId: user.id,
        name: 'Pet-02',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/pets`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ city: 'Goiânia' })

    expect(response.statusCode).toBe(200)

    expect(response.body.pets).toHaveLength(2)
  })
})
