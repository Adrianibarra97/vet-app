import { PetMedicalShiftDTO, PetMedicalShiftJSON } from "./Pet"

export type MedicalShiftJSON = {
	id: number,
	nameVet: string,
	petMedicalShift:PetMedicalShiftJSON,
	date: string,
	hour: string
}

export class MedicalShift {
    
	constructor(
		public id: number = -1,
		public nameVet: string = '',
		public petMedicalShift: PetMedicalShiftDTO = new PetMedicalShiftDTO(),
		public date: string = '',
		public hour: string = ''
	) {}

	static fromJSON(medicalShiftJSON: MedicalShiftJSON): MedicalShift {
		return new MedicalShift(
			medicalShiftJSON.id,
			medicalShiftJSON.nameVet,
			PetMedicalShiftDTO.fromJSON(medicalShiftJSON.petMedicalShift),
			medicalShiftJSON.date,
			medicalShiftJSON.hour
		)
	}

	toJSON(): MedicalShiftJSON {
		return {
			id: this.id,
			nameVet: this.nameVet,
			petMedicalShift: this.petMedicalShift.toJson(),
			date: this.date,
			hour: this.hour
		}
	}
}