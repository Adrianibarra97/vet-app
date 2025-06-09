import { VACCINE_SERVICE_USE_STUB } from "../config";
import { VaccineService } from "./VaccineService";
import { VaccineServiceInter } from "./VaccineServiceInter";
import { VaccineServiceStub } from "./VaccineServiceStub";

export class VaccineServiceManager{
    private static instance:VaccineServiceInter
    
    public static getInstance():VaccineServiceInter{
        if(!VaccineServiceManager.instance){
            VaccineServiceManager.instance = VACCINE_SERVICE_USE_STUB ? new VaccineServiceStub() : new VaccineService()
        }
        return VaccineServiceManager.instance
    }
}