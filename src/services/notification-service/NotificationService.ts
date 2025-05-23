import axios from 'axios'
import { NotificationModel, NotificationResponseDTO } from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'
import { URL_BE } from '../config'

export class NotificationService implements NotificationServiceInter {
    
  async getAllNotifications(): Promise<NotificationModel[]> {
    const response = await axios.get<NotificationResponseDTO[]>(`${URL_BE}/notification/get-all`)
    return response.data.map(NotificationModel.fromJSON)
  }
  async addNotification(notification: NotificationModel): Promise<void> {
    await axios.post(`${URL_BE}/notification`, notification.toJSON())
  }

  async getNotificationsByVetName(vetName: string): Promise<NotificationModel[]> {
    const response = await axios.get(`${URL_BE}/notification/by-vet`, {
      params: { vetName }
    })
    return response.data.map(NotificationModel.fromJSON)
  }

  async getNotificationsByPetOwnerName(petOwnerName: string): Promise<NotificationModel[]> {
    const response = await axios.get(`${URL_BE}/notification/by-owner`, {
      params: { petOwnerName }
    })
    return response.data.map(NotificationModel.fromJSON)
  }

  async clearAll(): Promise<void> {
    await axios.delete(`${URL_BE}/notification/clear-all`)
  }
}
