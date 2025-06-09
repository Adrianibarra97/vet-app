export type NotificationType =
  | 'SHIFT_DELETE'
  | 'SHIFT_UPDATE'
  | 'SHIFT_CREATE'
  | 'SHIFT_REMINDER'
  | 'SHIFT_TODAY'
  | 'appointment'
  | 'vaccine'
  | 'system'

export interface NotificationResponseDTO {
  id: number
  namePet: string
  nameVet: string
  namePetOwner: string
  date: string
  hour: string
  notificationDate: string
  type: NotificationType
  subject: string
  message: string
  professionalEmail?: string
  professionalTelephone?: string
  wasRead: boolean
}

export class NotificationModel {
  constructor(
    public id: number,
    public type: NotificationType,
    public message: string,
    public notificationDate: string,
    public urgent: boolean,
    public petName: string,
    public petOwnerName: string,
    public vetName: string,
    public date: string,
    public hour: string,
    public subject: string,
    public professionalEmail?: string,
    public professionalTelephone?: string,
    public wasRead: boolean = false
  ) {}

  static fromJSON(json: NotificationResponseDTO): NotificationModel {
    const urgent = ['SHIFT_DELETE', 'SHIFT_REMINDER'].includes(json.type)

    return new NotificationModel(
      json.id,
      json.type,
      json.message,
      json.notificationDate,
      urgent,
      json.namePet,
      json.namePetOwner,
      json.nameVet,
      json.date,
      json.hour,
      json.subject,
      json.professionalEmail ?? '',
      json.professionalTelephone ?? '',
      json.wasRead
    )
  }

  toJSON(): NotificationResponseDTO {
    return {
      id: this.id,
      type: this.type,
      namePet: this.petName,
      nameVet: this.vetName,
      namePetOwner: this.petOwnerName,
      date: this.date,
      hour: this.hour,
      notificationDate: this.notificationDate,
      subject: this.subject,
      message: this.message,
      professionalEmail: this.professionalEmail,
      professionalTelephone: this.professionalTelephone,
      wasRead: this.wasRead
    }
  }
}
