import { Pet, PetJSON } from "./Pet"

export type MedicalShiftJSON = {
	id: number,
	nameVet: string,
	namePet: PetJSON,
	date: string,
	hour: string
}

export class MedicalShift {
    
	constructor(
		public id: number = -1,
		public nameVet: string = '',
		public namePet: Pet = new Pet(),
		public date: string = '',
		public hour: string = ''
	) {}

	static fromJSON(medicalShiftJSON: MedicalShiftJSON): MedicalShift {
		return new MedicalShift(
			medicalShiftJSON.id,
			medicalShiftJSON.nameVet,
			Pet.fromJSON(medicalShiftJSON.namePet),
			medicalShiftJSON.date,
			medicalShiftJSON.hour
		)
	}

	toJSON(): MedicalShiftJSON {
		return {
			id: this.id,
			nameVet: this.nameVet,
			namePet: this.namePet,
			date: this.date,
			hour: this.hour
		}
	}
}