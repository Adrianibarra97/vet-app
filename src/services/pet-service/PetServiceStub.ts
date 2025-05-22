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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory": 0,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory": 1,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory": 2,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory": 3,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "BIRD",
			"birth": "2025-04-25",
			"idMedicalHistory": 4,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory": 5,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "CAT",
			"birth": "2025-04-25",
			"idMedicalHistory": 6,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "CAT",
			"birth": "2025-04-25",
			"idMedicalHistory": 7,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "DOG",
			"birth": "2025-04-25",
			"idMedicalHistory":8,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "CAT",
			"birth": "2025-04-25",
			"idMedicalHistory": 9,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
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
			"specie": "CAT",
			"birth": "2025-04-25",
			"idMedicalHistory": 10,
			"summary": '...',
			"createdAt": '2025-04-25',
			"updatedAt": '2025-04-25',
			"petOwnerId": 0
		}
	]
	
	async getAll(): Promise<Pet[]> {
		return this.objects.map<Pet>(petDTO => {
			return Pet.fromJSON(petDTO)
		})
	}

	async getPetById(id: number): Promise<Pet> {
		let pet = new Pet()
		this.objects.forEach(object => {
			if(object.id == id) pet = Pet.fromJSON(object)
		})
		return pet
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
		for(let i=0; i < this.objects.length; i++) {
			if(this.objects[i].id === pet.id) {
				this.objects[i] = pet.toJSON()
			}
		}
	}

	async delete(id: number): Promise<void> {
		this.objects = this.objects.filter((object: PetJSON) => object.id != id)
	}
}