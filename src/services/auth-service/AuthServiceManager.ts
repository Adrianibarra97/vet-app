import { AUTH_SERVICE_USE_STUB } from "../config"
import { AuthService } from "./AuthService"
import { AuthServiceInter } from "./AuthServiceInter"
import { AuthServiceStub } from "./AuthServiceStub"

class AuthServiceManager {

    private static instance: AuthServiceInter
	private static useStub: boolean = AUTH_SERVICE_USE_STUB

	public static getIntance(): AuthServiceInter {
		if(!AuthServiceManager.instance) {
			AuthServiceManager.instance = this.useStub ? new AuthServiceStub() : new AuthService()
		}
		return AuthServiceManager.instance
	}
}

export default AuthServiceManager