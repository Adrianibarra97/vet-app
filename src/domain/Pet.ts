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
	specie: string,
	idMedicalHistory:number
}

export class Pet {
    
	constructor(
		public id: number = -1,
		public name: string = '',
		public breed: string = '',
		public age: number = 0,
		public weight: number = 0,
		public sterilized: boolean = true,
		public photo: string = '',
		public sex: string = 'Macho',
		public birth: string = '',
		public specie: string = '',
		public idMedicalHistory:number = -1
	) {}

	static fromJSON(petJSON: PetJSON): Pet {
		return new Pet(
			petJSON.id, petJSON.name, petJSON.breed, petJSON.age,
			petJSON.weight, petJSON.sterilized, petJSON.photo, petJSON.sex,
			petJSON.birth, petJSON.specie, petJSON.idMedicalHistory
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
			idMedicalHistory:this.idMedicalHistory
		}
	}
}

export class PetMedicalShiftDTO{
	constructor(
		public id:number = -1,
		public name:string = ''
	){}

	static fromJSON(petMedicalShiftJson:PetMedicalShiftJSON):PetMedicalShiftDTO{
		return new PetMedicalShiftDTO(
			petMedicalShiftJson.id,
			petMedicalShiftJson.name
		)
	}

	toJson():PetMedicalShiftJSON{
		return{
			id:this.id,
			name:this.name
		}
	}
}

export type PetMedicalShiftJSON = {
	id:number,
	name:string
}

enum TypeOfPet {
	CAT = "CAT",
	DOG = "DOG", 
	BIRD = "BIRD", 
	FISH = "FISH", 
	FARM = "FARM", 
	RODENT = "RODENT", 
	REPTILE = "REPTILE", 
	HORSE = "HORSE", 
	OTHER = "OTHER"
}

export function convertTypeOfPetToASpanishString(typeOfPet: TypeOfPet | string): string{
    const typeOfPetStrMap: { [key: string]: string } = {
		"CAT": 'Gato',
		"DOG": 'Perro',
		"BIRD": 'Ave',	
		"FISH": 'Pez',
		"FARM": 'Granja',
		"RODENT": 'Roedor',
		"REPTILE": 'Reptil',
		"HORSE": 'Caballo',
		"OTHER": 'Otro'
    }

    return typeOfPetStrMap[typeOfPet.toString()] 
}

export const PetOptions = Object.values(TypeOfPet) as TypeOfPet[]