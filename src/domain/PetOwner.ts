import { User } from "./User"

export class PetOwner extends User {
  constructor(
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
  ) {
    super(id, dni, name, surname, email, telephone, adress, username, landline, typeOfUser, photo, password, location, province, postalCode)
  }

  static fromJSON(json: any): PetOwner {
    return new PetOwner(
      json.id, json.dni, json.name, json.surname,
      json.email, json.telephone, json.adress,
      json.username, json.landline, json.typeOfUser,
      json.photo, json.password, json.location, json.province, json.postalCode
    )
  }

  toJSON(): any {
    return super.toJSON()
  }
}
