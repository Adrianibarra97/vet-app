import { PetServiceInter } from "./PetServiceInter"
import { Pet } from "../../domain/Pet"

export class PetServiceStub implements PetServiceInter{
  
	async getAll(): Promise<Pet[]> {
		return []
	}
}