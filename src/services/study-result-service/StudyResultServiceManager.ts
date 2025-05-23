import { STUDY_RESULT_SERVICE_USE_STUB } from "../config";
import { StudyResultService } from "./StudyResultService";
import { StudyResultServiceInter } from "./StudyResultServiceInter";
import { StudyResultServiceStub } from "./StudyResultServiceStub";

export class StudyResultServiceManager{
    private static instance:StudyResultServiceInter

    public static getInstace():StudyResultServiceInter{
        if(!StudyResultServiceManager.instance){
            StudyResultServiceManager.instance = STUDY_RESULT_SERVICE_USE_STUB ? new StudyResultServiceStub() : new StudyResultService()
        }
        return StudyResultServiceManager.instance
    }
}