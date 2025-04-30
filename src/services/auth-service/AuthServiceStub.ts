import { UserLogin } from "../../domain/User";
import { AuthServiceInter } from "./AuthServiceInter";

export class AuthServiceStub implements AuthServiceInter {

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
	
	isAdmin(): boolean {
		throw new Error("Method not implemented.");
	}
}