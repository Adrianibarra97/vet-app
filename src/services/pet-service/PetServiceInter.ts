import { Pet } from "../../domain/Pet"

export interface PetServiceInter {
	
	getAll(): Promise<Pet[]>
}