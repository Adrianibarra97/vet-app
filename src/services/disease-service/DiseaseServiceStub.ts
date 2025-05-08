import { Disease, DiseaseJSON } from "../../domain/Disease";
import { DiseaseServiceInter } from "./DiseaseServiceInter";

export class DiseaseServiceStub implements DiseaseServiceInter{

    private object:DiseaseJSON[] = [
        {
            id:0,
            name:'Rabia',
            description:'Se noto que le agarro rabica',
            medicalHistoryId:0
        },
        {
            id:1,
            name:'Moquillo',
            description:'Se noto que le agarro moquillo',
            medicalHistoryId:1
        },
        {
            id:2,
            name:'Parasitos',
            description:'Se noto que le agarro parasitos',
            medicalHistoryId:2
        },
        {
            id:3,
            name:'Hepatitis infecciosa canina',
            description:'Se noto que le agarro hepatitis infecciosa canina',
            medicalHistoryId:3
        },
        {
            id:4,
            name:'Leptospirosis',
            description:'Se noto que le agarro leptospirosis',
            medicalHistoryId:4
        },
        {
            id:5,
            name:'Parvovirosis',
            description:'Se noto que le agarro parvovirosis',
            medicalHistoryId:5
        },
        {
            id:6,
            name:'Parainfluenza',
            description:'Se noto que le agarro parainfluenza',
            medicalHistoryId:6
        },
        {
            id:7,
            name:'Adenovirus',
            description:'Se noto que le agarro adenovirus',
            medicalHistoryId:7
        },
        {
            id:8,
            name:'Leishmaniosis',
            description:'Se noto que le agarro leishmaniosis',
            medicalHistoryId:8
        },
        {
            id:9,
            name:'Bordetelosis',
            description:'Se noto que le agarro bordetelosis',
            medicalHistoryId:9
        },
        {
            id:10,
            name:'Sarna',
            description:'Se noto que le agarro sarna',
            medicalHistoryId:10
        }
    ]

    async getAll(): Promise<Disease[]> {
        return this.object.map((diseaseJSON:DiseaseJSON)=> Disease.fromJSON(diseaseJSON))
    }

    async getDiseaseById(idDisease: number): Promise<Disease> {
        const diseaseJSON: DiseaseJSON = this.object[idDisease - 1]
        return Disease.fromJSON(diseaseJSON)
    }

    async getDiseasesByMedicalHistoryId(idMedicalHistory: number): Promise<Disease[]> {
        const diseasesJSON:DiseaseJSON[] = this.object.filter(disease => disease.medicalHistoryId === idMedicalHistory)
        return diseasesJSON.map((diseaseJSON:DiseaseJSON)=>Disease.fromJSON(diseaseJSON))
    }

    async createNewDisease(disease:Disease,idMedicalHistory:number): Promise<void> {
        const newId = this.object.length > 0 ?
            Math.max(...this.object.map(disease => disease.id)) + 1 
            : 1

        const newDiseaseJSON : DiseaseJSON = {
            ...disease,
            medicalHistoryId:idMedicalHistory,
            id:newId
        }

        this.object.push(newDiseaseJSON)
    }

    async editExistDisease(disease: Disease, idMedicalHistory:number): Promise<void> {
        const index = this.object.findIndex(diseaseJSON => diseaseJSON.id === disease.id)
        if (index === -1){
            throw new Error(`No se encontro la enfermedad con el id:${disease.id}`)
        }

        this.object[index] = {
            ...this.object[index],
            ...disease,
            medicalHistoryId:idMedicalHistory,
            id:disease.id
        }
    }

    async deleteExistDiseaseById(idDisease: number): Promise<void> {
        this.object = this.object.filter(disease => disease.id !== idDisease)
    }
}