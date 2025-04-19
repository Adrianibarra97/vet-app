export type VaccineJSON = {
	id: number,
	name: string,
	description: string,
	batchNumber: number,
	expirationDate: string,
	aplicationDate: string
}

export class Vaccine {
    
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public batchNumber: number,
		public expirationDate: Date,
		public aplicationDate: Date
	) {}

	toJSON(): VaccineJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			batchNumber: this.batchNumber,
			expirationDate: this.expirationDate.toString(),
			aplicationDate: this.aplicationDate.toString()
		} 
	}
}