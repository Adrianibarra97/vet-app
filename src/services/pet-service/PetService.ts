import { getUserID } from './../auth-service/AuthService';
import { PetServiceInter } from './PetServiceInter'
import { PetFilterValues } from '../../domain/PetFilterValues'
import { Pet, PetJSON } from '../../domain/Pet'
import axios from 'axios'
import { URL_BE } from '../config'
import AuthServiceManager from '../auth-service/AuthServiceManager';
import dayjs from 'dayjs';

export class PetService implements PetServiceInter {

	async getAll(): Promise<Pet[]> {
		const promise = await axios.get(URL_BE + '/pet/get-all')
		return promise['data'].map((petDTO: PetJSON) => {
			return Pet.fromJSON(petDTO)
		})
	}

	async getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]> {
		if(AuthServiceManager.getIntance().isVet()) {
			const response = await axios.post(URL_BE + `/vet/get-all-pets-by-filter?idVet=${getUserID()}`, petFilter.toJSON())
			const promise: PetJSON[] = response.data
			return promise.map((petDTO: PetJSON) => Pet.fromJSON(petDTO))
		}
		if(AuthServiceManager.getIntance().isOwner()) {
			const response = await axios.post(URL_BE + `/pet-owner/get-all-pets-by-filter?idPetOwner=${getUserID()}`, petFilter.toJSON())
			const promise: PetJSON[] = response.data
			return promise.map((petDTO: PetJSON) => Pet.fromJSON(petDTO))
		}
		throw console.error('Está intentando traer la petición con un id de usuario no válido.')
	}

	async getPetById(id: number): Promise<Pet> {
		const response = await axios.get<PetJSON>(`${URL_BE}/pet/get-one-by-id?idPet=${id}`)
		return Pet.fromJSON(response.data)
	}

	async create(pet: Pet): Promise<void> {
		const date: Date = new Date()

		pet.petOwnerId = getUserID()
		pet.updatedAt = dayjs(date).format('YYYY-MM-DD')

		if(pet.id < 0) {
			pet.createdAt = dayjs(date).format('YYYY-MM-DD')
		}

		console.log(pet.toJSON())
		await axios.post(`${URL_BE}/pet/create`, pet.toJSON())
	}

	async update(pet: Pet): Promise<void> {
		if(pet.id > 0) {
			await axios.put(`${URL_BE}/pet/update`, pet.toJSON())
		}
	}

	async delete(id: number): Promise<void> {
		await axios.delete(`${URL_BE}/pet/delete?idPet=${id}`)
	}
}