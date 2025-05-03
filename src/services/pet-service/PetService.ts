import { PetServiceInter } from './PetServiceInter'

import { PetFilterValues } from '../../domain/PetFilterValues'
import { Pet, PetJSON } from '../../domain/Pet'
import axios from 'axios'
import { URL_BE } from '../config'
import AuthServiceManager from '../auth-service/AuthServiceManager'

export class PetService implements PetServiceInter {

	async getAll(): Promise<Pet[]> {
		const promise = await axios.get(URL_BE + '/pet/get-all')
		return promise['data'].map((petDTO: PetJSON) => {
			return Pet.fromJSON(petDTO)
		})
	}

	async getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]> {
		let promise: PetJSON[]
		const userId: number = 1
		if(AuthServiceManager.getIntance().isVet()) {
			promise = await axios.post(URL_BE + `/vet/get-all-pets-by-filter?idVet=${userId}`, petFilter.toJSON())
		} else {
			promise = await axios.post(URL_BE + `/pet-owner/get-all-pets-by-filter?idPetOwner=${userId}`, petFilter.toJSON())
		}
		return promise.map((petDTO: PetJSON) => {
			return Pet.fromJSON(petDTO)
		})
	}

	async getPetById(id: number): Promise<Pet> {
		const response = await axios.get<PetJSON>(`${URL_BE}/pet/get-one-by-id?idPet=${id}`)
		return Pet.fromJSON(response.data)
	}

	async create(pet: Pet): Promise<void> {
		await axios.post(URL_BE + '/pet/create/', pet.toJSON())
	}

	async update(pet: Pet): Promise<void> {
		await axios.put(URL_BE + '/pet/update/', pet.toJSON())
	}

	async delete(id: number): Promise<void> {
		await axios.delete(URL_BE + '/pet/delete/' + id.toString())
	}
}