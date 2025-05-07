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
		public id: number = -1,
		public name: string = '',
		public description: string = '',
		public batchNumber: number = -1,
		public expirationDate: string = '',
		public aplicationDate: string = ''
	) {}

	static fromJSON(vaccineJSON:VaccineJSON):Vaccine{
		return new Vaccine(
			vaccineJSON.id,
			vaccineJSON.name,
			vaccineJSON.description,
			vaccineJSON.batchNumber,
			vaccineJSON.expirationDate,
			vaccineJSON.aplicationDate
		)
	}

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