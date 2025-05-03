import { PetOwner } from '../../domain/PetOwner'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'

export class PetOwnerServiceStub implements PetOwnerServiceInter {
  private user = new PetOwner(
    1,
    40123456,
    'Tamara',
    'Mecozzi',
    'mecozzite@gmail.com',
    1133445566,
    'Sarmiento 2243',
    'tam',
    '42334411',
    'https://cdn-icons-png.flaticon.com/512/2922/2922510.png'
  )

  async getAll(): Promise<PetOwner[]> {
    return [this.user]
  }

  async getOneById(): Promise<PetOwner> {
    return this.user
  }

  async update(petOwner: PetOwner): Promise<void> {
    console.log('Stub: actualizando datos...')
    this.user = petOwner
    console.log('Nuevo estado:', this.user)
  }

  async delete(id: number): Promise<void> {
    console.log(`Stub: pet owner con ID ${id} eliminado`)
  }
}
