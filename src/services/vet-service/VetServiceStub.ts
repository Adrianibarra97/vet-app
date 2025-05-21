import { NotificationModel } from '../../domain/Notification'
import { Vet } from '../../domain/Vet'
import { VetServiceInter } from './VetServiceInter'
import { USER_ID_TOKEN } from '../config'

export const sharedMockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_DELETE',
    'Turno cancelado por el dueño',
    new Date().toISOString(),
    true,
    'Rocky',
    'Ezequiel Iozzia',
    'Lucas Cejas',
    '2024-05-21T15:00:00Z',
  ),
  new NotificationModel(
    3,
    'SHIFT_DELETE',
    'Turno cancelado por el dueño',
    new Date().toISOString(),
    true,
    'Mileva',
    'Caroline Coronel',
    'Adrián Ibarra',
    '2024-05-21T15:00:00Z',
  ),
]

export class VetServiceStub implements VetServiceInter {
  private vets: Vet[] = [
    new Vet(
      4,
      'LuckC',
      '123',
      'Lucas',
      'Cejas',
      12345678,
      'lucas.cejas@gmail.com',
      '1122334455',
      'src/assets/vet.jfif',
      'Av. Mitre 123',
      '1870',
      'Avellaneda',
      'Buenos Aires',
      'Argentina',
      1,
      'MP101',
      'Clínico general',
      'Lunes a viernes 9 a 17',
      'lucas.vet@gmail.com',
      '1155667788',
      'Centro Vet Avellaneda',
      'Avellaneda',
      '1870',
    ),
    new Vet(
      5,
      'Adrian',
      '123',
      'Adrián',
      'Ibarra',
      87654321,
      'adrian.ibarra@gmail.com',
      '1199887766',
      'src/assets/adri.jfif',
      'Las Heras 555',
      '1642',
      'San Isidro',
      'Buenos Aires',
      'Argentina',
      2,
      'MP102',
      'Traumatología',
      'Lunes a viernes 10 a 18',
      'adrian.vet@gmail.com',
      '1144778899',
      'San Isidro Vet',
      'San Isidro',
      '1642',
    ),
  ]

  private getCurrentVet(): Vet {
    const id = parseInt(localStorage.getItem(USER_ID_TOKEN) || '-1')
    const vet = this.vets.find((v) => v.id === id)
    if (!vet) throw new Error('Vet not found in stub')
    return vet
  }

  async getAll(): Promise<Vet[]> {
    return this.vets
  }

  async getOneById(): Promise<Vet> {
    return this.getCurrentVet()
  }

  async update(vet: Vet): Promise<void> {
    const index = this.vets.findIndex((v) => v.id === vet.id)
    if (index !== -1) this.vets[index] = vet
  }

  async delete(id: number): Promise<void> {
    this.vets = this.vets.filter((v) => v.id !== id)
  }

  async getNotificationsByVetId(): Promise<NotificationModel[]> {
    const currentVet = this.getCurrentVet()
    const fullName = `${currentVet.name} ${currentVet.surname}`

    return sharedMockNotifications.filter(
      (n) =>
        n.vetName === fullName &&
        ['SHIFT_TODAY', 'SHIFT_DELETE', 'SHIFT_UPDATE'].includes(n.type),
    )
  }

  addMockNotification(notification: NotificationModel): void {
    sharedMockNotifications.push(notification)
  }
}
