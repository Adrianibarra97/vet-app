import { NotificationModel } from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'

export const mockNotifications: NotificationModel[] = [
  new NotificationModel(
    1,
    'SHIFT_TODAY',
    'Tenés un turno hoy ',
    '2025-06-10T08:00:00.000Z',
    true,
    'Nala',
    'Tamara',
    'Lucas Cejas',
    '2025-06-10',
    '10:00',
    'Turno de hoy'
  ),
  new NotificationModel(
    2,
    'SHIFT_REMINDER',
    'Recordatorio de turno para Owie',
    '2025-06-10T09:00:00.000Z',
    true,
    'Owie',
    'Tamara',
    'Lucas Cejas',
    '2025-06-10',
    '11:00',
    'Recordatorio de turno'
  ),
  new NotificationModel(
    11,
    'SHIFT_UPDATE',
    'Se actualizó el turno de Pipi',
    '2025-06-10T10:00:00.000Z',
    false,
    'Pipi',
    'Tamara',
    'Lucas Cejas',
    '2025-06-11',
    '12:00',
    'Modificación de turno'
  ),
  new NotificationModel(
    12,
    'SHIFT_DELETE',
    'Turno cancelado por el dueño',
    '2025-06-10T11:00:00.000Z',
    true,
    'Morena',
    'Tamara',
    'Lucas Cejas',
    '2025-06-12',
    '13:00',
    'Cancelación de turno'
  ),
  new NotificationModel(
    13,
    'SHIFT_CREATE',
    'Nuevo turno creado para Freya',
    '2025-06-10T12:00:00.000Z',
    false,
    'Freya',
    'Tamara',
    'Lucas Cejas',
    '2025-06-13',
    '14:00',
    'Nuevo turno'
  ),
  new NotificationModel(
    14,
    'appointment',
    'Turno agendado para Napoleón',
    '2025-06-10T13:00:00.000Z',
    false,
    'Napoleón',
    'Tamara',
    'Lucas Cejas',
    '2025-06-14',
    '15:00',
    'Agendado por sistema'
  ),
  new NotificationModel(
    15,
    'vaccine',
    'La vacuna de Burpee vence esta semana',
    '2025-06-10T14:00:00.000Z',
    false,
    'Burpee',
    'Tamara',
    'Lucas Cejas',
    '2025-06-15',
    '10:00',
    'Vacuna próxima a vencer'
  ),
  new NotificationModel(
    16,
    'system',
    'Tenés turnos sin confirmar',
    '2025-06-10T15:00:00.000Z',
    false,
    'N/A',
    'Tamara',
    'Sistema',
    '2025-06-10',
    '',
    'Recordatorio del sistema'
  )
]

export class NotificationServiceStub implements NotificationServiceInter {
  private notifications: NotificationModel[] = mockNotifications

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

  async update(notification: NotificationModel): Promise<void> {
    console.log(notification)
  }

  async getNotificationsCountByUser(id: number, typeOfUser: string | undefined): Promise<number> {
    console.log(id, typeOfUser)
    return 0
  }
}
