import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
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

	searchUserWithLogin(authCredentialsLoginDTO: AuthCredentialsLoginDTO): AuthCredentialsResponseDTO | null {
		return { authCredentialsID: -1, typeOfUser: '' }
	}

	existUser(authCredentialsLoginDTO: AuthCredentialsLoginDTO): boolean {
		return false
	}

	async validCode(code: string): Promise<boolean> {
		return false
	}

	validNewPassword(password: string, confirmPassword: string): boolean {
		return !password || !confirmPassword || password != confirmPassword
	}

	async changePassword(password: string): Promise<void> {
		throw Error('Hubo problemas al setear la contraseña: ' + password)
	}
}