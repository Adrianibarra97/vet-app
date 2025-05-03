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
		public birth: Date = new Date(),
		public specie: string = ''
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