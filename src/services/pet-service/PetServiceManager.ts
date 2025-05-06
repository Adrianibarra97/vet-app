import { PetServiceInter } from './PetServiceInter'
import { PetService } from './PetService'
import { PetServiceStub } from './PetServiceStub'

class PetServiceManager {

	private static instance: PetServiceInter
	private static useStub: boolean = false

	public static getIntance(): PetServiceInter {
		if(!PetServiceManager.instance) {
			PetServiceManager.instance = this.useStub ? new PetServiceStub() : new PetService
		}
		return PetServiceManager.instance
	}
}

export default PetServiceManager