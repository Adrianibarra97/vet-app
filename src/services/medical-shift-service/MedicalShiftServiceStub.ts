
import dayjs from "dayjs";
import { FilterTurn } from "../../domain/Filterturn";
import {  MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift";
import { MedicalShiftServiceInter } from "./MedicalShiftServiceInter";

export class MedicalShiftServiceStub implements MedicalShiftServiceInter {
  
  private objects: Array<MedicalShiftJSON> = [
    {
      "id": 1,
      "nameVet": "Dr. Juan Perez",
      "petMedicalShift": {
        "id": 1,
        "name":"Nala"
      },
      "date": "2025-04-25",
      "hour": "18:30"
    },
    {
      "id": 2,
      "nameVet": "Dr. Maria Lopez",
      "petMedicalShift":{
        "id":2,
        "name":"Morena"
      },
      "date": "2025-04-23",
      "hour": "13:00"
    },
    {
      "id": 3,
      "nameVet": "Dr. Carlos Garcia",
      "petMedicalShift": {
        "id":3,
        "name":"Oli"
      },
      "date": "2025-06-03",
      "hour": "15:45"
    },
    {
      "id": 4,
      "nameVet": "Dr. Ana Martinez",
      "petMedicalShift": {
        "id":4,
        "name":"Pipi"
      },
      "date": "2025-06-04",
      "hour":"10:15"
    },
    {
      "id": 5,
      "nameVet": "Dr. Laura Fernandez",
      "petMedicalShift": {
        "id":5,
        "name":"Napoleon"
      },
      "date": "2025-02-05",
      "hour": "08:00"
    }
  ]

  async getAll(): Promise<MedicalShift[]> {
    return this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) => MedicalShift.fromJSON(MedicalShiftDto))
  }

  async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
    const convertirFecha = (fechaString: string) => {
      return dayjs(fechaString).format('DD/MM/YYYY')
    }
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()); // domingo
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // sábado
  
  const medicalShifts = this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) => MedicalShift.fromJSON(MedicalShiftDto))
    if(filter.day !== '' && filter.today === true && filter.thisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.day)  && convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.day !== '' && filter.today === true && filter.thisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.day) && convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()))
    }
    if(filter.day !== '' && filter.today === false && filter.thisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.day) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.day !== '' && filter.today === false && filter.thisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.day))
    }
    if(filter.day === '' && filter.today === true && filter.thisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.day === '' && filter.today === true && filter.thisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()))
    }
    if(filter.day === '' && filter.today === false && filter.thisWeek === true) {
      return medicalShifts.filter((medicalShift) => (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    return medicalShifts
  }

  async cancelMedicalShift(idMedicalShift: number): Promise<void> {
    this.objects = this.objects.filter((shift) => shift.id !== idMedicalShift)
  }

  async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
    const medicalShiftDto: MedicalShiftJSON = this.objects[idMedicalShift - 1]
    return MedicalShift.fromJSON(medicalShiftDto)
  }

  async editExistMedicalShift(medicalShift: MedicalShift): Promise<void> {
    const index = this.objects.findIndex(shift => shift.id === medicalShift.id);
    if (index === -1) {
      throw new Error(`No se encontró un turno con el ID ${medicalShift.id}`);
    }
    this.objects[index] = {
      ...this.objects[index],
      ...medicalShift,
      id: medicalShift.id
    }
  }
  
  async createNewMedicalShift(medicalShift: MedicalShift): Promise<void> {
    const newId = this.objects.length > 0
      ? Math.max(...this.objects.map(shift => shift.id)) + 1
      : 1
    const newMedicalShift: MedicalShiftJSON = {
      ...medicalShift,
      id: newId
    }
    this.objects.push(newMedicalShift);
  }    
}
