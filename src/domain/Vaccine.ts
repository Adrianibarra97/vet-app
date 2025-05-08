export type VaccineJSON = {
	id: number,
	name: string,
	description: string,
	batchNumber: number,
	expirationDate: string,
	aplicationDate: string
	medicalHistoryId?: number//Solo lo utilizo para el stub
}

export class Vaccine {
    
	constructor(
		public id: number = -1,
		public name: string = '',
		public description: string = '',
		public batchNumber: number = -1,
		public expirationDate: string = '',
		public aplicationDate: string = '',
		public medicalHistoryId?:number//Solo lo utilizo para el stub
	) {}

	static fromJSON(vaccineJSON:VaccineJSON):Vaccine{
		return new Vaccine(
			vaccineJSON.id,
			vaccineJSON.name,
			vaccineJSON.description,
			vaccineJSON.batchNumber,
			vaccineJSON.expirationDate,
			vaccineJSON.aplicationDate,
			vaccineJSON.medicalHistoryId
		)
	}

	toJSON(): VaccineJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			batchNumber: this.batchNumber,
			expirationDate: this.expirationDate,
			aplicationDate: this.aplicationDate,
			medicalHistoryId: this.medicalHistoryId
		} 
	}
}