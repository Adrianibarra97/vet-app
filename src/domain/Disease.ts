export type DiseaseJSON = {
	id: number,
	name: string,
	description: string
	medicalHistoryId?:number//Solo se usa para el stub
}

export class Disease {
	constructor(
		public id: number = -1,
		public name: string = '',
		public description: string = '',
		public medicalHistoryId?:number//Solo se usa para el stub
	) {}

	static fromJSON(diseaseJSON:DiseaseJSON):Disease{
		return new Disease(
			diseaseJSON.id,
			diseaseJSON.name,
			diseaseJSON.description,
			diseaseJSON.medicalHistoryId
		)
	}

	toJSON(): DiseaseJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			medicalHistoryId:this.medicalHistoryId
		}
	}
}