import { NotificationModel } from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'

export class NotificationServiceStub implements NotificationServiceInter {
  private notifications: NotificationModel[] = []

  async getAllNotifications(): Promise<NotificationModel[]> {
  return this.notifications
}

async addNotification(notification: NotificationModel): Promise<void> {
  console.log('[STUB] Notificación agregada:', notification)
  this.notifications.push(notification)
}


  async getNotificationsByVetName(
    vetName: string,
  ): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.vetName?.toLowerCase() === vetName.toLowerCase(),
    )
  }

  async getNotificationsByPetOwnerName(
    petOwnerName: string,
  ): Promise<NotificationModel[]> {
    return this.notifications.filter(
      (n) => n.petOwnerName?.toLowerCase() === petOwnerName.toLowerCase(),
    )
  }

  async clearAll(): Promise<void> {
    this.notifications = []
  }
}
