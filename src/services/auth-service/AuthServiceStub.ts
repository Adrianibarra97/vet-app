import { AuthServiceInter } from './AuthServiceInter'

import { UserLogin } from '../../domain/User'

export class AuthServiceStub implements AuthServiceInter {

	private isVetStub: boolean = true

	constructor() {}

	login(userLogin: UserLogin): void {
		console.log(userLogin)
		localStorage.setItem("user__token", userLogin.toString())
	}

	logout(): void {
		localStorage.removeItem("user__token")
	}

	isAuthorized(): boolean {
		return localStorage.getItem("user__token") != undefined
	}
	
	isVet(): boolean {
		return this.isVetStub
	}

	isOwner(): boolean {
		return !this.isVetStub
	}
}