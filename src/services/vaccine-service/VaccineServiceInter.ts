import { Vaccine } from "../../domain/Vaccine";

export interface VaccineServiceInter{
    getAll():Promise<Vaccine[]>
    getVaccineById(idVaccine:number):Promise<Vaccine>
    getVaccineByMedicalHistoryId(idMedicalHistory:number):Promise<Vaccine[]>
    createNewVaccine(vaccine:Vaccine,idMedicalHistory:number):Promise<void>
    editExistVaccine(vaccine:Vaccine,idMedicalHistory:number):Promise<void>
    deleteExistVaccine(idVaccine:number):Promise<void>
}