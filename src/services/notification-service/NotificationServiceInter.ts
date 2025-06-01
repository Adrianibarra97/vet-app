import { NotificationModel } from '../../domain/Notification'

export interface NotificationServiceInter {
 
  getNotificationsByVetId(id: number): Promise<NotificationModel[]>
  getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]>
  
}
