import { NotificationModel } from '../../domain/Notification'
import { PetOwner } from '../../domain/PetOwner'

export interface PetOwnerServiceInter {
  getAll(): Promise<PetOwner[]>
  getOneById(id: number): Promise<PetOwner>
  update(user: PetOwner): Promise<void>
  delete(id: number): Promise<void>
  getNotificationsByUserId(id: number): Promise<NotificationModel[]> 
}
