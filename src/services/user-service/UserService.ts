import axios from "axios"
import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { User  } from "../../domain/User"
import {  UserFull } from "../../domain/UserFull"
import { URL_BE } from "../config"
import { UserServiceInter } from "./UserServiceInter"

export class UserService implements UserServiceInter {
	async getAll(): Promise<User[]> {
		const res = await axios.get<UserFull[]>(`${URL_BE}/user/get-all`)
		return res.data.map(u =>
		  new User(
			u.id, u.dni, u.name, u.surname,
			u.email, u.telephone, u.adress,
			u.username, u.landline, u.photoUrl
		  )
		)
	  }
	
	  async getOneById(id: number): Promise<{ user: User; professional: ProfessionalInfo }> {
		const res = await axios.get<UserFull>(`${URL_BE}/user/get-one-by-id/${id}`)
		const u = res.data
		return {
		  user: new User(
			u.id, u.dni, u.name, u.surname,
			u.email, u.telephone, u.adress,
			u.username, u.landline
		  ),
		  professional: new ProfessionalInfo(
			u.license, u.workPhone, u.specialty,
			u.workAdress, u.professionalEmail, u.attentionSchedule
		  )
		}
	  }
	
	  async update(user: User, professional: ProfessionalInfo): Promise<void> {
		const payload = {
		  ...user.toJSON(),
		  ...professional.toJSON()
		}
		await axios.put(`${URL_BE}/user/update`, payload)
	  }
	
	  async delete(id: number): Promise<void> {
		await axios.delete(`${URL_BE}/user/delete/${id}`)
	  }
	}