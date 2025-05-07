export type DiseaseJSON = {
	id: number,
	name: string,
	description: string
	petId?:number//Solo se usa para el stub
}

export class Disease {

	constructor(
		public id: number = -1,
		public name: string = '',
		public description: string = '',
		public petId?:number
	) {}

	static fromJSON(diseaseJSON:DiseaseJSON):Disease{
		return new Disease(
			diseaseJSON.id,
			diseaseJSON.name,
			diseaseJSON.description,
			diseaseJSON.petId
		)
	}

	toJSON(): DiseaseJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			petId:this.petId
		}
	}
}