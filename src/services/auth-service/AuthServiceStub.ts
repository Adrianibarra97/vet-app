import { AuthServiceInter } from './AuthServiceInter'

import { UserLoginJSON, UserResponseJSON } from '../../domain/User'

export class AuthServiceStub extends AuthServiceInter {

	constructor() {
		super()
	}

	override login(userLogin: UserLoginJSON): void {
		let userResponse: UserResponseJSON = { userLogedID: 0, typeOfUser: '' }

		if(userLogin.username === 'pepe') {
			userResponse = { userLogedID: 6, typeOfUser: 'VET' }
		} else {
			userResponse = { userLogedID: 1, typeOfUser: 'PETOWNER' }
		}
		this.userType = userResponse.typeOfUser
		localStorage.setItem("usertype__token", userResponse.typeOfUser)
		localStorage.setItem("userid__token", userResponse.userLogedID.toString())
	}
}