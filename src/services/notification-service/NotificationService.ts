import axios from 'axios'
import {
  NotificationModel,
  NotificationResponseDTO,
} from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'
import { URL_BE } from '../config'

export class NotificationService implements NotificationServiceInter {
  async getAllNotifications(): Promise<NotificationModel[]> {
    return []
  }

  async addNotification(notification: NotificationModel): Promise<void> {
    console.log('Adding notification not implemented in backend:', notification)
  }

  async getNotificationsByVetName(_: string): Promise<NotificationModel[]> {
    return []
  }

  async getNotificationsByPetOwnerName(
    _: string,
  ): Promise<NotificationModel[]> {
    return []
  }

  async getNotificationsByVetId(id: number): Promise<NotificationModel[]> {
    console.log('Fetching notifications for vet ID:', id)
    const response = await axios.get<NotificationResponseDTO[]>(
      `${URL_BE}/vet/get-all-notifications`,
      {
        params: { idVet: id },
      },
    )
    console.log('Vet ID notifications response:', response.data)
    return response.data.map(NotificationModel.fromJSON)
  }

  async getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]> {
    console.log('Fetching notifications for pet owner ID:', id)

    const response = await axios.get<NotificationResponseDTO[]>(
      `${URL_BE}/pet-owner/get-all-notifications`,
      {
        params: { idPetOwner: id },
      },
    )

    console.log('Response completa:', response)
    console.log('Data que llega:', response.data)

    return response.data.map(NotificationModel.fromJSON)
  }

  async getTodaysNotifications(): Promise<NotificationModel[]> {
    return []
  }

  async getUpcomingVaccineNotifications(): Promise<NotificationModel[]> {
    return []
  }

  async clearAll(): Promise<void> {
    console.log('Clear all notifications not implemented in backend')
  }
}
