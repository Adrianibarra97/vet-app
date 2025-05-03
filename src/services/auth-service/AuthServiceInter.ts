import { UserLoginJSON } from '../../domain/User'
export interface AuthServiceInter {
	
	login(userLogin: UserLoginJSON): void

	logout(): void

	isAuthorized(): boolean

	isVet(): boolean

	isOwner(): boolean
}