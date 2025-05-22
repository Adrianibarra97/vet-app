import { Disease } from "../../domain/Disease";

export interface DiseaseServiceInter{
    getAll():Promise<Disease[]>
    getDiseaseById(idDisease:number):Promise<Disease>
    getDiseasesByMedicalHistoryId(idMedicalHistory:number):Promise<Disease[]>
    createNewDisease(disease:Disease,idMedicalHistory:number):Promise<void>
    editExistDisease(disease:Disease,idMedicalHistory:number):Promise<void>
    deleteExistDiseaseById(idDisease:number):Promise<void>
}