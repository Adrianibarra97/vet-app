import { UserLoginJSON } from '../../domain/User'
import { PETOWNER_TYPE, VET_TYPE } from '../config'
export abstract class AuthServiceInter {

	public userType: string = ''
	
	login(userLogin: UserLoginJSON): void {
		console.log(userLogin)
	}

	logout(): void {
		localStorage.clear()
	}

	async isAuthorized(): Promise<boolean> {
		return localStorage.getItem("userid__token") != null
	}

	isVet(): boolean {
		return this.userType === VET_TYPE
	}

	isOwner(): boolean {
		return this.userType === PETOWNER_TYPE
	}
}