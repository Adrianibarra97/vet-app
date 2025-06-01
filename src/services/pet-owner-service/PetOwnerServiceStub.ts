import { PetOwner } from '../../domain/PetOwner'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'
import { USER_ID_TOKEN } from '../config'
import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import AuthServiceManager from '../auth-service/AuthServiceManager'


export class PetOwnerServiceStub implements PetOwnerServiceInter {
  private petOwners: PetOwner[] = [
    new PetOwner(
      1,
      'Eche',
      '1234',
      'Ezequiel',
      'Iozzia',
      36594529,
      'eche@gmail.com',
      '1144556677',
      'src/assets/eche.jfif',
      'Belgrano 123',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      1,
      1,
      'Lucas Cejas',
      '1142334411',
    ),
    new PetOwner(
      2,
      'Caro',
      '1234',
      'Caro',
      'Coronel',
      40567890,
      'caro@gmail.com',
      '1144556677',
      'src/assets/caro.jfif',
      'Av. Santa Fe 456',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      2,
      2,
      'Adrián Ibarra',
      '1142334411',
    ),
    new PetOwner(
      3,
      'Tami',
      '1234',
      'Tamara',
      'Mecozzi',
      37567890,
      'tami@gmail.com',
      '1144556677',
      'src/assets/tam.jfif',
      'Rivadavia 789',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      3,
      3,
      'Lucas Cejas',
      '1142334411',
    ),
    new PetOwner(
      4,
      'LuckR',
      '1234',
      'Lucas',
      'Rodriguez',
      44567890,
      'luckr@gmail.com',
      '1144556677',
      'src/assets/LuckR.jfif',
      'Mitre 1010',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      4,
      4,
      'Adrián Ibarra',
      '1142334411',
    ),
  ]

  private getCurrentUser(): PetOwner {
    const id = parseInt(localStorage.getItem(USER_ID_TOKEN) || '-1')
    const owner = this.petOwners.find((p) => p.id === id)
    if (!owner) throw new Error('PetOwner not found in stub')
    return owner
  }

  async getAll(): Promise<PetOwner[]> {
    return this.petOwners
  }

  async getOneById(): Promise<PetOwner> {
    return this.getCurrentUser()
  }

  async create(petOwner: PetOwner): Promise<void> {
    petOwner.idAuthCredentials = this.petOwners.length + 1
    this.petOwners.push(petOwner)
    const loginUser: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO] = [
      { username: petOwner.username, password: petOwner.password },
      { authCredentialsID: petOwner.idAuthCredentials, typeOfUser: 'VET' }
    ]
    AuthServiceManager.getIntance().addSystemUser(loginUser)
  }

  async update(petOwner: PetOwner): Promise<void> {
    const index = this.petOwners.findIndex((p) => p.id === petOwner.id)
    if (index !== -1) this.petOwners[index] = petOwner
  }

  async delete(id: number): Promise<void> {
    this.petOwners = this.petOwners.filter((p) => p.id !== id)
  }


}