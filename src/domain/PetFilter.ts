export class PetFilter {

	constructor(
		public name: string,
		public withMedicalShift: boolean,
		public pendingVaccine: boolean,
	) {}
}