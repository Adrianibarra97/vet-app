import { Study, StudyJSON } from "../../domain/Study";
import { StudyResultServiceInter } from "./StudyResultServiceInter";

export class StudyResultServiceStub implements StudyResultServiceInter{
    private object:StudyJSON[] = [
        {
            "id":0,
            "type":"PHYSIOLOGICAL",
            "date":"2025-02-04",
            "description":"Se detecto que tiene bien la orina",
            "medicalHistoryId":0
        },
        {
            "id":1,
            "type":"PHARMACOLOGICAL",
            "date":"2025-01-05",
            "description":"En la radiografia salio todo bien.",
            "medicalHistoryId":1
        }
    ]

    async getAll():Promise<Study[]>{
        return this.object.map((studyJSON:StudyJSON)=> Study.fromJSON(studyJSON))
    }

    async getStudyResultById(idStudyResult: number): Promise<Study> {
        const studyJSON:StudyJSON = this.object[idStudyResult - 1]
        return Study.fromJSON(studyJSON)
    }

    async getStudyResultByMedicalHistoryId(idMedicalHistory: number): Promise<Study[]> {
        const studysJSON:StudyJSON[] = this.object.filter(study => study.medicalHistoryId === idMedicalHistory)
        return studysJSON.map((studyJSON:StudyJSON)=>Study.fromJSON(studyJSON))
    }

    async createNewStudyResult(studyResult: Study, idMedicalHistory: number): Promise<void> {
        const newId = this.object.length > 0 ?
            Math.max(...this.object.map(study => study.id)) + 1
            : 1
        
        const newStudyJSON : StudyJSON = {
            ...studyResult,
            medicalHistoryId:idMedicalHistory,
            id:newId
        }

        this.object.push(newStudyJSON)
    }

    async editExistStudyResult(studyResult: Study, idMedicalHistory: number): Promise<void> {
        const index = this.object.findIndex(studyResultJSON => studyResultJSON.id === studyResult.id)
        if(index === -1){
            throw new Error(`No se encontro el resultado del estudio con id:${studyResult.id}`)
        }

        this.object[index] = {
            ...this.object[index],
            ...studyResult,
            medicalHistoryId:idMedicalHistory,
            id:studyResult.id
        }
    }

    async deleteExistStudyResult(idStudyResult: number): Promise<void> {
        this.object = this.object.filter(recipe => recipe.id !== idStudyResult)
    }
}