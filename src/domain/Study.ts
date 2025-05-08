export type StudyJSON = {
  id: number,
  name: string,
  description: string,
  medicalHistoryId?:number//Solo lo agrego para poder usar en el stub
}

export class Study {  
  constructor(
    public id: number = -1,
    public name: string = '',
    public description: string = '',
    public medicalHistoryId?:number//Solo lo agrego para poder usar en el stub
  ) {}

  static fromJSON(studyJSON:StudyJSON):Study{
    return Object.assign(new Study(),studyJSON)
    /*new Study(
      studyJSON.id,
      studyJSON.name,
      studyJSON.description
    )
    */
  }

  toJSON(): StudyJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    }
  }
}