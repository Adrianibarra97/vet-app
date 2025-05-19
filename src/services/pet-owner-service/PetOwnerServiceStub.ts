import { NotificationModel } from '../../domain/Notification'
import { PetOwner } from '../../domain/PetOwner'
import { sharedMockNotifications } from '../vet-service/VetServiceStub'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'

const petOwnerMockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_DELETE',
    'Tu turno fue cancelado por la veterinaria',
    new Date().toISOString(),
    true,
    'Cleopatra',
    'Tamara Mecozzi',
    'María Gómez',
    '2024-05-20T10:00:00Z',
  ),
  new NotificationModel(
    2,
    'vaccine',
    'La vacuna de rabia de Napoleon está próxima a vencer',
    new Date().toISOString(),
    true,
    'Napoleon',
    'Tamara Mecozzi',
  ),
  new NotificationModel(
    3,
    'appointment',
    'Nuevo turno asignado para Freya',
    new Date().toISOString(),
    false,
    'Freya',
    'Tamara Mecozzi',
    'María Gómez',
    '2024-05-25T09:30:00Z',
  ),
  new NotificationModel(
    4,
    'SHIFT_UPDATE',
    'Tu turno fue modificado por la veterinaria',
    new Date().toISOString(),
    false,
    'Nala',
    'Tamara Mecozzi',
    'María Gómez',
    '2024-05-28T11:30:00Z',
  ),
  new NotificationModel(
    5,
    'SHIFT_TODAY',
    'Recordatorio: tenés un turno hoy con Cleopatra',
    new Date().toISOString(),
    true,
    'Cleopatra',
    'Tamara Mecozzi',
    'María Gómez',
    '2025-05-19T09:00:00Z',
  ),
]

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
    this.user = petOwner
  }

  async delete(id: number): Promise<void> {
    console.log(`Stub: pet owner con ID ${id} eliminado`)
  }

  async getNotificationsByPetOwnerId(_id: number): Promise<NotificationModel[]> {
    const vetNotifications = sharedMockNotifications.filter((n) =>
      n.petOwnerName?.includes(this.user.name)
    )

    return [...petOwnerMockNotifications, ...vetNotifications]
  }
}
