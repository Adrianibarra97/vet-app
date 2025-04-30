import { ProfessionalInfo } from '../../domain/ProfessionalInfo'
import { User } from '../../domain/User'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'

export class PetOwnerServiceStub implements PetOwnerServiceInter {
  private user = new User(
    2,
    30888777,
    'Carlos',
    'Perez',
    'carlos.perez@gmail.com',
    1144112233,
    'Calle Falsa 123',
    'cperez',
    '48901234',
    'https://www.rocroi.com/wp-content/uploads/2024/03/MicrosoftTeams-image-24.jpg'
  )

  async getAll(): Promise<User[]> {
    return [this.user]
  }

  async getOneById(): Promise<{ user: User; professional: ProfessionalInfo }> {
    return {
      user: this.user,
      professional: new ProfessionalInfo('', '', '', '', '', '') 
    }
  }

  async update(user: User): Promise<void> {
    this.user = user
    console.log('[OwnerStub] Usuario actualizado:', this.user)
  }

  async delete(id: number): Promise<void> {
    console.log(`[OwnerStub] Usuario con ID ${id} eliminado`)
  }
}
