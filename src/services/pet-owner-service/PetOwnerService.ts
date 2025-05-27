import axios from "axios"
import { PetOwner } from "../../domain/PetOwner"
import { URL_BE } from "../config"
import { PetOwnerServiceInter } from "./PetOwnerServiceInter"
import { NotificationResponseDTO, NotificationModel } from "../../domain/Notification"

export class PetOwnerService implements PetOwnerServiceInter {
  async getAll(): Promise<PetOwner[]> {
    const res = await axios.get(`${URL_BE}/pet-owner/get-all`)
    return res.data.map((po: any) => PetOwner.fromJSON(po))
  }

  async getOneById(id: number): Promise<PetOwner> {
    const res = await axios.get(`${URL_BE}/pet-owner/get-one-by-id`, {
      params: { idPetOwner: id }
    })
    return PetOwner.fromJSON(res.data)
  }

  async create(petOwner: PetOwner): Promise<void> {
    const payload = petOwner.toJSON()
    await axios.post(`${URL_BE}/pet-owner/create`, payload)
  }

  async update(petOwner: PetOwner): Promise<void> {
    const payload = petOwner.toJSON()
    console.log('Payload limpio:', payload);

    await axios.put(`${URL_BE}/pet-owner/update`, payload)
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${URL_BE}/pet-owner/delete`, {
      params: { idPetOwner: id }
    })
  }
async getNotificationsByPetOwnerId(id: number): Promise<NotificationModel[]> {
  const res = await axios.get<NotificationResponseDTO[]>(`${URL_BE}/pet-owner/get-all-notifications`, {
    params: { idPetOwner: id }
  })
  return res.data.map(NotificationModel.fromJSON)
}

}
