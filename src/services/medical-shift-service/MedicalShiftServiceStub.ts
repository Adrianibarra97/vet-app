import { MedicalShiftServiceInter } from './MedicalShiftServiceInter'
import { User } from '../../domain/User'
import { ProfessionalInfo } from '../../domain/ProfessionalInfo'

export class MedicalShiftServiceStub implements MedicalShiftServiceInter {
  private user = new User(
    1,
    30456789,
    'María',
    'Gómez',
    'maria.gomez@gmail.com',
    1144556677,
    'Av. Balbin 456',
    'mgomez',
    '01143001234'
  )

  private professionalInfo = new ProfessionalInfo(
    '12345',
    '1133224455',
    'Cardiología',
    'Hospital Central 1000',
    'maria.prof@hospital.com',
    'Lunes a Viernes, 08:00 - 16:00'
  )

  async getUserInfo(): Promise<User> {
    return this.user
  }

  async getProfessionalInfo(): Promise<ProfessionalInfo> {
    return this.professionalInfo
  }

  async updateUserInfo(user: User): Promise<void> {
    console.log('User updated:', user)
    this.user = user
  }

  async updateProfessionalInfo(info: ProfessionalInfo): Promise<void> {
    console.log('Professional Info updated:', info)
    this.professionalInfo = info
  }
}
