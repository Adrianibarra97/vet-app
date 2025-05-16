import { NotificationModel } from '../../domain/Notification'
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
    'Avellaneda',
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
 async getNotificationsByUserId(id: number): Promise<NotificationModel[]> {
  console.log(`Simulando fetch de notificaciones para ID ${id}`)

  return [
    new NotificationModel(
      'appointment',
      'Tu turno del 20/05 fue cancelado',
      new Date().toISOString(),
      true
    ),
    new NotificationModel(
      'vaccine',
      'Vacuna antirrábica vence el 25/05',
      new Date().toISOString(),
      true
    )
  ]
}

}
