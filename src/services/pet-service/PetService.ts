import { PetServiceInter } from './PetServiceInter'

import { PetFilterValues } from '../../domain/PetFilterValues'
import { Pet, PetJSON } from '../../domain/Pet'
import axios from 'axios'
import { URL_BE } from '../config'

export class PetService implements PetServiceInter {

	async getAll(): Promise<Pet[]> {
		const promise = await axios.get(URL_BE + '/pet/get-all')
		return promise['data'].map((petDTO: PetJSON) => {
			return new Pet(
				petDTO.id, petDTO.name, petDTO.breed,
				petDTO.age, petDTO.weight, petDTO.sterilized,
				petDTO.photo, petDTO.sex, new Date(), petDTO.specie
			)
		})
	}

	async getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]> {
		const promise = await axios.post(URL_BE + '/pet/filter/get-all-by-filter', petFilter.toJSON())
		return promise['data'].map((petDTO: PetJSON) => {
			return new Pet(
				petDTO.id, petDTO.name, petDTO.breed,
				petDTO.age, petDTO.weight, petDTO.sterilized,
				petDTO.photo, petDTO.sex, new Date(), petDTO.specie
			)
		})
	}

	async create(newPet: Pet): Promise<void> {
		await axios.post(URL_BE + '/pet/create/', newPet.toJSON())
	}

	async update(updatedPet: Pet): Promise<void> {
		await axios.put(URL_BE + '/pet/update/', updatedPet.toJSON())
	}

	async delete(id: number): Promise<void> {
		await axios.delete(URL_BE + '/pet/delete/' + id.toString())
	}
}