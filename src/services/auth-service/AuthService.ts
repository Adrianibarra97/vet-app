import axios from 'axios'
import { AuthCredentialsLoginDTO, AuthCredentialsResponseDTO } from '../../domain/User'
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
		this.userType = localStorage.getItem(USER_TYPE_TOKEN)!
	}

	

}

export const getUserID = () => {
    const idUsuarioLogueado = localStorage.getItem(USER_ID_TOKEN)
    return idUsuarioLogueado && !isNaN(parseInt(idUsuarioLogueado, 10)) ? parseInt(idUsuarioLogueado, 10) : -1
};