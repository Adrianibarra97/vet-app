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
    type: string,
    public licence: string,
    public specialty: string,
    public businessHours: string,
    public professionalEmail: string,
    public professionalAdress: string,
    public professionalTelephone: string,
    photoUrl?: string
  ) {
    super(id, dni, name, surname, email, telephone, adress, username, landline, type,  photoUrl)
  }

  toJSON() {
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
      photoUrl: this.photoUrl,
      type: this.typeOfUser,
      licence: this.licence,
      specialty: this.specialty,
      businessHours: this.businessHours,
      professionalEmail: this.professionalEmail,
      professionalAdress: this.professionalAdress,
      professionalTelephone: this.professionalTelephone
    }
  }

  static fromJSON(json: any): Vet {
    return new Vet(
      json.id, json.dni, json.name, json.surname, json.email, json.telephone,
      json.professionalAdress, json.username, json.professionalTelephone,
      json.licence, json.specialty, json.businessHours, json.professionalEmail,
      json.professionalAdress, json.professionalTelephone,
      json.photoUrl
    )
  }
}
