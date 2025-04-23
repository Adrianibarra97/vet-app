import { ProfessionalInfo } from "../../domain/ProfessionalInfo"
import { User } from "../../domain/User"

export interface UserServiceInter {
    getUserInfo(): Promise<User>
    getProfessionalInfo(): Promise<ProfessionalInfo>
    updateUserInfo(user: User): Promise<void>
    updateProfessionalInfo(info: ProfessionalInfo): Promise<void>
  
}