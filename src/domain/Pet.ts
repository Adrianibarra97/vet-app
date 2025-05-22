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

	//Medical History
  idMedicalHistory: number,
  summary: string,
  createdAt: string,
  updatedAt: string,
  petOwnerId: number
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
		public specie: string = 'CAT',

		//Medical History
    public idMedicalHistory: number = -1,
    public summary: string = '',
    public createdAt: string = '',
    public updatedAt: string = '',
    public petOwnerId: number = -1
	) {}

	static fromJSON(petJSON: PetJSON): Pet {
		return new Pet(
			petJSON.id, petJSON.name, petJSON.breed, petJSON.age,
			petJSON.weight, petJSON.sterilized, petJSON.photo, petJSON.sex,
			petJSON.birth, petJSON.specie,

			petJSON.idMedicalHistory, petJSON.summary, petJSON.createdAt,
			petJSON.updatedAt, petJSON.petOwnerId
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

			idMedicalHistory: this.idMedicalHistory,
			summary: this.summary,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			petOwnerId: this.petOwnerId
		}
	}
}

export class PetMedicalShiftDTO {
	constructor(
		public id:number = -1,
		public name:string = ''
	){}

	static fromJSON(petMedicalShiftJson: PetMedicalShiftJSON): PetMedicalShiftDTO {
		return new PetMedicalShiftDTO(
			petMedicalShiftJson.id,
			petMedicalShiftJson.name
		)
	}

	toJson(): PetMedicalShiftJSON {
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

//Enum de especies que esta en el back
enum TypeOfPet {
	CAT = "CAT",
	DOG = "DOG", 
	BIRD = "BIRD", 
	FISH = "FISH", 
	FARM = "FARM", 
	RODENT = "RODENT", 
	REPTILE = "REPTILE", 
	HORSE = "HORSE"
}

//Funcion que nos sirve para traducir el tipo de especie que nos viene del back al español a traves de un map.
export function convertTypeOfPetToASpanishString(typeOfPet: TypeOfPet | string): string{
    const typeOfPetStrMap: { [key: string]: string } = {
		"CAT": 'Gato',
		"DOG": 'Perro',
		"BIRD": 'Ave',	
		"FISH": 'Pez',
		"FARM": 'Granja',
		"RODENT": 'Roedor',
		"REPTILE": 'Reptil',
		"HORSE": 'Caballo'
    }

    return typeOfPetStrMap[typeOfPet.toString()] 
}

//Constante que va a tener todos las especies que hay dentro del TypeOfPet
export const petOptions = Object.values(TypeOfPet) as TypeOfPet[]

//Ejemplo de uso dentro de un select
// {petOptions.map(petOption => (
// 	<MenuItem value={petOption} key={petOption}>
// 		{convertTypeOfPetToASpanishString(petOption)}
// 	</MenuItem>
// ))}