import axios from "axios";
import { Vaccine, VaccineJSON } from "../../domain/Vaccine";
import { URL_BE } from "../config";
import { VaccineServiceInter } from "./VaccineServiceInter";

export class VaccineService implements VaccineServiceInter{
    async getAll(): Promise<Vaccine[]> {
        const response = await axios.get<VaccineJSON[]>(`${URL_BE}/vaccines/get-all`)
        return response.data.map((vaccineJSON:VaccineJSON)=>Vaccine.fromJSON(vaccineJSON))
    }

    async getVaccineById(idVaccine: number): Promise<Vaccine> {
        const response = await axios.get<VaccineJSON>(`${URL_BE}/vaccines/get-one-by-id?idVaccine=${idVaccine}`)
        return Vaccine.fromJSON(response.data)
    }

    async getVaccineByMedicalHistoryId(idMedicalHistory: number): Promise<Vaccine[]> {
        const response = await axios.get<VaccineJSON[]>(`${URL_BE}/vaccines/...?...=${idMedicalHistory}`)
        return response.data.map((vaccineJSON:VaccineJSON)=>Vaccine.fromJSON(vaccineJSON))
    }

    async createNewVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {
        const today = new Date()
        today.setFullYear(today.getFullYear() + 1)
        const nextYearDate = today.toISOString().split('T')[0]

        const newVaccineDTO = {
            name:vaccine.name,
            description:vaccine.description,
            batchNumber:vaccine.batchNumber,
            aplicationDate:new Date().toISOString().split('T')[0],
            expirationDate:nextYearDate,
            medicalHistoryId:idMedicalHistory
        }

        await axios.post(`${URL_BE}/vaccine/create`, newVaccineDTO)
    }

    async editExistVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {
        const newVaccineDTO = {
            id:vaccine.id,
            name:vaccine.name,
            description:vaccine.description,
            batchNumber:vaccine.batchNumber,
            medicalHistoryId:idMedicalHistory
        }

        await axios.put(`${URL_BE}/vaccines/update`,newVaccineDTO)
    }

    async deleteExistVaccine(idVaccine: number): Promise<void> {
        await axios.delete(`${URL_BE}/vaccines/delete?idVaccine=${idVaccine}`)
    }
}