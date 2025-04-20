import { Pet } from "../../domain/Pet"
import { PetFilter } from "../../domain/PetFilterValues"

export interface PetServiceInter {
	
	getAll(): Promise<Pet[]>

	getAllByFilter(petFilter: PetFilter): Promise<Pet[]>

	create(newPet: Pet): void

	update(pet: Pet): void

	delete(id: number): void
}