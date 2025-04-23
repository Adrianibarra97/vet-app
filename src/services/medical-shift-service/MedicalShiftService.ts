import { MedicalShiftServiceInter } from './MedicalShiftServiceInter'
import { User, UserJSON } from '../../domain/User'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import axios from 'axios'
import { URL_BE } from '../config'

export class MedicalShiftService implements MedicalShiftServiceInter {
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

  async updateUserInfo(user: User): Promise<void> {
    await axios.put(`${URL_BE}/user/update`, user.toJSON())
  }

  async updateProfessionalInfo(info: ProfessionalInfo): Promise<void> {
    await axios.put(`${URL_BE}/professional/update`, info.toJSON())
  }
}
