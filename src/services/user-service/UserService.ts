import axios from "axios";
import { UserServiceInter } from "./UserServiceInter";
import { MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift";
import { URL_BE } from "../config";
import { FilterTurn } from "../../domain/Filterturn";

export class UserService implements UserServiceInter {
  
	async getAll(): Promise<MedicalShift[]> {
		const response = await axios.get(URL_BE + '/shift/get-all')
		return response.data.map((shiftDTO: MedicalShiftJSON) => {
		  return new MedicalShift(
			shiftDTO.id,
			shiftDTO.vetName,
			shiftDTO.petName,
			shiftDTO.date
		  )
		})
	  }
	
	  async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
		const response = await axios.post(URL_BE + '/shift/filter', filter)
		return response.data.map((shiftDTO: MedicalShiftJSON) => {
		  return new MedicalShift(
			shiftDTO.id,
			shiftDTO.vetName,
			shiftDTO.petName,
			shiftDTO.date
		  )
		})
	  }
	}