import { Vaccine, VaccineJSON } from "../../domain/Vaccine";
import { VaccineServiceInter } from "./VaccineServiceInter";

export class VaccineServiceStub implements VaccineServiceInter{
    private object:VaccineJSON[] = [
        {
            "id":0,
            "type":"ANTIRABIES",
            "description":"Se le aplico la anti-rabica porque se le encontro rabia",
            "batchNumber":152345,
            "applicationDate":"2025-05-01",
            "expirationDate":"2026-05-01",
            "completed":false,
            "medicalHistoryId":0
        },
        {
            "id":1,
            "type":"DISTEMPER",
            "description":"Se le aplico la vacuna contra el moquillo",
            "batchNumber":2123123,
            "applicationDate":"2025-04-25",
            "expirationDate":"2026-04-25",
            "completed":false,
            "medicalHistoryId":1
        }
    ]

    async getAll():Promise<Vaccine[]>{
        return this.object.map((vaccineJSON:VaccineJSON)=>Vaccine.fromJSON(vaccineJSON))
    }

    async getVaccineById(idVaccine: number): Promise<Vaccine> {
        const vaccineJSON:VaccineJSON = this.object[idVaccine]
        return Vaccine.fromJSON(vaccineJSON)
    }

    async getVaccineByMedicalHistoryId(idMedicalHistory: number): Promise<Vaccine[]> {
        const vaccinesJSON:VaccineJSON[] = this.object.filter(vaccine => vaccine.medicalHistoryId === idMedicalHistory)
        return vaccinesJSON.map((vaccineJSON:VaccineJSON)=> Vaccine.fromJSON(vaccineJSON))
    }

    async createNewVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {
        const newId = this.object.length > 0 ?
            Math.max(...this.object.map(vaccine => vaccine.id)) + 1
            : 1

        const newVaccineJSON : VaccineJSON = {
            ...vaccine,
            medicalHistoryId:idMedicalHistory,
            id:newId
        }

        this.object.push(newVaccineJSON)
    }

    async editExistVaccine(vaccine: Vaccine, idMedicalHistory: number): Promise<void> {
        const index = this.object.findIndex(vaccineJSON => vaccineJSON.id === vaccine.id)
        if(index === -1){
            throw new Error(`No se encontro la vacuna con el id:${vaccine.id}`)
        }

        this.object[index] = {
            ...this.object[index],
            ...vaccine,
            medicalHistoryId:idMedicalHistory,
            id:vaccine.id
        }
    }

    async deleteExistVaccine(idVaccine:number): Promise<void> {
        this.object = this.object.filter(vaccine => vaccine.id !== idVaccine)
    }
}