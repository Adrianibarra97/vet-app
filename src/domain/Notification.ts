export type NotificationType = 'vaccine' | 'appointment' | 'system'

export type NotificationJSON = {
  id: number;
  namePet: string;
  nameVet: string;
  namePetOwner: string;
  date: string; 
  hour: string; 
  notificationDate: string; 
  type: string; 
};


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
    public appointmentDate?: string
  ) {}

  static fromJSON(json: NotificationJSON): NotificationModel {
    const type = json.type;
    const appointmentDate = `${json.date}T${json.hour}`;
    const message = `Notificación de tipo ${type} para ${json.namePet}`;
    const urgent = ["SHIFT_DELETE", "SHIFT_TODAY"].includes(type);

    return new NotificationModel(
      json.id,
      type,
      message,
      json.notificationDate,
      urgent,
      json.namePet,
      json.namePetOwner,
      json.nameVet,
      appointmentDate
    );
  }

  toJSON(): NotificationJSON {
    const [datePart, hourPart] = this.appointmentDate?.split("T") ?? ["", ""];
    return {
      id: this.id,
      type: this.type,
      namePet: this.petName ?? "",
      nameVet: this.vetName ?? "",
      namePetOwner: this.petOwnerName ?? "",
      date: datePart,
      hour: hourPart,
      notificationDate: this.date
    };
  }
}