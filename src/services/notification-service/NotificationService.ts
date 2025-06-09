import axios from 'axios'
import {
  NotificationModel,
  NotificationResponseDTO,
} from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'
import { PETOWNER_TYPE, URL_BE, VET_TYPE } from '../config'

export class NotificationService implements NotificationServiceInter {
 
  async getNotificationsByVetId(id: number): Promise<NotificationModel[]> {
    const response = await axios.get<NotificationResponseDTO[]>(
      `${URL_BE}/vet/get-all-notifications`,
      {
        params: { idVet: id },
      },
    )
    return response.data.map(NotificationModel.fromJSON)
  }

  async getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]> {
    const response = await axios.get<NotificationResponseDTO[]>(
      `${URL_BE}/pet-owner/get-all-notifications`,
      {
        params: { idPetOwner: id },
      },
    )
    return response.data.map(NotificationModel.fromJSON)
  }

  async update(notification: NotificationModel): Promise<void> {
    await axios.put(`${URL_BE}/notification/update`, notification.toJSON())
  }

  async getNotificationsCountByUser(id: number, typeOfUser: string | undefined): Promise<number> {
    let response: NotificationModel[] = []
    if(typeOfUser === PETOWNER_TYPE && id > -1) {
      response = (await this.getNotificationsByPetOwnerId(id))
    }
    if(typeOfUser === VET_TYPE && id > -1) {
      response = await this.getNotificationsByVetId(id)
    }
    return response.filter(noti => { return !noti.wasRead }).length
  }
}