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

enum TypeOfSeverity {
	Stable = 'Stable',
	Moderate = 'Moderate',
	Critical = 'Critical'
}

export function convertTypeOfSeverityToASpanishString(typeOfSeverity: TypeOfSeverity | string): string{
    const typeOfSeverityStrMap: { [key: string]: string } = {
        "Stable": 'Estable',
        "Moderate": 'Moderada',
        "Critical": 'Critica'
    }

    return typeOfSeverityStrMap[typeOfSeverity.toString()] 
}

export const severityTypeOptions = Object.values(TypeOfSeverity) as TypeOfSeverity[]

enum TypeOfPreExistinceDisease {
	ASTHMA = "ASTHMA", 
	DIABETES = "DIABETES", 
	DISTETER = "DISTETER", 
	PARVOVIRUS = "PARVOVIRUS", 
	EPILEPSY = "EPILEPSY",
	LEUKEMIA = "LEUKEMIA"
}

export function convertTypeOfPreExistinceDiseaseToASpanishString(typeOfPreExistinceDisease: TypeOfPreExistinceDisease | string): string {
    const typeOfPreExistinceDiseaseStrMap: { [key: string]: string } = {
        "ASTHMA": 'Asma',
        "DIABETES": 'Diabetes',
        "DISTETER": 'Moquillo',
        "PARVOVIRUS": 'Parvovirus',
        "EPILEPSY": 'Epilepsia',
        "LEUKEMIA": 'Leucemia'
    }

    return typeOfPreExistinceDiseaseStrMap[typeOfPreExistinceDisease.toString()] ?? typeOfPreExistinceDisease.toString();
}


export const preExistinceDiseaseOptions = Object.values(TypeOfPreExistinceDisease) as TypeOfPreExistinceDisease[]