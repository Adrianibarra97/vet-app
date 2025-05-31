import { NotificationModel } from '../../domain/Notification'

export interface NotificationServiceInter {
  getAllNotifications(): Promise<NotificationModel[]>
  addNotification(notification: NotificationModel): Promise<void>
  getNotificationsByVetName(vetName: string): Promise<NotificationModel[]>
  getNotificationsByPetOwnerName(
    petOwnerName: string,
  ): Promise<NotificationModel[]>
  getNotificationsByVetId(id: number): Promise<NotificationModel[]>
  getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]>
  getTodaysNotifications(): Promise<NotificationModel[]>
  getUpcomingVaccineNotifications(): Promise<NotificationModel[]>
  clearAll(): Promise<void>
}
