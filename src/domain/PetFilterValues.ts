export type PetFilterValuesJSON = {
	name: string,
	withMedicalShift: boolean,
	pendingVaccine: boolean,
}

export class PetFilterValues {

	constructor(
		public name: string,
		public withMedicalShift: boolean,
		public pendingVaccine: boolean
	) {}

	toJSON(): PetFilterValuesJSON {
		return {
			name: this.name,
			withMedicalShift: this.withMedicalShift,
			pendingVaccine: this.pendingVaccine
		}
	}
}