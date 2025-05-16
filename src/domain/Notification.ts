export type NotificationJSON = {
  type: 'vaccine' | 'appointment'
  message: string
  date: string
  urgent: boolean
}

export class NotificationModel {
  constructor(
    public type: 'vaccine' | 'appointment',
    public message: string,
    public date: string,
    public urgent: boolean = false,
  ) {}

  static fromJSON(json: NotificationJSON): NotificationModel {
    return new NotificationModel(
      json.type,
      json.message,
      json.date,
      json.urgent,
    )
  }

  toJSON(): NotificationJSON {
    return {
      type: this.type,
      message: this.message,
      date: this.date,
      urgent: this.urgent,
    }
  }
}
