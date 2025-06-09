import axios from 'axios'
import {
  NotificationModel,
  NotificationResponseDTO,
} from '../../domain/Notification'
import { NotificationServiceInter } from './NotificationServiceInter'
import { URL_BE } from '../config'

export class NotificationService implements NotificationServiceInter {
 

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

}
