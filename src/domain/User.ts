export type AuthCredentialsLoginDTO = {
	username: string,
	password: string
}

export type AuthCredentialsResponseDTO = {
	authCredentialsID: number,
	typeOfUser: string
}

export type UserJSON = {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  dni: number;
  email: string;
  telephone: string;
  photo: string;
  address: string;
  postalCode: string;
  locality: string;
  province: string;
  country: string;
  typeOfUser: string;
  idAuthCredentials: number;
};

export type CreateUserJSON = {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  dni: number;
  email: string;
  telephone: string;
  photo: string;
  address: string;
  postalCode: string;
  locality: string;
  province: string;
  country: string;
  idAuthCredentials: number;
};

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public name: string,
    public surname: string,
    public dni: number,
    public email: string,
    public telephone: string,
    public photo: string,
    public address: string,
    public postalCode: string,
    public locality: string,
    public province: string,
    public country: string,
    public typeOfUser: string,
    public idAuthCredentials: number
  ) {}

  toJSON(): UserJSON {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      dni: this.dni,
      email: this.email,
      telephone: this.telephone,
      photo: this.photo,
      address: this.address,
      postalCode: this.postalCode,
      locality: this.locality,
      province: this.province,
      country: this.country,
      typeOfUser: this.typeOfUser,
      idAuthCredentials: this.idAuthCredentials
    };
  }

  toCreateJSON(): CreateUserJSON {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      dni: this.dni,
      email: this.email,
      telephone: this.telephone,
      photo: this.photo,
      address: this.address,
      postalCode: this.postalCode,
      locality: this.locality,
      province: this.province,
      country: this.country,
      idAuthCredentials: this.idAuthCredentials
    }
  }
}