import { PetServiceInter } from "./PetServiceInter"
import { Pet } from "../../domain/Pet"

export class PetService implements PetServiceInter {

	async getAll(): Promise<Pet[]> {
		return []
	}
}