import axios from "axios"
import { Vet } from "../../domain/Vet"
import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { URL_BE } from "../config"
import { UserServiceInter } from "../user-service/UserServiceInter"

export class VetService implements UserServiceInter {
  async getAll(): Promise<Vet[]> {
    const res = await axios.get(`${URL_BE}/vet/get-all`)
    return res.data.map((v: any) => new Vet(
      v.id, v.dni, v.name, v.surname,
      v.email, v.telephone, v.professionalAdress,
      v.username, v.professionalTelephone,
      v.photoUrl
    ))
  }

  async getOneById(id: number): Promise<{ user: Vet; professional: ProfessionalInfo }> {
    const res = await axios.get(`${URL_BE}/vet/get-one-by-id`, { params: { idVet: id } })
    const v = res.data
    return {
      user: new Vet(
        v.id, v.dni, v.name, v.surname,
        v.email, v.telephone, v.professionalAdress,
        v.username, v.professionalTelephone,
        v.photoUrl
      ),
      professional: new ProfessionalInfo(
        v.licence, v.professionalTelephone, v.speciality,
        v.professionalAdress, v.professionalEmail, v.businessHours
      )
    }
  }

  async update(user: Vet, professional: ProfessionalInfo): Promise<void> {
    const payload = {
      ...user.toJSON(),
      ...professional.toJSON()
    }
    await axios.put(`${URL_BE}/vet/update-vet`, payload)
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${URL_BE}/vet/delete-vet`, { params: { id: id } })
  }
}