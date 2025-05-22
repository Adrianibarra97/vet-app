export type VaccineJSON = {
	id: number,
	type: string,
	description: string,
	batchNumber: number,
	expirationDate: string,
	applicationDate: string
	medicalHistoryId?: number//Solo lo utilizo para el stub
}

export class Vaccine {
	constructor(
		public id: number = -1,
		public type: string = '',
		public description: string = '',
		public batchNumber: number = -1,
		public expirationDate: string = '',
		public applicationDate: string = '',
		public medicalHistoryId?:number//Solo lo utilizo para el stub
	) {}

	static fromJSON(vaccineJSON:VaccineJSON):Vaccine{
		return new Vaccine(
			vaccineJSON.id,
			vaccineJSON.type,
			vaccineJSON.description,
			vaccineJSON.batchNumber,
			vaccineJSON.expirationDate,
			vaccineJSON.applicationDate,
			vaccineJSON.medicalHistoryId
		)
	}

	toJSON(): VaccineJSON {
		return {
			id: this.id,
			type: this.type,
			description: this.description,
			batchNumber: this.batchNumber,
			expirationDate: this.expirationDate,
			applicationDate: this.applicationDate,
			medicalHistoryId: this.medicalHistoryId
		} 
	}
}

enum TypeOfVaccine {
	ANTIRABIES = "ANTIRABIES", 
	DISTEMPER = "DISTEMPER", 
	PARVOVIRUS = "PARVOVIRUS", 
	HEPATITIS = "HEPATITIS", 
	LEPTOSPIROSIS = "LEPTOSPIROSIS", 
	PARAINFLUENZA = "PARAINFLUENZA", 
	DEWORMING = "DEWORMING"
}

export function convertTypeOfVaccineToASpanishString(typeOfVaccine: TypeOfVaccine | string): string{
    const typeOfVaccineStrMap: { [key: string]: string } = {
        "ANTIRABIES": 'Rabia',
        "DISTEMPER": 'Moquillo',
		"PARVOVIRUS": 'Parvovirus',
        "HEPATITIS": 'Hepatitis',
        "LEPTOSPIROSIS": 'Leptospirosis',
        "PARAINFLUENZA": 'Parainfluenza',
        "DEWORMING": 'Parasitos'
    }

    return typeOfVaccineStrMap[typeOfVaccine.toString()] 
}

export const vaccineOptions = Object.values(TypeOfVaccine) as TypeOfVaccine[]