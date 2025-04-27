import { User } from "./User"

export class Vet extends User {
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
    photoUrl?: string
  ) {
    super(id, dni, name, surname, email, telephone, adress, username, landline, photoUrl)
  }
}
