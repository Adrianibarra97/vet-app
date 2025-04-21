import { FilterTurn } from "../../domain/Filterturn";
import { MedicalShift } from "../../domain/MedicalShift";

export interface MedicalShiftServiceInter {
	
    getAll(): Promise<MedicalShift[]>;
    getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]>;
    cancelMedicalShift(idMedicalShift: number): void;
}