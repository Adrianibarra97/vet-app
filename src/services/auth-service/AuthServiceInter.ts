import { Pet } from '../../domain/Pet'
import { PetFilterValues } from '../../domain/PetFilterValues'
import { UserLogin } from '../../domain/User'

export interface AuthServiceInter {


	
	login(userLogin: UserLogin): void

	logout(petFilter: PetFilterValues): void

	isAuthorized(newPet: Pet): boolean

	isAdmin(pet: Pet): boolean
}