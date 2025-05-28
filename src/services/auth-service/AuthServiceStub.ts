import { AuthServiceInter } from './AuthServiceInter'

import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
import { USER_ID_TOKEN, USER_TYPE_TOKEN } from '../config'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

export class AuthServiceStub extends AuthServiceInter {

	private systemUsers: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO][] = [
		[{ username: 'Eche', password: '1234' }, { authCredentialsID: 1, typeOfUser: "PETOWNER" }],
		[{ username: 'Caro', password: '1234' }, { authCredentialsID: 2, typeOfUser: "PETOWNER" }],
		[{ username: 'Tami', password: '1234' }, { authCredentialsID: 3, typeOfUser: "PETOWNER" }],
		[{ username: 'LuckR', password: '1234' }, { authCredentialsID: 4, typeOfUser: "PETOWNER" }],
		[{ username: 'Adrian', password: '123' }, { authCredentialsID: 5, typeOfUser: "VET" }],
		[{ username: 'LuckC', password: '123' }, { authCredentialsID: 6, typeOfUser: "VET" }]
	]

	constructor() { super() }

	override login(authCredentialsLoginDTO: AuthCredentialsLoginDTO): void {
		const authCredentialsResponse: AuthCredentialsResponseDTO | null = this.searchUserWithLogin(authCredentialsLoginDTO)

		if(authCredentialsResponse) {
			localStorage.setItem(USER_TYPE_TOKEN, authCredentialsResponse.typeOfUser)
			localStorage.setItem(USER_ID_TOKEN, authCredentialsResponse.authCredentialsID.toString())
		} else {
			SnackbarUtilities.error('Los datos ingresados son incorrectos!')
		}
	}

	override addSystemUser(systemUser: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO]): void {
		this.systemUsers.push(systemUser)
	}

	override searchUserWithLogin(authCredentialsLoginDTO: AuthCredentialsLoginDTO): AuthCredentialsResponseDTO | null {
		const user: [AuthCredentialsLoginDTO, AuthCredentialsResponseDTO] = (this.systemUsers.filter((user): boolean =>
			user[0].username == authCredentialsLoginDTO.username &&
			user[0].password == authCredentialsLoginDTO.password
		))[0]
		return user ? user[1] : null
	}

	override existUser(authCredentialsLoginDTO: AuthCredentialsLoginDTO): boolean {
		localStorage.setItem('user__name', authCredentialsLoginDTO.username)
		localStorage.setItem('valid__code', '231231asdadsaDDSSS')
		return this.systemUsers.some(user => user[0].username === authCredentialsLoginDTO.username)
	}

	override async validCode(code: string): Promise<boolean> {
		const validCode: string | null = localStorage.getItem('valid__code')
		return code.toString() === validCode
	}

	override async changePassword(password: string): Promise<void> {
		let flag: boolean = false
		const username: string | null = localStorage.getItem('user__name')
		this.systemUsers.forEach(user => {
			if(user[0].username === username) {
				user[0].password = password
				flag = true
			}
		})
		localStorage.clear()
		if(!flag) {
			throw Error('Algo salió mal')
		}
	}
}