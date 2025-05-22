import { Disease, DiseaseJSON } from "../../domain/Disease";
import { DiseaseServiceInter } from "./DiseaseServiceInter";

export class DiseaseServiceStub implements DiseaseServiceInter{

    private object:DiseaseJSON[] = [
    {
        "id":0,
        "type":"ASTHMA",
        "observation":"Se noto que le agarro asma",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":0
    },
    {
        "id":1,
        "type":"DIABETES",
        "observation":"Se noto que le agarro diabetes",
        "isActive":true,
        "diagnosisDate":"2025-05-04",
        "severity":"Critical",
        "medicalHistoryId":1
    },
    {
        "id":2,
        "type":"DISTETER",
        "observation":"Se noto que le agarro moquillo",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":2
    },
    {
        "id":3,
        "type":"PARVOVIRUS",
        "observation":"Se noto que le agarro parvovirus",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":3
    },
    {
        "id":4,
        "type":"EPILEPSY",
        "observation":"Se noto que le agarro epilepsia",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":4
    },
    {
        "id":5,
        "type":"LEUKEMIA",
        "observation":"Se noto que le agarro leucemia",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":5
    },
    {
        "id":6,
        "type":"ASTHMA",
        "observation":"Se noto que le agarro asma",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":6
    },
    {
        "id":7,
        "type":"DIABETES",
        "observation":"Se noto que le agarro diabetes",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":7
    },
    {
        "id":8,
        "type":"DISTETER",
        "observation":"Se noto que le agarro moquillo",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":8
    },
    {
        "id":9,
        "type":"PARVOVIRUS",
        "observation":"Se noto que le agarro parvovirus",
        "isActive":false,
        "diagnosisDate":"2025-05-04",
        "severity":"Stable",
        "medicalHistoryId":9
    },
    {
        "id":10,
        "type":"EPILEPSY",
        "observation":"Se noto que le agarro epilepsia",
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
            isActive:true,
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