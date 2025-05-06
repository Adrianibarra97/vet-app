import { AuthServiceInter } from './AuthServiceInter'

import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import { USER_ID_TOKEN, USER_TYPE_TOKEN } from '../config'

export class AuthServiceStub extends AuthServiceInter {

	constructor() {
		super()
	}

	override login(authCredentialsLoginDTO: AuthCredentialsLoginDTO): void {
		let authCredentialsResponse: AuthCredentialsResponseDTO = { authCredentialsID: 0, typeOfUser: "" }

		if(authCredentialsLoginDTO.username === 'pepe') {
			authCredentialsResponse = { authCredentialsID: 6, typeOfUser: "VET" }
		} else {
			authCredentialsResponse = { authCredentialsID: 1, typeOfUser: "PETOWNER" }
		}
		this.userType = authCredentialsResponse.typeOfUser
		localStorage.setItem(USER_TYPE_TOKEN, authCredentialsResponse.typeOfUser)
		localStorage.setItem(USER_ID_TOKEN, authCredentialsResponse.authCredentialsID.toString())
	}
}