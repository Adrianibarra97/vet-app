import axios from 'axios'
import { Vet } from '../../domain/Vet'
import { URL_BE } from '../config'
import { VetServiceInter } from './VetServiceInter'
import {
  NotificationResponseDTO,
  NotificationModel,
} from '../../domain/Notification'

export class VetService implements VetServiceInter {
  async getAll(): Promise<Vet[]> {
    const res = await axios.get(`${URL_BE}/vet/get-all`)
    return res.data.map((v: any) => Vet.fromJSON(v))
  }

  async getOneById(id: number): Promise<Vet> {
    const res = await axios.get(`${URL_BE}/vet/get-one-by-id`, {
      params: { idVet: id },
    })
    return Vet.fromJSON(res.data)
  }

  async update(vet: Vet): Promise<void> {
    const payload = vet.toJSON()
    await axios.put(`${URL_BE}/vet/update`, payload)
  }
  async delete(id: number): Promise<void> {
    await axios.delete(`${URL_BE}/vet/delete-vet`, {
      params: { id },
    })
  }

  async getNotificationsByVetId(id: number): Promise<NotificationModel[]> {
    const res = await axios.get<NotificationResponseDTO[]>(
      `${URL_BE}/vet/get-all-notifications`,
      {
        params: { idVet: id },
      },
    )
    return res.data.map(NotificationModel.fromJSON)
  }
}
