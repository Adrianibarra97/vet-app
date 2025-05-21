export type PetFilterValuesJSON = {
	name: string,
	hasMedicalShift: boolean,
	hasPendingVaccine: boolean,
}

export class PetFilterValues {

	constructor(
		public name: string,
		public hasMedicalShift: boolean,
		public hasPendingVaccine: boolean
	) {}

	toJSON(): PetFilterValuesJSON {
		return {
			name: this.name,
			hasMedicalShift: this.hasMedicalShift,
			hasPendingVaccine: this.hasPendingVaccine
		}
	}
}