export type StudyJSON = {
  id: number,
  name: string,
  description: string
}

export class Study {
    
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {}

  toJSON(): StudyJSON {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    }
  }
}