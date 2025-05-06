import { User } from "./User";

export class Vet extends User {
  constructor(
    id: number,
    username: string,
    password: string,
    name: string,
    surname: string,
    dni: number,
    email: string,
    telephone: number,
    photo: string,
    address: string,
    postalCode: string,
    locality: string,
    province: string,
    country: string,
    typeOfUser: string,
    public license: string,
    public specialty: string,
    public businessHours: string,
    public professionalEmail: string,
    public professionalTelephone: string,
    public professionalAddress: string,
    public professionalLocality: string,
    public professionalPostalCode: string
  ) {
    super(id, username, password, name, surname, dni, email, telephone, photo, address, postalCode, locality, province, country, typeOfUser);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      license: this.license,
      specialty: this.specialty,
      businessHours: this.businessHours,
      professionalEmail: this.professionalEmail,
      professionalTelephone: this.professionalTelephone,
      professionalAddress: this.professionalAddress,
      professionalLocality: this.professionalLocality,
      professionalPostalCode: this.professionalPostalCode
    }
  }

  static fromJSON(json: any): Vet {
    return new Vet(
      json.id,
      json.username,
      json.password,
      json.name,
      json.surname,
      json.dni,
      json.email,
      json.telephone,
      json.photo,
      json.address,
      json.postalCode,
      json.locality,
      json.province,
      json.country,
      json.typeOfUser,
      json.license,
      json.specialty,
      json.businessHours,
      json.professionalEmail,
      json.professionalTelephone,
      json.professionalAddress,
      json.professionalLocality,
      json.professionalPostalCode
    );
  }
}
