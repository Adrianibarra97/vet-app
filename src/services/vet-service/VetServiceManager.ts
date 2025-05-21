import { VetService } from './VetService'
import { VetServiceStub } from './VetServiceStub'
import { VetServiceInter } from './VetServiceInter'
import { VET_SERVICE_USE_STUB } from '../config'

class VetServiceManager {
  private static instance: VetServiceInter

  public static getInstance(): VetServiceInter{
    if (!VetServiceManager.instance) {
      VetServiceManager.instance = VET_SERVICE_USE_STUB ? new VetServiceStub() : new VetService()
    }
    return VetServiceManager.instance
  }
}

export default VetServiceManager
