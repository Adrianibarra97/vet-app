import { AuthServiceInter } from './AuthServiceInter'

import { UserLogin } from '../../domain/User'

export class AuthServiceStub implements AuthServiceInter {

	constructor() {}

	login(userLogin: UserLogin): void {
		localStorage.setItem("username__token", userLogin.username)
		if(userLogin.username === 'pepe') {
			localStorage.setItem("usertype__token", 'vet')
		} else {
			localStorage.setItem("usertype__token", 'petowner')
		}
	}

	logout(): void {
		localStorage.removeItem("username__token")
	}

	isAuthorized(): boolean {
		return localStorage.getItem("username__token") != undefined
	}
	
	isVet(): boolean {
		return localStorage.getItem("usertype__token") == 'vet'
	}

	isOwner(): boolean {
		return localStorage.getItem("usertype__token") == 'petowner'
	}
}