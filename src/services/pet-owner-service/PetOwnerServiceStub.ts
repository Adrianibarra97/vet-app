import { PetOwner } from '../../domain/PetOwner'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'

export class PetOwnerServiceStub implements PetOwnerServiceInter {
  private user = new PetOwner(
    1,
    'tam',
    'Contraseña123',
    'Tamara',
    'Mecozzi',
    40123456,
    'mecozzite@gmail.com',
    '1144556677',
    'src/assets/tam.jpg',
    'Sarmiento 2243',
    '1663',
    'San Miguel',
    'Buenos Aires',
    'Argentina',
    3,
    'Gisele',

    '1142334411',
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
