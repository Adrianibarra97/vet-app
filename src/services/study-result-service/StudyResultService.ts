import axios from "axios";
import { Study, StudyJSON } from "../../domain/Study";
import { URL_BE } from "../config";
import { StudyResultServiceInter } from "./StudyResultServiceInter";

export class StudyResultService implements StudyResultServiceInter{
    async getAll(): Promise<Study[]> {
        const response = await axios.get<StudyJSON[]>(`${URL_BE}/study-result/get-all`)
        return response.data.map((studyJSON:StudyJSON)=>Study.fromJSON(studyJSON))
    }

    async getStudyResultById(idStudyResult: number): Promise<Study> {
        const response = await axios.get<StudyJSON>(`${URL_BE}/study-result/get-one-by-id?idStudyResult=${idStudyResult}`)
        return Study.fromJSON(response.data)
    }

    async getStudyResultByMedicalShiftId(idMedicalHistory: number): Promise<Study[]> {
        const response = await axios.get<StudyJSON[]>(`${URL_BE}/study-result/...?...=${idMedicalHistory}`)
        return response.data.map((studyJSON:StudyJSON)=>Study.fromJSON(studyJSON))
    }

    async createNewStudyResult(studyResult: Study, idMedicalHistory: number): Promise<void> {
        const newStudyResultDTO = {
            name:studyResult.name,
            description:studyResult.description,
            medicalHistoryId:idMedicalHistory
        }

        await axios.post(`${URL_BE}/study-result/create`,newStudyResultDTO)
    }

    async editExistStudyResult(studyResult: Study, idMedicalHistory: number): Promise<void> {
        const newStudyResultDTO = {
            id:studyResult.id,
            name:studyResult.name,
            description:studyResult.description,
            medicalHistory:idMedicalHistory
        }

        await axios.put(`${URL_BE}/study-result/update`, newStudyResultDTO)
    }

    async deleteExistStudyResult(idStudyResult: number): Promise<void> {
        await axios.delete(`${URL_BE}/study-result/delete?idStudyResult=${idStudyResult}`)
    }
}