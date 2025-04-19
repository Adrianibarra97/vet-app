import { PetServiceInter } from './PetServiceInter'

import { PetFilterValues } from '../../domain/PetFilterValues'
import { Pet } from '../../domain/Pet'

export class PetServiceStub implements PetServiceInter {
  
	private objects: Array<Pet> = [
		{
			"id": 0,
			"photo": "./src/assets/nala.jfif",
			"name": "Nala",
			"age": 9,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 17,
			"sterilized": true,
			"specie": "Perro",
			"birth": "15/10/2015"
		},
		{
			"id": 1,
			"photo": "../../../src/assets/oli.jfif",
			"name": "Oli",
			"age": 4,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 14,
			"sterilized": true,
			"specie": "Perro",
			"birth": "20/02/2021"
		},
		{
			"id": 2,
			"photo": "../../../src/assets/owie.jfif",
			"name": "Owie",
			"age": 13,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 15,
			"sterilized": true,
			"specie": "Perro",
			"birth": "19/02/2012"
		},
		{
			"id": 3,
			"photo": "../../../src/assets/rocky.jfif",
			"name": "Rocky",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 25,
			"sterilized": false,
			"specie": "Perro",
			"birth": "02/07/2020"
		},
		{
			"id": 4,
			"photo": "../../../src/assets/pipi.jfif",
			"name": "Pipi",
			"age": 5,
			"breed": "Torcaza",
			"sex": "Hembra",
			"weight": 0.119,
			"sterilized": false,
			"specie": "Ave",
			"birth": "01/01/2020"
		},
		{
			"id": 5,
			"photo": "../../../src/assets/morena.jfif",
			"name": "Morena",
			"age": 14,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 15,
			"sterilized": true,
			"specie": "Perro",
			"birth": "20/05/2011"
		},
		{
			"id": 6,
			"photo": "../../../src/assets/mileva.jfif",
			"name": "Mileva",
			"age": 4,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 2.9,
			"sterilized": true,
			"specie": "Gato",
			"birth": "26/09/2020"
		},
		{
			"id": 7,
			"photo": "../../../src/assets/napoleon.jfif",
			"name": "Napoleón",
			"age": 9,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 6,
			"sterilized": true,
			"specie": "Gato",
			"birth": "11/09/2015"
		},
		{
			"id": 8,
			"photo": "../../../src/assets/burpee.jfif",
			"name": "Burpee",
			"age": 8,
			"breed": "Sharpei",
			"sex": "Macho",
			"weight": 19,
			"sterilized": true,
			"specie": "Perro",
			"birth": "01/10/2016"
		},
		{
			"id": 9,
			"photo": "../../../src/assets/freya.jfif",
			"name": "Freya",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 5,
			"sterilized": true,
			"specie": "Gato",
			"birth": "30/10/2019"
		},
		{
			"id": 10,
			"photo": "../../../src/assets/cleopatra.jfif",
			"name": "Cleopatra",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 4,
			"sterilized": true,
			"specie": "Gato",
			"birth": "30/10/2019"
		}
	]
	
	async getAll(): Promise<Pet[]> {
		return this.objects.map<Pet>(petDTO => {
			return new Pet(
				petDTO.id, petDTO.name, petDTO.breed,
				petDTO.age, petDTO.weight, petDTO.sterilized,
				petDTO.photo, petDTO.sex, new Date(), petDTO.specie
			)
		})
	}

	async getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]> {
		const pets = this.objects.map<Pet>(petDTO => {
			return new Pet(
				petDTO.id, petDTO.name, petDTO.breed,
				petDTO.age, petDTO.weight, petDTO.sterilized,
				petDTO.photo, petDTO.sex, new Date(), petDTO.specie
			)
		})

		if(petFilter.name != '' && petFilter.pendingVaccine && petFilter.withMedicalShift) {
			return pets.slice(0,5)
		}

		if(petFilter.name != '' && petFilter.pendingVaccine && !petFilter.withMedicalShift) {
			return pets.slice(0,8)
		}

		if(petFilter.name != '' && !petFilter.pendingVaccine && petFilter.withMedicalShift) {
			return pets.slice(0,2)
		}

		if(petFilter.name != '' && !petFilter.pendingVaccine && !petFilter.withMedicalShift) {
			return pets.slice(0,7)
		}

		if(petFilter.name == '' && petFilter.pendingVaccine && petFilter.withMedicalShift) {
			return pets.slice(0,6)
		}

		if(petFilter.name == '' && !petFilter.pendingVaccine && petFilter.withMedicalShift) {
			return pets.slice(0,3)
		}

		if(petFilter.name == '' && petFilter.pendingVaccine && !petFilter.withMedicalShift) {
			return pets.slice(0,4)
		}
		return pets
	}

	async create(newPet: Pet): Promise<void> {
		console.log(newPet)
	}

	async update(newPet: Pet): Promise<void> {
		console.log(newPet)
	}

	async delete(id: number): Promise<void> {
		console.log(id)
	}
}