import { AuthServiceInter } from './AuthServiceInter'

import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'

export class AuthServiceStub extends AuthServiceInter {

	constructor() {
		super()
	}

	override login(authCredentialsLoginDTO: AuthCredentialsLoginDTO): void {
		let authCredentialsResponse: AuthCredentialsResponseDTO = { authCredentialsID: 0, typeOfUser: '' }

		if(authCredentialsLoginDTO.username === 'pepe') {
			authCredentialsResponse = { authCredentialsID: 6, typeOfUser: 'VET' }
		} else {
			authCredentialsResponse = { authCredentialsID: 1, typeOfUser: 'PETOWNER' }
		}
		this.userType = authCredentialsResponse.typeOfUser
		localStorage.setItem("usertype__token", authCredentialsResponse.typeOfUser)
		localStorage.setItem("userid__token", authCredentialsResponse.authCredentialsID.toString())
	}
}