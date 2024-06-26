import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrgFactory } from 'test/factories/make-org'
import { PetFactory } from 'test/factories/make-pet'

describe('Delete Pets Controller (E2E)', () => {
  let app: INestApplication
  let orgFactory: OrgFactory
  let petFactory: PetFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PetFactory, OrgFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    orgFactory = moduleRef.get(OrgFactory)
    petFactory = moduleRef.get(PetFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /pets/:petId', async () => {
    const user = await orgFactory.makePrismaOrg()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const pet = await petFactory.makePrismaPet({ authorId: user.id })

    const petId = pet.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/pets/${petId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const petOnDatabase = await prisma.pet.findFirst({ where: { id: petId } })

    expect(petOnDatabase).toBeFalsy()
  })
})
