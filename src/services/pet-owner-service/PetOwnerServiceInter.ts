import { NotificationModel } from '../../domain/Notification'
import { PetOwner } from '../../domain/PetOwner'

export interface PetOwnerServiceInter {
  getAll(): Promise<PetOwner[]>
  getOneById(id: number): Promise<PetOwner>
  create(petOwner: PetOwner): Promise<void>
  update(user: PetOwner): Promise<void>
  delete(id: number): Promise<void>
  getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]>
}