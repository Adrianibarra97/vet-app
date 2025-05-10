export type StudyJSON = {
  id: number,
  type: string,
  date:string,
  description: string,
  medicalHistoryId?:number//Solo lo agrego para poder usar en el stub
}

export class Study {  
  constructor(
    public id: number = -1,
    public type: string = '',
    public date:string = '',
    public description: string = '',
    public medicalHistoryId?:number//Solo lo agrego para poder usar en el stub
  ) {}

  static fromJSON(studyJSON:StudyJSON):Study{
    return Object.assign(new Study(),studyJSON)
  }

  toJSON(): StudyJSON {
    return {
      id: this.id,
      type: this.type,
      date:this.date,
      description: this.description
    }
  }
}