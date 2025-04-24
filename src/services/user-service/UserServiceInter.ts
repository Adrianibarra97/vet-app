import { ProfessionalInfo } from "../../domain/ProfessionalInfo";
import { User } from "../../domain/User"

export interface UserServiceInter {
    getAll(): Promise<User[]>
    getOneById(id: number): Promise<{ user: User; professional: ProfessionalInfo }>
    update(user: User, professional: ProfessionalInfo): Promise<void>
    delete(id: number): Promise<void>
}