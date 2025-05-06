import { AuthCredentialsLoginDTO } from '../../domain/User'
import { PETOWNER_TYPE, USER_ID_TOKEN, VET_TYPE } from '../config'
export abstract class AuthServiceInter {

	public userType: string = ''
	
	login(authCredentialsLoginDTO: AuthCredentialsLoginDTO): void {
		console.log(authCredentialsLoginDTO)
	}

	logout(): void {
		localStorage.clear()
	}

	isAuthorized(): boolean {
		return localStorage.getItem(USER_ID_TOKEN) !== null
	}

	isVet(): boolean {
		return this.userType === VET_TYPE
	}

	isOwner(): boolean {
		return this.userType === PETOWNER_TYPE
	}
}