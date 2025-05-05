import { MedicalShiftService } from './MedicalShiftService';
import { MedicalShiftServiceInter } from './MedicalShiftServiceInter';
import { MedicalShiftServiceStub } from './MedicalShiftServiceStub';

class MedicalShiftServiceManager {

    private static instance: MedicalShiftServiceInter;
    private static useStub: boolean = true

    public static getInstance(): MedicalShiftServiceInter {
        if (!MedicalShiftServiceManager.instance) {
            MedicalShiftServiceManager.instance = this.useStub ? new MedicalShiftServiceStub() : new MedicalShiftService()
        }
        return MedicalShiftServiceManager.instance
    }
}

export default MedicalShiftServiceManager