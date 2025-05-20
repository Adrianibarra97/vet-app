import { VetService } from './VetService'
import { VetServiceStub } from './VetServiceStub'
import { VetServiceInter } from './VetServiceInter'

class VetServiceManager {
  private static instance: VetServiceInter
  private static useStub: boolean = true

  public static getInstance(): VetServiceInter{
    if (!VetServiceManager.instance) {
      VetServiceManager.instance = this.useStub ? new VetServiceStub() : new VetService()
    }
    return VetServiceManager.instance
  }
}

export default VetServiceManager
