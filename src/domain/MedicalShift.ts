export type MedicalShiftJSON = {
	id: number,
	vetName: string,
	petName: string,
	date: string
}

export class MedicalShift {
    
	constructor(
		public id: number,
		public vetName: string,
		public petName: string,
		public date: Date
	) {}

	toJSON(): MedicalShiftJSON {
		return {
			id: this.id,
			vetName: this.vetName,
			petName: this.petName,
			date: this.date.toString()
		}
	}
}