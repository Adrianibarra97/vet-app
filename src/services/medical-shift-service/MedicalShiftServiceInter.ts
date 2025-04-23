import { User } from '../../domain/User'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'

export interface MedicalShiftServiceInter {
  getUserInfo(): Promise<User>
  getProfessionalInfo(): Promise<ProfessionalInfo>
  updateUserInfo(user: User): Promise<void>
  updateProfessionalInfo(info: ProfessionalInfo): Promise<void>
}
