import { VaccineService } from "./VaccineService";
import { VaccineServiceInter } from "./VaccineServiceInter";
import { VaccineServiceStub } from "./VaccineServiceStub";

export class VaccineServiceManager{
    private static instance:VaccineServiceInter
    private static useStub:boolean = false

    public static getInstance():VaccineServiceInter{
        if(!VaccineServiceManager.instance){
            VaccineServiceManager.instance = this.useStub ? new VaccineServiceStub() : new VaccineService()
        }
        return VaccineServiceManager.instance
    }
}