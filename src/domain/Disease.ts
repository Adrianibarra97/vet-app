export type DiseaseJSON = {
	id: number,
	name: string,
	description: string
}

export class Disease {

	constructor(
		public id: number,
		public name: string,
		public description: string
	) {}

	toJSON(): DiseaseJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description
		}
  }
}