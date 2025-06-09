import { NotificationModel } from '../../domain/Notification'

export interface NotificationServiceInter {
 
  getNotificationsByVetId(id: number): Promise<NotificationModel[]>
  getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]>
  getNotificationsCountByUser(id: number, typeOfUser: string | undefined): Promise<number>
  update(notification: NotificationModel): Promise<void>
}