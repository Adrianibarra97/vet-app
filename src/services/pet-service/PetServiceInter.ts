import { Pet } from '../../domain/Pet'
import { PetFilterValues } from '../../domain/PetFilterValues'

export interface PetServiceInter {
	
	getAll(): Promise<Pet[]>

	getAllByFilter(petFilter: PetFilterValues): Promise<Pet[]>

	getPetById(id: number): Promise<Pet>

	create(pet: Pet): void

	update(pet: Pet): void

	delete(id: number): void

	getPetById(id: number): Promise<Pet>
}