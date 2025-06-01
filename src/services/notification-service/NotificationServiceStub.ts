import { NotificationModel } from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'

export const mockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_TODAY',
    'Tenés un turno hoy ',
    new Date().toISOString(),
    true,
    'Nala',
    'Tamara',
    'Lucas Cejas',
    new Date().toISOString().split('T')[0],
    '10:00',
    'Turno de hoy'
  ),
  new NotificationModel(
    2,
    'SHIFT_REMINDER',
    'Recordatorio de turno para Owie',
    new Date().toISOString(),
    true,
    'Owie',
    'Tamara',
    'Lucas Cejas',
    new Date().toISOString().split('T')[0],
    '11:00',
    'Recordatorio de turno'
  ),
  new NotificationModel(
    11,
    'SHIFT_UPDATE',
    'Se actualizó el turno de Pipi',
    new Date().toISOString(),
    false,
    'Pipi',
    'Tamara',
    'Lucas Cejas',
    '2025-06-06',
    '12:00',
    'Modificación de turno'
  ),
  new NotificationModel(
    12,
    'SHIFT_DELETE',
    'Turno cancelado por el dueño',
    new Date().toISOString(),
    true,
    'Morena',
    'Tamara',
    'Lucas Cejas',
    '2025-06-07',
    '13:00',
    'Cancelación de turno'
  ),
  new NotificationModel(
    13,
    'SHIFT_CREATE',
    'Nuevo turno creado para Freya',
    new Date().toISOString(),
    false,
    'Freya',
    'Tamara',
    'Lucas Cejas',
    '2025-06-08',
    '14:00',
    'Nuevo turno'
  ),
  new NotificationModel(
    14,
    'appointment',
    'Turno agendado para Napoleón',
    new Date().toISOString(),
    false,
    'Napoleón',
    'Tamara',
    'Lucas Cejas',
    '2025-06-09',
    '15:00',
    'Agendado por sistema'
  ),
  new NotificationModel(
    15,
    'vaccine',
    'La vacuna de Burpee vence esta semana',
    new Date().toISOString(),
    false,
    'Burpee',
    'Tamara',
    'Lucas Cejas',
    '2025-06-10',
    '10:00',
    'Vacuna próxima a vencer'
  ),
  new NotificationModel(
    16,
    'system',
    'Tenés turnos sin confirmar',
    new Date().toISOString(),
    false,
    'N/A',
    'Tamara',
    'Sistema',
    new Date().toISOString().split('T')[0],
    '',
    'Recordatorio del sistema'
  )
];

export class NotificationServiceStub implements NotificationServiceInter {
  private notifications: NotificationModel[] = mockNotifications

  async getAllNotifications(): Promise<NotificationModel[]> {
    return this.notifications
  }

  async addNotification(notification: NotificationModel): Promise<void> {
    this.notifications.push(notification)
  }

  async getNotificationsByVetName(
    vetName: string,
  ): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.vetName.toLowerCase() === vetName.toLowerCase(),
    )
  }

  async getNotificationsByPetOwnerName(
    petOwnerName: string,
  ): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.petOwnerName.toLowerCase() === petOwnerName.toLowerCase(),
    )
  }

  async getNotificationsByVetId(id: number): Promise<NotificationModel[]> {
    const vetName = id === 1 ? 'Adrián Ibarra' : 'Lucas Cejas'
    return this.notifications.filter(
      (n) =>
        n.vetName.toLowerCase() === vetName.toLowerCase() &&
        (n.type === 'SHIFT_REMINDER' || n.type === 'SHIFT_DELETE'),
    )
  }

  async getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]> {
    const ownerName = id === 1 ? 'Ezequiel' : id === 2 ? 'Caroline' : 'Tamara'
    return this.notifications.filter(
      (n) =>
        n.petOwnerName.toLowerCase() === ownerName.toLowerCase() &&
        [
          'SHIFT_REMINDER',
          'SHIFT_UPDATE',
          'SHIFT_CREATE',
          'SHIFT_DELETE',
        ].includes(n.type),
    )
  }

  async getTodaysNotifications(): Promise<NotificationModel[]> {
    const today = new Date().toISOString().split('T')[0]
    return this.notifications.filter(
      (n) => n.date === today && n.type === 'SHIFT_REMINDER',
    )
  }

  async getUpcomingVaccineNotifications(): Promise<NotificationModel[]> {
    return []
  }

  async clearAll(): Promise<void> {
    this.notifications = []
  }
}
