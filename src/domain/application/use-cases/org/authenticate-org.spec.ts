import { AuthenticateOrgUseCase } from './authenticate-org'
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeOrg } from 'test/factories/make-org'
let inMemoryOrgsRepository: InMemoryOrgsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateOrgUseCase(
      inMemoryOrgsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able authenticate a Org', async () => {
    const student = makeOrg({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryOrgsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
