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
		public id: number = -1,
		public name: string = '',
		public breed: string = '',
		public age: number = 0,
		public weight: number = 0,
		public sterilized: boolean = false,
		public photo: string = '',
		public sex: string = '',
		public birth: string = '',
		public specie: string = ''
	) {}

	static fromJSON(petJSON: PetJSON): Pet {
		return new Pet(
			petJSON.id, petJSON.name, petJSON.breed, petJSON.age,
			petJSON.weight, petJSON.sterilized, petJSON.photo, petJSON.sex,
			petJSON.birth, petJSON.specie
		)
	}

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
			birth: this.birth,
			specie: this.specie,
		}
	}
}