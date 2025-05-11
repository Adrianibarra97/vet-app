import { PetServiceInter } from './PetServiceInter'

import { PetFilterValues } from '../../domain/PetFilterValues'
import { Pet, PetJSON } from '../../domain/Pet'
import { capitalize } from '@mui/material'

export class PetServiceStub implements PetServiceInter {

	private standardPath: string = '/src/assets/'
	private objects: Array<PetJSON> = [
		{
			"id": 0,
			"photo": this.standardPath + "nala.jfif",
			"name": "Nala",
			"age": 9,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 17,
			"sterilized": true,
			"specie": "Perro",
			"birth": "15/10/2015",
			"idMedicalHistory": 0
		},
		{
			"id": 1,
			"photo": this.standardPath + "oli.jfif",
			"name": "Oli",
			"age": 4,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 14,
			"sterilized": true,
			"specie": "Perro",
			"birth": "20/02/2021",
			"idMedicalHistory": 1
		},
		{
			"id": 2,
			"photo": this.standardPath + "owie.jfif",
			"name": "Owie",
			"age": 13,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 15,
			"sterilized": true,
			"specie": "Perro",
			"birth": "19/02/2012",
			"idMedicalHistory": 2
		},
		{
			"id": 3,
			"photo": this.standardPath + "rocky.jfif",
			"name": "Rocky",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 25,
			"sterilized": false,
			"specie": "Perro",
			"birth": "02/07/2020",
			"idMedicalHistory": 3
		},
		{
			"id": 4,
			"photo": this.standardPath + "pipi.jfif",
			"name": "Pipi",
			"age": 5,
			"breed": "Torcaza",
			"sex": "Hembra",
			"weight": 0.119,
			"sterilized": false,
			"specie": "Ave",
			"birth": "01/01/2020",
			"idMedicalHistory": 4
		},
		{
			"id": 5,
			"photo": this.standardPath + "morena.jfif",
			"name": "Morena",
			"age": 14,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 15,
			"sterilized": true,
			"specie": "Perro",
			"birth": "20/05/2011",
			"idMedicalHistory": 5
		},
		{
			"id": 6,
			"photo": this.standardPath + "mileva.jfif",
			"name": "Mileva",
			"age": 4,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 2.9,
			"sterilized": true,
			"specie": "Gato",
			"birth": "26/09/2020",
			"idMedicalHistory": 6
		},
		{
			"id": 7,
			"photo": this.standardPath + "napoleon.jfif",
			"name": "Napoleón",
			"age": 9,
			"breed": "Mestizo",
			"sex": "Macho",
			"weight": 6,
			"sterilized": true,
			"specie": "Gato",
			"birth": "11/09/2015",
			"idMedicalHistory": 7
		},
		{
			"id": 8,
			"photo": this.standardPath + "burpee.jfif",
			"name": "Burpee",
			"age": 8,
			"breed": "Sharpei",
			"sex": "Macho",
			"weight": 19,
			"sterilized": true,
			"specie": "Perro",
			"birth": "01/10/2016",
			"idMedicalHistory":8
		},
		{
			"id": 9,
			"photo": this.standardPath + "freya.jfif",
			"name": "Freya",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 5,
			"sterilized": true,
			"specie": "Gato",
			"birth": "30/10/2019",
			"idMedicalHistory": 9
		},
		{
			"id": 10,
			"photo": this.standardPath + "cleopatra.jfif",
			"name": "Cleopatra",
			"age": 5,
			"breed": "Mestizo",
			"sex": "Hembra",
			"weight": 4,
			"sterilized": true,
			"specie": "Gato",
			"birth": "30/10/2019",
			"idMedicalHistory": 10
		}
	]
	
	async getAll(): Promise<Pet[]> {
		return this.objects.map<Pet>(petDTO => {
			return Pet.fromJSON(petDTO)
		})
	}

	async getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]> {
		const pets = this.objects.map<Pet>(petDTO => {
			return Pet.fromJSON(petDTO)
		})

		if(petFilter.name != '' && petFilter.hasPendingVaccine && petFilter.hasMedicalShift) {
			return pets.filter((pet) => pet.name.startsWith(petFilter.name))
		}

		if(petFilter.name != '' && petFilter.hasPendingVaccine && !petFilter.hasMedicalShift) {
			return pets.filter((pet) => pet.name.startsWith(petFilter.name))
		}

		if(petFilter.name != '' && !petFilter.hasPendingVaccine && petFilter.hasMedicalShift) {
			return pets.filter((pet) => pet.name.startsWith(petFilter.name))
		}

		if(petFilter.name != '' && !petFilter.hasPendingVaccine && !petFilter.hasMedicalShift) {
			return pets.filter((pet) => capitalize(pet.name).startsWith(capitalize(petFilter.name)))
		}

		if(petFilter.name == '' && petFilter.hasPendingVaccine && petFilter.hasMedicalShift) {
			return pets.slice(0,6)
		}

		if(petFilter.name == '' && !petFilter.hasPendingVaccine && petFilter.hasMedicalShift) {
			return pets.slice(0,3)
		}

		if(petFilter.name == '' && petFilter.hasPendingVaccine && !petFilter.hasMedicalShift) {
			return pets.slice(0,4)
		}
		return pets
	}

	async create(pet: Pet): Promise<void> {
		pet.id = this.objects.length
		this.objects.push(pet.toJSON())
	}

	async update(pet: Pet): Promise<void> {
		console.log(pet)
		this.objects.forEach((object: PetJSON) => {
			if(object.id === pet.id) {
				object = pet.toJSON()
			}
		})
	}

	async delete(id: number): Promise<void> {
		console.log(id)
		this.objects = this.objects.filter((object: PetJSON) => object.id != id)
	}

	async getPetById(id: number): Promise<Pet> {
		const petJSON:PetJSON = this.objects[id]
		const pet:Pet = Pet.fromJSON(petJSON)
		return pet
	}
}