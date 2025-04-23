import { FilterTurn } from '../../domain/Filterturn'
import { MedicalShift } from '../../domain/MedicalShift'

export interface MedicalShiftServiceInter {
	getAll(): Promise<MedicalShift[]>;
	getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]>
	cancelMedicalShift(idMedicalShift: number): Promise<void>
	getMedicalShiftById(idMedicalShift: number):  Promise<MedicalShift>
	editExistMedicalShift(idMedicalShift: number, medicalShift:MedicalShift): Promise<void>
	createNewMedicalShift(medicalShift:MedicalShift): Promise<void>
}