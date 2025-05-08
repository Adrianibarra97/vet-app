import axios from "axios";
import { Disease, DiseaseJSON } from "../../domain/Disease";
import { DiseaseServiceInter } from "./DiseaseServiceInter";
import { URL_BE } from "../config";

export class DiseaseService implements DiseaseServiceInter{
    async getAll(): Promise<Disease[]> {
        const response = await axios.get<DiseaseJSON[]>(`${URL_BE}/pre-existence-disease/get-all`)
        return response.data.map((diseaseJSON:DiseaseJSON)=>Disease.fromJSON(diseaseJSON))
    }

    async getDiseaseById(idDisease: number): Promise<Disease> {
        const response = await axios.get<DiseaseJSON>(`${URL_BE}/pre-existence-disease/get-one-by-id?idPreExistenceDisease=${idDisease}`)
        return Disease.fromJSON(response.data)
    }

    async getDiseasesByMedicalHistoryId(idMedicalHistory: number): Promise<Disease[]> {
        const response = await axios.get<DiseaseJSON[]>(`${URL_BE}/pre-existence-disease/...?...=${idMedicalHistory}`)
        return response.data.map((diseaseJSON:DiseaseJSON)=>Disease.fromJSON(diseaseJSON))
    }

    async createNewDisease(disease: Disease, idMedicalHistory:number): Promise<void> {
        const PreExistenceDiseaseDTO = {
            name:disease.name,
            description:disease.description,
            medicalHistoryId:idMedicalHistory
        }
        await axios.post(`${URL_BE}/pre-existence-disease/create`,PreExistenceDiseaseDTO)
    }

    async editExistDisease(disease: Disease,idMedicalHistory:number): Promise<void> {
        const PreExistenceDiseaseDTO = {
            ...disease,
            medicalHistoryId:idMedicalHistory
        }
        await axios.put(`${URL_BE}/pre-existence-disease/update`,PreExistenceDiseaseDTO)
    }

    async deleteExistDiseaseById(idDisease: number): Promise<void> {
        await axios.delete(`${URL_BE}/pre-existence-disease/delete?idPreExistenceDisease=${idDisease}`)
    }
}