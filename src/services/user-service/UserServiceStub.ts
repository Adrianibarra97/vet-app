import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import { User } from '../../domain/User'
import { UserServiceInter } from './UserServiceInter'

export class UserServiceStub implements UserServiceInter {
  private user = new User(
    1,
    30456789,
    'María',
    'Gómez',
    'maria.gomez@gmail.com',
    1144556677,
    'Av. Balbin 456',
    'mgomez',
    '01143001234',
    'https://thumbs.dreamstime.com/z/mujer-veterinaria-con-el-perro-de-aguas-39766136.jpg',
  )

  private professionalInfo = new ProfessionalInfo(
    '12345',
    '1133224455',
    'Cardiología',
    'Hospital Central 1000',
    'maria.prof@hospital.com',
    'Lunes a Viernes, 08:00 - 16:00',
  )

  async getAll(): Promise<User[]> {
    return [this.user]
  }

  async getOneById(): Promise<{ user: User; professional: ProfessionalInfo }> {
    return {
      user: this.user,
      professional: this.professionalInfo,
    }
  }

  async update(user: User, professional: ProfessionalInfo): Promise<void> {
    console.log('Stub: actualizando datos...')
    this.user = user
    this.professionalInfo = professional
    console.log('Nuevo estado:', this.user, this.professionalInfo)
  }

  async delete(id: number): Promise<void> {
    console.log(`Stub: usuario con ID ${id} eliminado`)
  }
}
