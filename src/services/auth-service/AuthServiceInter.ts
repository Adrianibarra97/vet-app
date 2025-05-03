import { UserLoginJSON } from '../../domain/User'
export interface AuthServiceInter {
	
	login(userLogin: UserLoginJSON): void

	logout(): void

	isAuthorized(): Promise <boolean> 

	isVet(): Promise <boolean>

	isOwner(): Promise <boolean>
}