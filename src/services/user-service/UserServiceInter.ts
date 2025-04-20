import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShift } from "../../domain/MedicalShift"

export interface UserServiceInter {
    getAll(): Promise<MedicalShift[]>
    getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]>
}