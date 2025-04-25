
import axios from "axios"
import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift"
import { URL_BE } from "../config"
import { MedicalShiftServiceInter } from "./MedicalShiftServiceInter"

export class MedicalShiftService implements MedicalShiftServiceInter {
  
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

	async cancelMedicalShift(idMedicalShift: number): Promise<void> {
		await axios.delete(` ${URL_BE}/medical-shift/delete/${idMedicalShift}`)
	}

	async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
		return await axios.get<MedicalShiftJSON>(`${URL_BE}/medical-shift/${idMedicalShift}`)
			.then(response => {
				return new MedicalShift(
					response.data.id,
					response.data.vetName,
					response.data.petName,
					response.data.date
				)
			})
			.catch(error => {
				console.error("Error obteniendo turno médico:", error)
				throw new Error("No se pudo obtener el turno médico")
			});
	}
	
	async editExistMedicalShift(idMedicalShift: number, medicalShift:MedicalShift): Promise<void> {
		await axios.put(` ${URL_BE}/medical-shift/update/${idMedicalShift}`, medicalShift)
	}

	async createNewMedicalShift(medicalShift: MedicalShift): Promise<void> {
		await axios.post(` ${URL_BE}/medical-shift/create`, medicalShift)
	}
}
