import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import { PETOWNER_TYPE, USER_TYPE_TOKEN, VET_TYPE } from '../config'
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

	isAuthorized() {
		const userId: number = getUserID()
		return  userId !== -1
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

	async existUser(authCredentialsLoginDTO: AuthCredentialsLoginDTO): Promise<boolean> {
		console.log(authCredentialsLoginDTO)
		return false
	}

	async validCode(code: string): Promise<boolean> {
		const validCode: string | null = localStorage.getItem('valid__code')
		return code === validCode
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