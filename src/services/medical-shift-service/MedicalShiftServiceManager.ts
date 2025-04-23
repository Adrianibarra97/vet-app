import { MedicalShiftServiceInter } from './MedicalShiftServiceInter'
import { MedicalShiftService } from './MedicalShiftService'
import { MedicalShiftServiceStub } from './MedicalShiftServiceStub'

class MedicalShiftServiceManager {
  private static instance: MedicalShiftServiceInter
  private static useStub = true // Cambiar a false cuando el backend esté disponible

  public static getInstance(): MedicalShiftServiceInter {
    if (!MedicalShiftServiceManager.instance) {
      MedicalShiftServiceManager.instance = this.useStub
        ? new MedicalShiftServiceStub()
        : new MedicalShiftService()
    }
    return MedicalShiftServiceManager.instance
  }
}

export default MedicalShiftServiceManager
