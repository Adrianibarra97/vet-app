import { AuthServiceInter } from './AuthServiceInter'

import { UserLoginJSON, UserResponseJSON } from '../../domain/User'
import { VET_TYPE, PETOWNER_TYPE } from '../config'

export class AuthServiceStub implements AuthServiceInter {

	constructor() {}

	login(userLogin: UserLoginJSON): void {
		let userResponse: UserResponseJSON = { userLogedID: 0, typeOfUser: '' }

		if(userLogin.username === 'pepe') {
			userResponse = { userLogedID: 6, typeOfUser: 'VET' }
		} else {
			userResponse = { userLogedID: 1, typeOfUser: 'PETOWNER' }
		}
	
		localStorage.setItem("usertype__token", userResponse.typeOfUser)
		localStorage.setItem("userid__token", userResponse.userLogedID.toString())
	}

	logout(): void {
		localStorage.clear()
	}

	isAuthorized(): boolean {
		return localStorage.getItem("userid__token") != undefined
	}
	
	isVet(): boolean {
		return localStorage.getItem("usertype__token") == VET_TYPE
	}

	isOwner(): boolean {
		return localStorage.getItem("usertype__token") == PETOWNER_TYPE
	}
}