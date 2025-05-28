import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import { PETOWNER_TYPE, USER_ID_TOKEN, USER_TYPE_TOKEN, VET_TYPE } from '../config'
import { getUserID } from './AuthService'
export abstract class AuthServiceInter {
	
	login(authCredentialsLoginDTO: AuthCredentialsLoginDTO): void {
		console.log(authCredentialsLoginDTO)
	}

	addSystemUser(systemUser: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO]) {
		console.log(systemUser)
	}

	logout(): void {
		localStorage.clear()
	}

	async isAuthorized() {
		const userId: string | null = localStorage.getItem(USER_ID_TOKEN)
		return  userId !== null
	}

	isVet(): boolean {
		const type: string | null = localStorage.getItem(USER_TYPE_TOKEN)
		return type === VET_TYPE
	}

	isOwner(): boolean {
		const type: string | null = localStorage.getItem(USER_TYPE_TOKEN)
		return type === PETOWNER_TYPE
	}

	searchUserWithLogin(authCredentialsLoginDTO: AuthCredentialsLoginDTO): AuthCredentialsResponseDTO | null {
		console.log(authCredentialsLoginDTO)
		return { authCredentialsID: -1, typeOfUser: '' }
	}

	existUser(authCredentialsLoginDTO: AuthCredentialsLoginDTO): boolean {
		console.log(authCredentialsLoginDTO)
		return false
	}

	async validCode(code: string): Promise<boolean> {
		console.log(code)
		return false
	}

	validNewPassword(password: string, confirmPassword: string): boolean {
		return !password || !confirmPassword || password != confirmPassword
	}

	async changePassword(password: string): Promise<void> {
		throw Error('Hubo problemas al setear la contraseña: ' + password)
	}

	cancelResetPassword(): void {
		localStorage.clear()
	}
}