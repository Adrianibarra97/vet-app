export type NotificationType = 'vaccine' | 'appointment' | 'system'

export type NotificationJSON = {
  id: number
  type: NotificationType
  message: string
  date: string
  urgent: boolean
  petName?: string
  petOwnerName?: string
  vetName?: string
  appointmentDate?: string
}

export class NotificationModel {
  constructor(
    public id: number,
    public type: NotificationType,
    public message: string,
    public date: string,
    public urgent: boolean,
    public petName?: string,
    public petOwnerName?: string,
    public vetName?: string,
    public vetEmail?: string,
    public appointmentDate?: string,
  ) {}

  static fromJSON(json: NotificationJSON): NotificationModel {
    return new NotificationModel(
      json.id,
      json.type,
      json.message,
      json.date,
      json.urgent,
      json.petName,
      json.petOwnerName,
      json.vetName,
      json.vetName,
      json.appointmentDate,
    )
  }

  toJSON(): NotificationJSON {
    return {
      id: this.id,
      type: this.type,
      message: this.message,
      date: this.date,
      urgent: this.urgent,
      petName: this.petName,
      petOwnerName: this.petOwnerName,
      vetName: this.vetName,
      appointmentDate: this.appointmentDate,
    }
  }
}
