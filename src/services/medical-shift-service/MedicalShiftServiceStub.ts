import dayjs from "dayjs";
import { FilterTurn } from "../../domain/Filterturn";
import {  MedicalShift, MedicalShiftJSON } from "../../domain/MedicalShift";
import { MedicalShiftServiceInter } from "./MedicalShiftServiceInter";

export class MedicalShiftServiceStub implements MedicalShiftServiceInter {
  
  private objects: Array<MedicalShiftJSON> = [
    {
      "id": 1,
      "vetName": "Dr. Juan Perez",
      "petName": "Nala",
      "date": "2025-04-20T09:30"
    },
    {
      "id": 2,
      "vetName": "Dr. Maria Lopez",
      "petName": "Morena",
      "date": "2025-04-22T13:00"
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
    return this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) => {
      return new MedicalShift(
        MedicalShiftDto.id,
        MedicalShiftDto.vetName,
        MedicalShiftDto.petName,
        MedicalShiftDto.date,
      )
    })
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
  
  const medicalShifts = this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) =>{
    return new MedicalShift(
        MedicalShiftDto.id,
        MedicalShiftDto.vetName,
        MedicalShiftDto.petName,
        MedicalShiftDto.date,
      )
    })
    if(filter.date !== '' && filter.isToday === true && filter.isThisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.date)  && convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.date !== '' && filter.isToday === true && filter.isThisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.date) && convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()))
    }
    if(filter.date !== '' && filter.isToday === false && filter.isThisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.date) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.date !== '' && filter.isToday === false && filter.isThisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) === convertirFecha (filter.date))
    }
    if(filter.date === '' && filter.isToday === true && filter.isThisWeek === true) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()) && (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    if(filter.date === '' && filter.isToday === true && filter.isThisWeek === false) {
      return medicalShifts.filter((medicalShift) => convertirFecha(medicalShift.date) ===  convertirFecha (new Date().toString()))
    }
    if(filter.date === '' && filter.isToday === false && filter.isThisWeek === true) {
      return medicalShifts.filter((medicalShift) => (convertirFecha(medicalShift.date)>= startOfWeek.getDate().toString() && convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString()))
    }
    return medicalShifts
  }

  async cancelMedicalShift(idMedicalShift: number): Promise<void> {
    this.objects = this.objects.filter((shift) => shift.id !== idMedicalShift)
  }

  async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
    const medicalShiftDto: MedicalShiftJSON = this.objects[idMedicalShift - 1]
    return new MedicalShift(
      medicalShiftDto.id,
      medicalShiftDto.vetName,
      medicalShiftDto.petName,
      medicalShiftDto.date
    )
  }

  async editExistMedicalShift(idMedicalShift: number, medicalShift: MedicalShift): Promise<void> {
    const index = this.objects.findIndex(shift => shift.id === idMedicalShift);
    if (index === -1) {
      throw new Error(`No se encontró un turno con el ID ${idMedicalShift}`);
    }
    this.objects[index] = {
      ...this.objects[index],
      ...medicalShift,
      id: idMedicalShift
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