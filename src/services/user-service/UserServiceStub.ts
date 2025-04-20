import { FilterTurn } from "../../domain/Filterturn";
import { MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift";
import { UserServiceInter } from "./UserServiceInter";

export class UserServiceStub implements UserServiceInter {
  
	constructor() {}
private objects: MedicalShiftJSON[] = [
{
	"id": 1,
	"vetName": "Dr. Jorge Lopez",
	"petName": "Nala",
	"date": "2024-10-01T10:00:00Z"
},
{
	"id": 2,
	"vetName": "Dr. Maria Garcia",
	"petName": "Oli",
	"date": "2025-02-02T11:00:00Z"
},
{
	"id": 3,
	"vetName": "Dr. Ana Perez",
	"petName": "Owie",
	"date": "2025-03-03T12:00:00Z"
},
{
	"id": 4,
	"vetName": "Dr. Juan Martinez",
	"petName": "Morena",
	"date": "2025-06-04T13:00:00Z"
},
{
	"id": 5,
	"vetName": "Dr. Laura Sanchez",
	"petName": "Pipi",
	"date": "2025-05-05T14:00:00Z"}
]

async getAll(): Promise<MedicalShift[]> {
    return this.objects.map(obj => new MedicalShift(
      obj.id,
      obj.vetName,
      obj.petName,
      obj.date
    ))
  }
  
  async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
    const data = await this.getAll()
    return data
  

  }}