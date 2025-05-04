import axios from 'axios'
import { UserLoginJSON } from '../../domain/User'
import { AuthServiceInter } from './AuthServiceInter'
import { URL_BE } from '../config';
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager';

export class AuthService extends AuthServiceInter {

	constructor() {
		super()
	}

	override async login(userLogin: UserLoginJSON): Promise<void> {
		const response = await axios.post(`${URL_BE}/user-data/login`, userLogin)
	
		if (response.data.userLogedID !== undefined && response.data.userLogedID !== null) {
			localStorage.setItem("usertype__token", response.data.typeOfUser)
			localStorage.setItem("userid__token", response.data.userLogedID.toString())
		} else {
			SnackbarUtilities.error('No se recibió ningún usuario')
		}
	}
}

export const obtenerUserID = async () => {
	await new Promise(resolve => setTimeout(resolve, 100))
    const idUsuarioLogueado = localStorage.getItem("userid__token")
    return idUsuarioLogueado && !isNaN(parseInt(idUsuarioLogueado, 10)) ? parseInt(idUsuarioLogueado, 10) : -1
};