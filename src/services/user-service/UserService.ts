import axios from "axios"
import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { User, UserJSON } from "../../domain/User"
import { URL_BE } from "../config"
import { UserServiceInter } from "./UserServiceInter"

export class UserService implements UserServiceInter {
  
	async getUserInfo(): Promise<User> {
		const res = await axios.get<UserJSON>(`${URL_BE}/user/profile`)
		const user = res.data
		return new User(
		  user.id,
		  user.dni,
		  user.name,
		  user.surname,
		  user.email,
		  user.telephone,
		  user.adress,
		  user.username,
		  user.landline
		)
	  }
	
	  async getProfessionalInfo(): Promise<ProfessionalInfo> {
		const res = await axios.get(`${URL_BE}/professional/info`)
		return new ProfessionalInfo(
		  res.data.license,
		  res.data.workPhone,
		  res.data.specialty,
		  res.data.workAdress,
		  res.data.professionalEmail,
		  res.data.attentionSchedule
		)
	  }
	
	  async getAll(): Promise<User[]> {
		const response = await axios.get(`${URL_BE}/get-all`)
		return response.data
	  }
	
	  async getOneById(id: number): Promise<User> {
		const response = await axios.get(`${URL_BE}/get-one-by-id/${id}`)
		return response.data
	  }
	
	  async update(user: User): Promise<User> {
		const response = await axios.put(`${URL_BE}/update`, user)
		return response.data
	  }
	
	  async delete(id: number): Promise<void> {
		await axios.delete(`${URL_BE}/delete/${id}`)
	  }}