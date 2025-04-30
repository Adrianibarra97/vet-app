import { UserLogin } from '../../domain/User'
export interface AuthServiceInter {
	
	login(userLogin: UserLogin): void

	logout(): void

	isAuthorized(): boolean

	isAdmin(): boolean
}