import { AuthService } from "./AuthService"
import { AuthServiceInter } from "./AuthServiceInter"
import { AuthServiceStub } from "./AuthServiceStub"

class AuthServiceManager {

  private static instance: AuthServiceInter
	private static useStub: boolean = false

	public static getIntance(): AuthServiceInter {
		if(!AuthServiceManager.instance) {
			AuthServiceManager.instance = this.useStub ? new AuthServiceStub() : new AuthService()
		}
		return AuthServiceManager.instance
	}
}

export default AuthServiceManager