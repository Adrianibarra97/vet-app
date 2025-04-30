import { PetOwnerService } from './PetOwnerService'
import { PetOwnerServiceStub } from './PetOwnerServiceStub'
import { PetOwnerServiceInter } from './PetOwnerServiceInter'

class PetOwnerServiceManager {
  private static instance: PetOwnerServiceInter
  private static useStub: boolean = false

  public static getInstance(): PetOwnerServiceInter {
    if (!PetOwnerServiceManager.instance) {
      PetOwnerServiceManager.instance = this.useStub ? new PetOwnerServiceStub() : new PetOwnerService()
    }
    return PetOwnerServiceManager.instance
  }
}

export default PetOwnerServiceManager
