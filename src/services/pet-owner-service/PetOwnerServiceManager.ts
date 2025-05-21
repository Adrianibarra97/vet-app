import { PetOwnerService } from './PetOwnerService'
import { PetOwnerServiceStub } from './PetOwnerServiceStub'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'
import { PET_OWNER_SERVICE_USE_STUB } from '../config'

class PetOwnerServiceManager {
  private static instance: PetOwnerServiceInter
  private static useStub: boolean = PET_OWNER_SERVICE_USE_STUB

  public static getInstance(): PetOwnerServiceInter {
    if (!PetOwnerServiceManager.instance) {
      PetOwnerServiceManager.instance = this.useStub ? new PetOwnerServiceStub() : new PetOwnerService()
    }
    return PetOwnerServiceManager.instance
  }
}

export default PetOwnerServiceManager
