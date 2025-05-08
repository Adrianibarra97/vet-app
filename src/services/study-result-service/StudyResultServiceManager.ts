import { StudyResultService } from "./StudyResultService";
import { StudyResultServiceInter } from "./StudyResultServiceInter";
import { StudyResultServiceStub } from "./StudyResultServiceStub";

export class StudyResultServiceManager{
    private static instance:StudyResultServiceInter
    private static useStub:boolean = true

    public static getInstace():StudyResultServiceInter{
        if(!StudyResultServiceManager.instance){
            StudyResultServiceManager.instance = this.useStub ? new StudyResultServiceStub() : new StudyResultService()
        }
        return StudyResultServiceManager.instance
    }
}