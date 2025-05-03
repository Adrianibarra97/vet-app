import axios from "axios";
import { UserLoginJSON } from "../../domain/User";
import { PETOWNER_TYPE, URL_BE, VET_TYPE } from "../config";
import { AuthServiceInter } from "./AuthServiceInter";

export class AuthService implements AuthServiceInter {

	constructor() {}


	async login(userLogin: UserLoginJSON): Promise<void> {
		const response = await axios.post(`${URL_BE}/user-data/login`, userLogin)
		localStorage.setItem("usertype__token", response.data.typeOfUser)
		localStorage.setItem("userid__token", response.data.userLogedID.toString())
	}

	logout(): void {
		localStorage.clear()
	}

	async isAuthorized(): Promise<boolean> {
		console.log(localStorage.getItem("userid__token") != null )
		return localStorage.getItem("userid__token") != null
	}
	
	
	async isVet(): Promise<boolean> {
		return localStorage.getItem("usertype__token") === VET_TYPE
	}

	async isOwner(): Promise<boolean> {
		return localStorage.getItem("usertype__token") === PETOWNER_TYPE
	}

}


export const obtenerUserID = async () => {
	const idUsuarioLogueado = localStorage.getItem('userid__token')
	return idUsuarioLogueado ? + idUsuarioLogueado:-1
}