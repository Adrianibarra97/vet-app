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

    async getDiseaseByPetId(idPet: number): Promise<Disease[]> {
        const response = await axios.get<DiseaseJSON[]>(`${URL_BE}/pre-existence-disease/...?...=${idPet}`)
        return response.data.map((diseaseJSON:DiseaseJSON)=>Disease.fromJSON(diseaseJSON))
    }

    async createNewDisease(disease: Disease): Promise<void> {
        console.log(`Todo: To implement creation disease ${disease} `)
    }

    async editExistDisease(disease: Disease): Promise<void> {
        console.log(`Todo: To implement edit disease ${disease}`)
    }

    async deleteExistDiseaseById(idDisease: number): Promise<void> {
        await axios.delete(`${URL_BE}/pre-existence-disease/delete?idPreExistenceDisease=${idDisease}`)
    }
}