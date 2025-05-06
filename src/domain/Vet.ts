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
    typeOfUser: string,
    photo: string,
    password: string,
    location: string,
    province: string,
    postalCode: string,
    public licence: string,
    public specialty: string,
    public businessHours: string,
    public professionalEmail: string,
    public professionalAdress: string,
    public professionalTelephone: string,
    public professionalLocation: string,
    public professionalProvince: string
  ) {
    super(id, dni, name, surname, email, telephone, adress, username, landline, typeOfUser, photo, password, location, province, postalCode)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      licence: this.licence,
      specialty: this.specialty,
      businessHours: this.businessHours,
      professionalEmail: this.professionalEmail,
      professionalAdress: this.professionalAdress,
      professionalTelephone: this.professionalTelephone,
      professionalLocation: this.professionalLocation,
      professionalProvince: this.professionalProvince
    }
  }

  static fromJSON(json: any): Vet {
    return new Vet(
      json.id, json.dni, json.name, json.surname, json.email, json.telephone,
      json.adress, json.username, json.landline, json.typeOfUser, json.photo,
      json.password, json.location, json.province, json.postalCode,
      json.licence, json.specialty, json.businessHours, json.professionalEmail,
      json.professionalAdress, json.professionalTelephone, json.professionalLocation, json.professionalProvince
    )
  }
}
