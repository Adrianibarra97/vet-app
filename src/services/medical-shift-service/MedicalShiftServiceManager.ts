import { MEDICAL_SHIFT_SERVICE_USE_STUB } from '../config';
import { MedicalShiftService } from './MedicalShiftService';
import { MedicalShiftServiceInter } from './MedicalShiftServiceInter';
import { MedicalShiftServiceStub } from './MedicalShiftServiceStub';

class MedicalShiftServiceManager {
    private static instance: MedicalShiftServiceInter;
    static useStub: boolean = MEDICAL_SHIFT_SERVICE_USE_STUB

    public static getInstance(): MedicalShiftServiceInter {
        if (!MedicalShiftServiceManager.instance) {
            MedicalShiftServiceManager.instance = this.useStub ? new MedicalShiftServiceStub() : new MedicalShiftService()
        }
        return MedicalShiftServiceManager.instance
    }
}

export default MedicalShiftServiceManager