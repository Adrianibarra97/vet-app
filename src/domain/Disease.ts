export type DiseaseJSON = {
	id: number,
	type: string,
	observation: string,
	isActive:boolean,
	diagnosisDate:string,
	severity:string,
	medicalHistoryId?:number//Solo se usa para el stub
}

export class Disease {
	constructor(
		public id: number = -1,
		public type: string = '',
		public observation: string = '',
		public isActive:boolean = false,
		public diagnosisDate:string = '',
		public severity:string = '',
		public medicalHistoryId?:number//Solo se usa para el stub
	) {}

	static fromJSON(diseaseJSON:DiseaseJSON):Disease{
		return new Disease(
			diseaseJSON.id,
			diseaseJSON.type,
			diseaseJSON.observation,
			diseaseJSON.isActive,
			diseaseJSON.diagnosisDate,
			diseaseJSON.severity,
			diseaseJSON.medicalHistoryId
		)
	}

	toJSON(): DiseaseJSON {
		return {
			id: this.id,
			type: this.type,
			observation: this.observation,
			isActive:this.isActive,
			diagnosisDate:this.diagnosisDate,
			severity:this.severity,
			medicalHistoryId:this.medicalHistoryId
		}
	}
}