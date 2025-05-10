import { Disease, DiseaseJSON } from "../../domain/Disease";
import { DiseaseServiceInter } from "./DiseaseServiceInter";

export class DiseaseServiceStub implements DiseaseServiceInter{

    private object:DiseaseJSON[] = [
    {
        "id":0,
        "type":"Rabia",
        "observation":"Se noto que le agarro rabica",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":0
    },
    {
        "id":1,
        "type":"Moquillo",
        "observation":"Se noto que le agarro moquillo",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":1
    },
    {
        "id":2,
        "type":"Parasitos",
        "observation":"Se noto que le agarro parasitos",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":2
    },
    {
        "id":3,
        "type":"Hepatitis infecciosa canina",
        "observation":"Se noto que le agarro hepatitis infecciosa canina",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":3
    },
    {
        "id":4,
        "type":"Leptospirosis",
        "observation":"Se noto que le agarro leptospirosis",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":4
    },
    {
        "id":5,
        "type":"Parvovirosis",
        "observation":"Se noto que le agarro parvovirosis",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":5
    },
    {
        "id":6,
        "type":"Parainfluenza",
        "observation":"Se noto que le agarro parainfluenza",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":6
    },
    {
        "id":7,
        "type":"Adenovirus",
        "observation":"Se noto que le agarro adenovirus",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":7
    },
    {
        "id":8,
        "type":"Leishmaniosis",
        "observation":"Se noto que le agarro leishmaniosis",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":8
    },
    {
        "id":9,
        "type":"Bordetelosis",
        "observation":"Se noto que le agarro bordetelosis",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":9
    },
    {
        "id":10,
        "type":"Sarna",
        "observation":"Se noto que le agarro sarna",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":10
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