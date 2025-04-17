import { Pet } from "../../domain/Pet"
import { PetFilter } from "../../domain/PetFilter"

export interface PetServiceInter {
	
	getAll(): Promise<Pet[]>

	getAllByName(name: string): Promise<Pet[]>

	getAllByFilter(petFilter: PetFilter): Promise<Pet[]>

	create(newPet: Pet): void

	update(pet: Pet): void

	delete(id: number): void
}