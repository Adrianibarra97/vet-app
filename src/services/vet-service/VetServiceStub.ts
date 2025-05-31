import { NotificationModel } from '../../domain/Notification'
import { Vet } from '../../domain/Vet'
import { VetServiceInter } from './VetServiceInter'
import { USER_ID_TOKEN } from '../config'
import { mockNotifications } from '../notification-service/NotificationServiceStub'

import { NotificationServiceManager } from '../notification-service/NotificationServiceManager'



export class VetServiceStub implements VetServiceInter {
  private vets: Vet[] = [
    new Vet(
      6,
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
      6,
      6,
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
      5,
      5,
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

  async create(vet: Vet): Promise<void> {
    this.vets.push(vet)
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
  const fullName = `${currentVet.name} ${currentVet.surname}`.toLowerCase()

  const dynamic =
    await NotificationServiceManager.getInstance().getNotificationService().getAllNotifications()

  const staticList = mockNotifications.filter(
    (n) =>
      n.vetName?.toLowerCase() === fullName &&
      ['SHIFT_DELETE', 'SHIFT_UPDATE', 'SHIFT_TODAY'].includes(n.type)
  )

  const filtered = dynamic.filter(
    (n) =>
      n.vetName?.toLowerCase() === fullName &&
      ['SHIFT_DELETE', 'SHIFT_UPDATE', 'SHIFT_TODAY'].includes(n.type)
  )

  return [...staticList, ...filtered]
}



}