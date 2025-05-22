import { Study } from "../../domain/Study";

export interface StudyResultServiceInter{
    getAll():Promise<Study[]>
    getStudyResultById(idStudyResult:number):Promise<Study>
    getStudyResultByMedicalHistoryId(idMedicalHistory:number):Promise<Study[]>
    createNewStudyResult(studyResult:Study,idMedicalHistory:number):Promise<void>
    editExistStudyResult(studyResult:Study,idMedicalHistory:number):Promise<void>
    deleteExistStudyResult(idStudyResult:number):Promise<void>
}