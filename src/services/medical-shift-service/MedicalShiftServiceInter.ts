import { MedicalShift } from "../../domain/MedicalShift";

export interface MedicalShiftServiceInter {
	
    getAll(): Promise<MedicalShift[]>;
}