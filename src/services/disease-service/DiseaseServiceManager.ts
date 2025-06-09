import { DISEASE_SERVICE_USE_STUB } from "../config";
import { DiseaseService } from "./DiseaseService";
import { DiseaseServiceInter } from "./DiseaseServiceInter";
import { DiseaseServiceStub } from "./DiseaseServiceStub";

export class DiseaseServiceManager{
    private static instance: DiseaseServiceInter

    public static getInstance():DiseaseServiceInter{
        if(!DiseaseServiceManager.instance){
            DiseaseServiceManager.instance = DISEASE_SERVICE_USE_STUB ? new DiseaseServiceStub() : new DiseaseService()
        }
        return DiseaseServiceManager.instance
    }
}

