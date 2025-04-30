import { Vet } from '../../domain/Vet'
import { VetServiceInter } from './VetServiceInter'

export class VetServiceStub implements VetServiceInter {
  private user = new Vet(
    1,
    30456789,
    'María',
    'Gómez',
    'maria.gomez@gmail.com',
    1144556677,
    'Av. Balbin 456',
    'mgomez',
    '43001234',
    '12345',
    'Cardiología',
    'Lunes a Viernes, 08:00 - 16:00',
    'maria.prof@hospital.com',
    'Hospital Central 1000',
    '1533224455',
    'https://thumbs.dreamstime.com/z/mujer-veterinaria-con-el-perro-de-aguas-39766136.jpg'
  )

  async getAll(): Promise<Vet[]> {
    return [this.user]
  }

  async getOneById(): Promise<Vet> {
    return this.user
  }

  async update(vet: Vet): Promise<void> {
    console.log('Stub: actualizando datos...')
    this.user = vet
    console.log('Nuevo estado:', this.user)
  }

  async delete(id: number): Promise<void> {
    console.log(`Stub: usuario con ID ${id} eliminado`)
  }
}
