import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { User } from "../../domain/User"

export interface PetOwnerServiceInter {
  getAll(): Promise<User[]>
  getOneById(id: number): Promise<{ user: User; professional: ProfessionalInfo }>
  update(user: User): Promise<void>
  delete(id: number): Promise<void>
}
