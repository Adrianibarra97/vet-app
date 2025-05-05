import { User } from './User'

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
    photo: string
  ) {
    super(id, dni, name, surname, email, telephone, adress, username, landline, 'type', photo)
  }

  static fromJSON(json: any): PetOwner {
    return new PetOwner(
      json.id, json.dni, json.name, json.surname,
      json.email, json.telephone, json.address,
      json.username, json.landline, json.photo
    )
  }

  toJSON(): any {
    return super.toJSON()
  }
}
