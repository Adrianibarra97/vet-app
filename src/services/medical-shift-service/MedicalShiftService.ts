import axios from "axios"
import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift"
import { URL_BE } from "../config"

export class MedicalShiftService {
  
	async getAll(): Promise<MedicalShift[]> {
		const response = await axios.get(URL_BE + '/medical-shift/get-all')
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
		const response = await axios.post(URL_BE + '/medical-shift/filter', filter)
		return response.data.map((shiftDTO: MedicalShiftJSON) => {
		  return new MedicalShift(
			shiftDTO.id,
			shiftDTO.vetName,
			shiftDTO.petName,
			shiftDTO.date
		  )
		})
	}

		cancelMedicalShift(idMedicalShift: number): void {
			axios.delete( ` ${URL_BE}/medical-shift/delete/${idMedicalShift}`)
	  }
	}
