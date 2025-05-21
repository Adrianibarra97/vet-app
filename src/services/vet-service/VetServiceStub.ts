import { NotificationModel } from '../../domain/Notification'
import { Vet } from '../../domain/Vet'
import { VetServiceInter } from './VetServiceInter'

export const sharedMockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_DELETE',
    'Turno cancelado por el dueño Juan Pérez para su mascota Rocky',
    new Date().toISOString(),
    true,
    'Rocky',
    'Juan Pérez',
    'María Gómez',
    '2024-05-21T15:00:00Z',
  ),
  new NotificationModel(
    2,
    'SHIFT_TODAY',
    'Recordatorio: tenés un turno hoy con Rocky',
    new Date().toISOString(),
    true,
    'Rocky',
    'Juan Pérez',
    'María Gómez',
    new Date().toISOString().split('T')[0] + 'T10:00:00Z',
  ),
]

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
    this.user = vet
  }

  async delete(id: number): Promise<void> {
    console.log(`Stub: usuario con ID ${id} eliminado`)
  }

async getNotificationsByVetId(_id: number): Promise<NotificationModel[]> {
  const fullVetName = `${this.user.name} ${this.user.surname}`
  
  return sharedMockNotifications.filter(n =>
    n.vetName === fullVetName &&
    (
      n.type === 'SHIFT_TODAY' ||
      n.type === 'SHIFT_DELETE'
    )
  )
}


  addMockNotification(notification: NotificationModel): void {
    sharedMockNotifications.push(notification)
  }
}
