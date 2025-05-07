import { DiseaseService } from "./DiseaseService";
import { DiseaseServiceInter } from "./DiseaseServiceInter";
import { DiseaseServiceStub } from "./DiseaseServiceStub";

export class DiseaseServiceManager{
    private static instance: DiseaseServiceInter
    private static useStub: boolean = true

    public static getInstance():DiseaseServiceInter{
        if(!DiseaseServiceManager.instance){
            DiseaseServiceManager.instance = this.useStub ? new DiseaseServiceStub() : new DiseaseService()
        }
        return DiseaseServiceManager.instance
    }
}

