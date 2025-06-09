import { CreateUserJSON, User, UserJSON } from './User';

export type VetJSON = UserJSON & {
  licence: string;
  speciality: string;
  businessHours: string;
  professionalEmail: string;
  professionalTelephone: string;
  professionalAddress: string;
  professionalLocality: string;
  professionalPostalCode: string;
};

export type CreateVetJSON = CreateUserJSON & {
  licence: string;
  speciality: string;
  businessHours: string;
  professionalEmail: string;
  professionalTelephone: string;
  professionalAddress: string;
  professionalLocality: string;
  professionalPostalCode: string;
};

export class Vet extends User {
  constructor(
    id: number = -1,
    username: string = '',
    password: string = '',
    name: string = '',
    surname: string = '',
    dni: number = 0,
    email: string = '',
    telephone: string = '',
    photo: string = '',
    address: string = '',
    postalCode: string = '',
    locality: string = '',
    province: string = '',
    country: string = '',
    idAuthCredentials: number = -1,
    idInfoLocation:number = -1,
    public licence: string = '',
    public speciality: string = '',
    public businessHours: string = '',
    public professionalEmail: string = '',
    public professionalTelephone: string = '',
    public professionalAddress: string = '',
    public professionalLocality: string = '',
    public professionalPostalCode: string = ''
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
      'VET',
      idAuthCredentials,
      idInfoLocation
    );
  }

  toJSON(): VetJSON {
    return {
      ...super.toJSON(),
      licence: this.licence,
      speciality: this.speciality,
      businessHours: this.businessHours,
      professionalEmail: this.professionalEmail,
      professionalTelephone: this.professionalTelephone,
      professionalAddress: this.professionalAddress,
      professionalLocality: this.professionalLocality,
      professionalPostalCode: this.professionalPostalCode
    };
  }

  toCreateJSON(): CreateVetJSON {
    return {
      ...super.toCreateJSON(),
      licence: this.licence,
      speciality: this.speciality,
      businessHours: this.businessHours,
      professionalEmail: this.professionalEmail,
      professionalTelephone: this.professionalTelephone,
      professionalAddress: this.professionalAddress,
      professionalLocality: this.professionalLocality,
      professionalPostalCode: this.professionalPostalCode
    };
  }

  static fromJSON(json: VetJSON): Vet {
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
      json.idAuthCredentials,
      json.idInfoLocation,
      json.licence,
      json.speciality,
      json.businessHours,
      json.professionalEmail,
      json.professionalTelephone,
      json.professionalAddress,
      json.professionalLocality,
      json.professionalPostalCode
    );
  }
}
