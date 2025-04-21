import { FilterTurn } from "../../domain/Filterturn";
import {  MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift";
import { MedicalShiftServiceInter } from "./MedicalShiftServiceInter";

export class MedicalShiftServiceStub  implements MedicalShiftServiceInter {
  
  private objects: Array<MedicalShiftJSON> = [
    {
      "id": 1,
      "vetName": "Dr. Juan Perez",
      "petName": "Nala",
      "date": "2025-05-01T09:30"
    },
    {
      "id": 2,
      "vetName": "Dr. Maria Lopez",
      "petName": "Morena",
      "date": "2025-05-02T13:00"
    },
    {
      "id": 3,
      "vetName": "Dr. Carlos Garcia",
      "petName": "Oli",
      "date": "2025-06-03T15:45"
    },
    {
      "id": 4,
      "vetName": "Dr. Ana Martinez",
      "petName": "Pipi",
      "date": "2025-06-04T10:15"
    },
    {
      "id": 5,
      "vetName": "Dr. Laura Fernandez",
      "petName": "Napoleon",
      "date": "2025-02-05T08:00"
    }
  ]
  async getAll (): Promise<MedicalShift[]> {
    return this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) =>{
      return new MedicalShift(
        MedicalShiftDto.id,
        MedicalShiftDto.vetName,
        MedicalShiftDto.petName,
        MedicalShiftDto.date,
      )

    })}
 async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
    const data = await this.getAll()
    return data
  
  }
  cancelMedicalShift(idMedicalShift: number): void {
    this.objects = this.objects.filter((shift) => shift.id !== idMedicalShift)

}
}
