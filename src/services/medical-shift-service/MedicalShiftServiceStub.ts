import dayjs from 'dayjs'
import { FilterTurn } from '../../domain/Filterturn'
import { MedicalShift, MedicalShiftJSON } from '../../domain/MedicalShift'
import { MedicalShiftServiceInter } from './MedicalShiftServiceInter'
import { NotificationModel } from '../../domain/Notification'
import { sharedMockNotifications } from '../vet-service/VetServiceStub'

export class MedicalShiftServiceStub implements MedicalShiftServiceInter {
  private objects: Array<MedicalShiftJSON> = [
    {
      id: 1,
      nameVet: 'Dr. Juan Perez',
      petMedicalShift: {
        id: 1,
        name: 'Nala',
      },
      date: '2025-05-16',
      hour: '18:30',
    },
    {
      id: 2,
      nameVet: 'Dr. Maria Lopez',
      petMedicalShift: {
        id: 2,
        name: 'Morena',
      },
      date: '2025-04-23',
      hour: '13:00',
    },
    {
      id: 3,
      nameVet: 'Dr. Carlos Garcia',
      petMedicalShift: {
        id: 3,
        name: 'Oli',
      },
      date: '2025-06-03',
      hour: '15:45',
    },
    {
      id: 4,
      nameVet: 'Dr. Ana Martinez',
      petMedicalShift: {
        id: 4,
        name: 'Pipi',
      },
      date: '2025-05-16',
      hour: '10:15',
    },
    {
      id: 5,
      nameVet: 'Dr. Laura Fernandez',
      petMedicalShift: {
        id: 5,
        name: 'Napoleon',
      },
      date: '2025-02-05',
      hour: '08:00',
    },
  ]

  async getAll(): Promise<MedicalShift[]> {
    return this.objects.map<MedicalShift>((MedicalShiftDto: MedicalShiftJSON) =>
      MedicalShift.fromJSON(MedicalShiftDto),
    )
  }

  async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
    const convertirFecha = (fechaString: string) => {
      return dayjs(fechaString).format('DD/MM/YYYY')
    }
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // domingo
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())) // sábado

    const medicalShifts = this.objects.map<MedicalShift>(
      (MedicalShiftDto: MedicalShiftJSON) =>
        MedicalShift.fromJSON(MedicalShiftDto),
    )
    if (
      filter.day !== '' &&
      filter.today === true &&
      filter.thisWeek === true
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) === convertirFecha(filter.day) &&
          convertirFecha(medicalShift.date) ===
            convertirFecha(new Date().toString()) &&
          convertirFecha(medicalShift.date) >=
            startOfWeek.getDate().toString() &&
          convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString(),
      )
    }
    if (
      filter.day !== '' &&
      filter.today === true &&
      filter.thisWeek === false
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) === convertirFecha(filter.day) &&
          convertirFecha(medicalShift.date) ===
            convertirFecha(new Date().toString()),
      )
    }
    if (
      filter.day !== '' &&
      filter.today === false &&
      filter.thisWeek === true
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) === convertirFecha(filter.day) &&
          convertirFecha(medicalShift.date) >=
            startOfWeek.getDate().toString() &&
          convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString(),
      )
    }
    if (
      filter.day !== '' &&
      filter.today === false &&
      filter.thisWeek === false
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) === convertirFecha(filter.day),
      )
    }
    if (
      filter.day === '' &&
      filter.today === true &&
      filter.thisWeek === true
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) ===
            convertirFecha(new Date().toString()) &&
          convertirFecha(medicalShift.date) >=
            startOfWeek.getDate().toString() &&
          convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString(),
      )
    }
    if (
      filter.day === '' &&
      filter.today === true &&
      filter.thisWeek === false
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) ===
          convertirFecha(new Date().toString()),
      )
    }
    if (
      filter.day === '' &&
      filter.today === false &&
      filter.thisWeek === true
    ) {
      return medicalShifts.filter(
        (medicalShift) =>
          convertirFecha(medicalShift.date) >=
            startOfWeek.getDate().toString() &&
          convertirFecha(medicalShift.date) <= endOfWeek.getDate().toString(),
      )
    }
    return medicalShifts
  }

  async cancelMedicalShift(idMedicalShift: number): Promise<void> {
    const turnoCancelado = this.objects.find((s) => s.id === idMedicalShift)
    this.objects = this.objects.filter((shift) => shift.id !== idMedicalShift)
    if (turnoCancelado) {
      sharedMockNotifications.push(
        new NotificationModel(
          Date.now(),
          'SHIFT_DELETE',
          `El turno de ${turnoCancelado.petMedicalShift.name} fue cancelado por el dueño`,
          new Date().toISOString(),
          true,
          turnoCancelado.petMedicalShift.name,
          'StubOwner',
          turnoCancelado.nameVet,
          `${turnoCancelado.date}T${turnoCancelado.hour}`,
        ),
      )
    }
  }

  async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
    const medicalShiftDto: MedicalShiftJSON = this.objects[idMedicalShift - 1]
    return MedicalShift.fromJSON(medicalShiftDto)
  }

  async editExistMedicalShift(medicalShift: MedicalShift): Promise<void> {
    const index = this.objects.findIndex(
      (shift) => shift.id === medicalShift.id,
    )
    if (index === -1) {
      throw new Error(`No se encontró un turno con el ID ${medicalShift.id}`)
    }
    this.objects[index] = {
      ...this.objects[index],
      ...medicalShift,
      id: medicalShift.id,
    }
  sharedMockNotifications.push(
    new NotificationModel(
      Date.now(),
      'SHIFT_UPDATE',
      `Se modificó el turno de ${medicalShift.petMedicalShift.name}`,
      new Date().toISOString(),
      false,
      medicalShift.petMedicalShift.name,
      'StubOwner',
      medicalShift.nameVet,
      `${medicalShift.date}T${medicalShift.hour}`
    ))
    
  }

  async createNewMedicalShift(medicalShift: MedicalShift): Promise<void> {
    const newId =
      this.objects.length > 0
        ? Math.max(...this.objects.map((shift) => shift.id)) + 1
        : 1
    const newMedicalShift: MedicalShiftJSON = {
      ...medicalShift,
      id: newId,
    }
     const today = new Date().toISOString().split('T')[0]

  if (newMedicalShift.date === today) {
    sharedMockNotifications.push(
      new NotificationModel(
        Date.now(),
        'SHIFT_TODAY',
        `Recordatorio: tenés un turno hoy con ${newMedicalShift.petMedicalShift.name}`,
        new Date().toISOString(),
        true,
        newMedicalShift.petMedicalShift.name,
        'StubOwner',
        newMedicalShift.nameVet,
        `${newMedicalShift.date}T${newMedicalShift.hour}`
      )
    )
  }}
}
