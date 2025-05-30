import axios from 'axios'
import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO, ValidAuthCredentialsDTO } from '../../domain/User'
import { AuthServiceInter } from './AuthServiceInter'
import { URL_BE, USER_ID_TOKEN, USER_TYPE_TOKEN } from '../config';

export class AuthService extends AuthServiceInter {

	constructor() {
		super()
	}

	override async login(authCredentialsLoginDTO: AuthCredentialsLoginDTO) {
		const response = await axios.post<AuthCredentialsResponseDTO>(`${URL_BE}/auth-credentials/login`, authCredentialsLoginDTO)
		localStorage.setItem(USER_ID_TOKEN, response.data.authCredentialsID.toString())
		localStorage.setItem(USER_TYPE_TOKEN, response.data.typeOfUser)
	}

	override async existUser(authCredentialsLoginDTO: AuthCredentialsLoginDTO) {
		const validAuthCreditialDTO = await axios.post<ValidAuthCredentialsDTO>(`${URL_BE}/auth-credentials/reset-password?username=${authCredentialsLoginDTO.username}`)
		localStorage.setItem('user__name', authCredentialsLoginDTO.username)
		localStorage.setItem(USER_ID_TOKEN, validAuthCreditialDTO.data.id.toString())
		localStorage.setItem('valid__code', validAuthCreditialDTO.data.validCode)
		return validAuthCreditialDTO.data.validCode !== ''
	}

	override async changePassword(password: string): Promise<void> {
		await axios.put(
			`${URL_BE}/auth-credentials/update-password?newPassword=${password}&idAuthCredentials=${getUserID()}`
		)
		localStorage.clear()
	}
}

export const getUserID = () => {
    const idUsuarioLogueado = localStorage.getItem(USER_ID_TOKEN)
    return idUsuarioLogueado && !isNaN(parseInt(idUsuarioLogueado, 10)) ? parseInt(idUsuarioLogueado, 10) : -1
}