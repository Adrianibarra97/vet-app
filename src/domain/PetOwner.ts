import { User } from './User'

export class PetOwner extends User {
  constructor(
    id: number,
    username: string,
    password: string,
    name: string,
    surname: string,
    dni: number,
    email: string,
    telephone: string,
    photo: string,
    address: string,
    postalCode: string,
    locality: string,
    province: string,
    country: string,
    idAuthCredentials: number,
    public emergencyContactName: string,
    public emergencyContactPhone: string,
  ) {
    super(
      id,
      username,
      password,
      name,
      surname,
      dni,
      email,
      telephone,
      photo,
      address,
      postalCode,
      locality,
      province,
      country,
      'petOwner',
      idAuthCredentials,
    )
  }

  toJSON() {
    return {
      ...super.toJSON(),

      emergencyContactName: this.emergencyContactName,
      emergencyContactPhone: this.emergencyContactPhone,
    }
  }

  static fromJSON(json: any): PetOwner {
    return new PetOwner(
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
      json.idAuthCredentials,
      json.emergencyContactName,
      json.emergencyContactPhone,
    )
  }
}
