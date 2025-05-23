import { NotificationModel } from '../../domain/Notification'

export interface NotificationServiceInter {
  getAllNotifications(): Promise<NotificationModel[]>
  addNotification(notification: NotificationModel): Promise<void>
  getNotificationsByVetName(vetName: string): Promise<NotificationModel[]>
  getNotificationsByPetOwnerName(
    petOwnerName: string,
  ): Promise<NotificationModel[]>
  clearAll(): Promise<void>
}
