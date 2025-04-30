export type PetJSON = {
	id: number,
	name: string,
	breed: string,
	age: number,
	weight: number,
	sterilized: boolean,
	photo: string,
	sex: string,
	birth: string,
	specie: string
}

export class Pet {
    
	constructor(
		public id: number,
		public name: string,
		public breed: string,
		public age: number,
		public weight: number,
		public sterilized: boolean,
		public photo: string,
		public sex: string,
		public birth: Date,
		public specie: string
	) {}

	toJSON(): PetJSON {
		return {
			id: this.id,
			name: this.name,
			breed: this.breed,
			age: this.age,
			weight: this.weight,
			sterilized: this.sterilized,
			photo: this.photo,
			sex: this.sex,
			birth: this.birth.toString(),
			specie: this.specie,
		}
	}
}