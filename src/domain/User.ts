export type UserJSON = {
	id: number,
	dni: number,
	name: string,
	surname: string,
	email: string,
	telephone: number,
	adress: string,
	username: string,
	landline: string
}

export class User {
    
	constructor(
		public id: number,
		public dni: number,
		public name: string,
		public surname: string,
		public email: string,
		public telephone: number,
		public adress: string,
		public username: string,
		public landline: string
	) {}

	toJSON(): UserJSON {
		return {
			id: this.id,
			dni: this.dni,
			name: this.name,
			surname: this.surname,
			email: this.email,
			telephone: this.telephone,
			adress: this.adress,
			username: this.username,
			landline: this.landline
		}
	}
}