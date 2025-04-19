import { Pet, PetJSON } from './Pet'
import { User, UserJSON } from './User'

export type MedicalHistoryJSON = {
	id: number,
	pet: PetJSON,
	vet: UserJSON,
	notes: string,
}

export class MedicalHistory {

	constructor(
		public id: number,
		public pet: Pet,
		public vet: User,
		public notes: string
	) {}

	toJSON(): MedicalHistoryJSON {
		return {
			id: this.id,
			pet: this.pet.toJSON(),
			vet: this.vet.toJSON(),
			notes: this.notes
		}
	}
}