import { NotificationModel } from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'

 export const mockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_REMINDER',
    'Tienes un turno hoy con Rocky',
    new Date().toISOString(),
    true,
    'Rocky',
    'Ezequiel',
    'Adrián Ibarra',
    new Date().toISOString(),
    '13:00',
    'Recordatorio de turno'
  ),
  new NotificationModel(
    2,
    'SHIFT_UPDATE',
    'El turno de Rocky fue reprogramado',
    new Date().toISOString(),
    false,
    'Rocky',
    'Ezequiel',
    'Adrián Ibarra',
    '2025-05-23',
    '13:00',
    'Modificación de turno'
  ),
  new NotificationModel(
    3,
    'SHIFT_CREATE',
    'Nuevo turno asignado para Oli',
    new Date().toISOString(),
    false,
    'Oli',
    'Ezequiel',
    'Adrián Ibarra',
    '2025-06-01',
    '10:00',
    'Nuevo turno'
  ),

  new NotificationModel(
    4,
    'SHIFT_REMINDER',
    'Tienes un turno hoy con Mileva',
    new Date().toISOString(),
    true,
    'Mileva',
    'Caroline',
    'Adrián Ibarra',
    new Date().toISOString(),
    '11:00',
    'Recordatorio de turno'
  ),
  new NotificationModel(
    5,
    'SHIFT_DELETE',
    'Tu turno con Owie fue cancelado',
    new Date().toISOString(),
    true,
    'Owie',
    'Caroline',
    'Adrián Ibarra',
    '2025-05-25',
    '14:00',
    'Cancelación de turno'
  ),

  new NotificationModel(
    6,
    'SHIFT_REMINDER',
    'Tienes un turno hoy con Nala',
    new Date().toISOString(),
    true,
    'Nala',
    'Tamara',
    'Lucas Cejas',
    new Date().toISOString(),
    '11:00',
    'Recordatorio de turno'
  ),
  new NotificationModel(
    7,
    'SHIFT_CREATE',
    'Nuevo turno creado para Cleopatra',
    new Date().toISOString(),
    false,
    'Cleopatra',
    'Tamara',
    'Lucas Cejas',
    new Date(Date.now() + 172800000).toISOString().split('T')[0],
    '16:00',
    'Nuevo turno'
  )
]

export class NotificationServiceStub implements NotificationServiceInter {
  private notifications: NotificationModel[] = mockNotifications

  async getAllNotifications(): Promise<NotificationModel[]> {
    return this.notifications
  }

  async addNotification(notification: NotificationModel): Promise<void> {
    this.notifications.push(notification)
  }

  async getNotificationsByVetName(vetName: string): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.vetName.toLowerCase() === vetName.toLowerCase()
    )
  }

  async getNotificationsByPetOwnerName(petOwnerName: string): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.petOwnerName.toLowerCase() === petOwnerName.toLowerCase()
    )
  }

  async getNotificationsByVetId(id: number): Promise<NotificationModel[]> {
    const vetName = id === 1 ? 'Adrián Ibarra' : 'Lucas Cejas'
    return this.notifications.filter(n => 
      n.vetName.toLowerCase() === vetName.toLowerCase() &&
      (n.type === 'SHIFT_REMINDER' || n.type === 'SHIFT_DELETE')
    )
  }

  async getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]> {
    const ownerName = id === 1 ? 'Ezequiel' : id === 2 ? 'Caroline' : 'Tamara'
    return this.notifications.filter(n => 
      n.petOwnerName.toLowerCase() === ownerName.toLowerCase() &&
      ['SHIFT_REMINDER', 'SHIFT_UPDATE', 'SHIFT_CREATE', 'SHIFT_DELETE'].includes(n.type)
    )
  }

  async getTodaysNotifications(): Promise<NotificationModel[]> {
    const today = new Date().toISOString().split('T')[0]
    return this.notifications.filter(n => 
      n.date === today && n.type === 'SHIFT_REMINDER'
    )
  }

  async getUpcomingVaccineNotifications(): Promise<NotificationModel[]> {
    return []
  }

  async clearAll(): Promise<void> {
    this.notifications = []
  }
}
