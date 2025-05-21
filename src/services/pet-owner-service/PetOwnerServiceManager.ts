import { PetOwnerService } from './PetOwnerService'
import { PetOwnerServiceStub } from './PetOwnerServiceStub'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'
import { PET_OWNER_SERVICE_USE_STUB } from '../config'

class PetOwnerServiceManager {
  private static instance: PetOwnerServiceInter

  public static getInstance(): PetOwnerServiceInter {
    if (!PetOwnerServiceManager.instance) {
      PetOwnerServiceManager.instance = PET_OWNER_SERVICE_USE_STUB ? new PetOwnerServiceStub() : new PetOwnerService()
    }
    return PetOwnerServiceManager.instance
  }
}

export default PetOwnerServiceManager
