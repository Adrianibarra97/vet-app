import { Disease } from "../../domain/Disease";

export interface DiseaseServiceInter{
    getAll():Promise<Disease[]>
    getDiseaseById(idDisease:number):Promise<Disease>
    getDiseaseByPetId(idPet:number):Promise<Disease[]>
    createNewDisease(disease:Disease):Promise<void>
    editExistDisease(disease:Disease):Promise<void>
    deleteExistDiseaseById(idDisease:number):Promise<void>
}