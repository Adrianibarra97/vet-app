import { PetServiceInter } from './PetServiceInter'
import { PetService } from './PetService'
import { PetServiceStub } from './PetServiceStub'
import { PET_SERVICE_USE_STUB } from '../config'

class PetServiceManager {
  private static instance: PetServiceInter

  public static getIntance(): PetServiceInter {
    if (!PetServiceManager.instance) {
      PetServiceManager.instance = PET_SERVICE_USE_STUB
        ? new PetServiceStub()
        : new PetService()
    }
    return PetServiceManager.instance
  }
}

export default PetServiceManager