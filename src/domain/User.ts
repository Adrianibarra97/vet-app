export type UserLoginJSON = {
	username: string,
	password: string
}

export type UserResponseJSON = {
	userLogedID: number,
	typeOfUser: string
}

export type UserJSON = {
	id: number,
	dni: number,
	name: string,
	surname: string,
	email: string,
	telephone: number,
	adress: string,
	username: string,
	landline: string,
	typeOfUser: string,
	photo: string,
	password: string,
	location: string,
	province: string,
	postalCode: string
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
		public landline: string,
		public typeOfUser: string,
		public photo: string,
		public password: string,
		public location: string,
		public province: string,
		public postalCode: string
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
			landline: this.landline,
			typeOfUser: this.typeOfUser,
			photo: this.photo,
			password: this.password,
			location: this.location,
			province: this.province,
			postalCode: this.postalCode
		}
	}
}