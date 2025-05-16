import { NotificationModel } from '../../domain/Notification'
import { Vet } from '../../domain/Vet'
import { VetServiceInter } from './VetServiceInter'

export class VetServiceStub implements VetServiceInter {
  private user = new Vet(
    1,
    'mgomez',
    'Contraseña123',
    'María',
    'Gómez',
    30456789,
    'maria.gomez@gmail.com',
    '1144556677',
    'https://thumbs.dreamstime.com/z/mujer-veterinaria-con-el--de-aguas-39766136.jpg',
    'Av. Balbin 456',
    '1428',
    'Belgrano',
    'Ciudad Autónoma de Buenos Aires',
    'Argentina',
    1,
    '12345',
    'Cardiología',
    'Lunes a Viernes, 08:00 - 16:00',
    'maria.prof@hospital.com',
    '1133224455',
    'Hospital Central 1000',
    'Belgrano',
    '1428',
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

  async getNotificationsByUserId(id: number): Promise<NotificationModel[]> {
    console.log(`Obteniendo notificaciones para el vet con ID ${id}`)
    return [
      new NotificationModel(
        'appointment',
        'El turno con Mileva ha sido cancelado',
        new Date().toISOString(),
        true
      )
    ]
  }
}
