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
        const response = await axios.get<VaccineJSON[]>(`${URL_BE}/medical-history/get-all-pet-vaccines?idMedicalHistory=${idMedicalHistory}`)
        return response.data.map((vaccineJSON:VaccineJSON)=>Vaccine.fromJSON(vaccineJSON))
    }

    async createNewVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {        
        const newVaccineDTO = {
            type:vaccine.type,
            description:vaccine.description,
            batchNumber:vaccine.batchNumber,
            applicationDate:vaccine.applicationDate,
            expirationDate:vaccine.expirationDate,
            completed:false,
            medicalHistoryId:idMedicalHistory
        }
        console.log('Vacuna creada:',newVaccineDTO)
        await axios.post(`${URL_BE}/vaccines/create`, newVaccineDTO)
    }

    async editExistVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {
        const newVaccineDTO = {
            id:vaccine.id,
            type:vaccine.type,
            description:vaccine.description,
            batchNumber:vaccine.batchNumber,
            applicationDate:vaccine.applicationDate,
            expirationDate:vaccine.expirationDate,
            completed:vaccine.completed,
            medicalHistoryId:idMedicalHistory
        }
        console.log('Vacuna editada:',newVaccineDTO)
        await axios.put(`${URL_BE}/vaccines/update`,newVaccineDTO)
    }

    async deleteExistVaccine(idVaccine: number): Promise<void> {
        await axios.delete(`${URL_BE}/vaccines/delete?idVaccine=${idVaccine}`)
    }
}