import { AUTH_SERVICE_USE_STUB } from "../config"
import { AuthService } from "./AuthService"
import { AuthServiceInter } from "./AuthServiceInter"
import { AuthServiceStub } from "./AuthServiceStub"

class AuthServiceManager {

  private static instance: AuthServiceInter

	public static getIntance(): AuthServiceInter {
		if(!AuthServiceManager.instance) {
			AuthServiceManager.instance = AUTH_SERVICE_USE_STUB ? new AuthServiceStub() : new AuthService()
		}
		return AuthServiceManager.instance
	}
}

export default AuthServiceManager