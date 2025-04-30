import { UserLogin } from "../../domain/User";
import { AuthServiceInter } from "./AuthServiceInter";

export class AuthService implements AuthServiceInter {

	constructor() {}

	login(userLogin: UserLogin): void {
		console.log(userLogin)
		throw new Error("Method not implemented.");
	}

	logout(): void {
		throw new Error("Method not implemented.");
	}

	isAuthorized(): boolean {
		throw new Error("Method not implemented.");
	}
	
	isVet(): boolean {
		throw new Error("Method not implemented.");
	}

	isOwner(): boolean {
		throw new Error("Method not implemented.");
	}
}