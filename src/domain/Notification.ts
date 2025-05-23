export interface NotificationResponseDTO {
  id: number
  namePet: string
  nameVet: string
  namePetOwner: string
  date: string
  hour: string
  notificationDate: string
  type: string
  subject: string
  message: string
}
export class NotificationModel {
  constructor(
    public id: number,
    public type: string,
    public message: string,
    public date: string,
    public urgent: boolean,
    public petName?: string,
    public petOwnerName?: string,
    public vetName?: string,
    public appointmentDate?: string,
  ) {}

  static fromJSON(json: NotificationResponseDTO): NotificationModel {
    const appointmentDate =
      json.date && json.hour ? `${json.date}T${json.hour}` : undefined
    const urgent = ['SHIFT_DELETE', 'SHIFT_TODAY'].includes(json.type)

    return new NotificationModel(
      json.id,
      json.type,
      json.message,
      json.notificationDate,
      urgent,
      json.namePet,
      `${json.namePetOwner}`, 
      json.nameVet,
      appointmentDate,
    )
  }

  toJSON(): NotificationResponseDTO {
    const [date, hour] = this.appointmentDate?.split('T') ?? ['', '']
    return {
      id: this.id,
      type: this.type,
      namePet: this.petName || '',
      nameVet: this.vetName || '',
      namePetOwner: this.petOwnerName || '',
      date,
      hour,
      notificationDate: this.date,
      subject: '',
      message: this.message,
    }
  }
}
