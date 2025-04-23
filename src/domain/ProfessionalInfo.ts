export type ProfessionalInfoJSON = {
    license: string
    workPhone: string
    specialty: string
    workAdress: string
    professionalEmail: string
    attentionSchedule: string
  }
  
  export class ProfessionalInfo {
    constructor(
      public license: string,
      public workPhone: string,
      public specialty: string,
      public workAdress: string,
      public professionalEmail: string,
      public attentionSchedule: string
    ) {}
  
    toJSON(): ProfessionalInfoJSON {
      return {
        license: this.license,
        workPhone: this.workPhone,
        specialty: this.specialty,
        workAdress: this.workAdress,
        professionalEmail: this.professionalEmail,
        attentionSchedule: this.attentionSchedule
      }
    }
  }
  