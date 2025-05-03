import axios from "axios";
import { UserLoginJSON, UserResponseJSON } from "../../domain/User";
import { PETOWNER_TYPE, URL_BE, VET_TYPE } from "../config";
import { AuthServiceInter } from "./AuthServiceInter";

export class AuthService implements AuthServiceInter {

	constructor() {}

	async login(userLogin: UserLoginJSON): Promise<void> {
		const response: UserResponseJSON = await axios.post(`${URL_BE}/user-data/login`, userLogin)
		localStorage.setItem("usertype__token", response.typeOfUser)
		localStorage.setItem("userid__token", response.userLogedID.toString())
	}

	logout(): void {
		localStorage.clear()
	}

	isAuthorized(): boolean {
		return localStorage.getItem("userid__token") != undefined
	}
	
	isVet(): boolean {
		return localStorage.getItem("usertype__token") == VET_TYPE
	}

	isOwner(): boolean {
		return localStorage.getItem("usertype__token") == PETOWNER_TYPE
	}
}