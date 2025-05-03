import { AuthServiceInter } from './AuthServiceInter'

import { UserLogin } from '../../domain/User'
import { VET_TYPE, OWNER_TYPE } from '../config'

export class AuthServiceStub implements AuthServiceInter {

	constructor() {}

	login(userLogin: UserLogin): void {
		localStorage.setItem("username__token", userLogin.username)
		if(userLogin.username === 'pepe') {
			localStorage.setItem("usertype__token", 'VET')
		} else {
			localStorage.setItem("usertype__token", 'PETOWNER')
		}
	}

	logout(): void {
		localStorage.removeItem("username__token")
	}

	isAuthorized(): boolean {
		return localStorage.getItem("username__token") != undefined
	}
	
	isVet(): boolean {
		return localStorage.getItem("usertype__token") == VET_TYPE
	}

	isOwner(): boolean {
		return localStorage.getItem("usertype__token") == OWNER_TYPE
	}
}