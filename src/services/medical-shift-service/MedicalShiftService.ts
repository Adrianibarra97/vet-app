
import axios from "axios"
import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift"
import { URL_BE } from "../config"
import { MedicalShiftServiceInter } from "./MedicalShiftServiceInter"
import AuthServiceManager from "../auth-service/AuthServiceManager"

export class MedicalShiftService implements MedicalShiftServiceInter {
  
	async getAll(): Promise<MedicalShift[]> {
		const response = await axios.get(URL_BE + '/medical-shift/get-all')
		return response.data.map((shiftDTO: MedicalShiftJSON) => {
			return MedicalShift.fromJSON(shiftDTO)
		})
	}
	
	async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
		let response: MedicalShiftJSON[]
		const userId: number = 1
		if(AuthServiceManager.getIntance().isVet()) {
			response = await axios.post(URL_BE + `/vet/get-all-medical-shift-by-filter?idVet=${userId}`, filter)
		} else {
			response = await axios.post(URL_BE + `/pet-owner/get-all-medical-shift-by-filter?idPetOwner=${userId}`, filter)
		}
		return response.map((shiftDTO: MedicalShiftJSON) => {
			return MedicalShift.fromJSON(shiftDTO)
		})
	}

	async cancelMedicalShift(idMedicalShift: number): Promise<void> {
		await axios.delete(` ${URL_BE}/medical-shift/delete/${idMedicalShift}`)
	}

	async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
		const response = await axios.get<MedicalShiftJSON>(`${URL_BE}/medical-shift/get-one-by-id?idMedicalShift=${idMedicalShift}`)
		return MedicalShift.fromJSON(response.data)
	}
	
	async editExistMedicalShift(medicalShift:MedicalShift): Promise<void> {
		await axios.put(` ${URL_BE}/medical-shift/update/`, medicalShift)
	}

	async createNewMedicalShift(medicalShift: MedicalShift): Promise<void> {
		await axios.post(` ${URL_BE}/medical-shift/create`, medicalShift)
	}
}
