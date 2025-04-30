// src/services/pet-owner-service/PetOwnerService.ts
import axios from "axios"
import { UserServiceInter } from "../vet-service/VetServiceInter"
import { User } from "../../domain/User"
import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { URL_BE } from "../config"

export class PetOwnerService implements UserServiceInter {
  async getAll(): Promise<User[]> {
    const res = await axios.get(`${URL_BE}/pet-owner/get-all`)
    return res.data.map((po: any) => new User(
      po.id, po.dni, po.name, po.surname,
      po.email, po.telephone, po.address,
      po.username, po.landline,
      po.photoUrl
    ))
  }

  async getOneById(id: number): Promise<{ user: User; professional: ProfessionalInfo }> {
    const res = await axios.get(`${URL_BE}/pet-owner/get-one-by-id`, {
      params: { idPet: id }
    })
    const po = res.data
    return {
      user: new User(
        po.id, po.dni, po.name, po.surname,
        po.email, po.telephone, po.address,
        po.username, po.landline,
        po.photoUrl
      ),
      professional: new ProfessionalInfo("", "", "", "", "", "") 
    }
  }

  async update(user: User): Promise<void> {
	const payload = {
	  ...user.toJSON()
	}
	await axios.put(`${URL_BE}/pet-owner/update`, payload)
  }
  

  async delete(id: number): Promise<void> {
    await axios.delete(`${URL_BE}/pet-owner/delete`, {
      params: { idPetOwner: id }
    })
  }
}
