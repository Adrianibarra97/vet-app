import dayjs from 'dayjs'
import { FilterTurn } from '../../domain/Filterturn'
import { MedicalShift, MedicalShiftJSON } from '../../domain/MedicalShift'
import { MedicalShiftServiceInter } from './MedicalShiftServiceInter'
import NotificationServiceManager from '../notification-service/NotificationServiceManager'
import { NotificationModel } from '../../domain/Notification'

export class MedicalShiftServiceStub implements MedicalShiftServiceInter {
  private objects: Array<MedicalShiftJSON> = [
    {
      id: 1,
      nameVet: 'Dr. Juan Perez',
      petMedicalShift: {
        id: 1,
        name: 'Nala',
      },
      date: '2025-04-25',
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
      date: '2025-06-04',
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
    return this.objects.map(MedicalShift.fromJSON)
  }

  async getAllByFilter(filter: FilterTurn): Promise<MedicalShift[]> {
    const convertirFecha = (fechaString: string) =>
      dayjs(fechaString).format('DD/MM/YYYY')

    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const endOfWeek = new Date(today)
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()))

    const medicalShifts = this.objects.map(MedicalShift.fromJSON)
    const diaHoy = convertirFecha(new Date().toString())

    return medicalShifts.filter((shift) => {
      const fecha = convertirFecha(shift.date)
      const enHoy = fecha === diaHoy
      const enSemana =
        fecha >= convertirFecha(startOfWeek.toString()) &&
        fecha <= convertirFecha(endOfWeek.toString())

      if (filter.day && filter.today && filter.thisWeek) {
        return fecha === convertirFecha(filter.day) && enHoy && enSemana
      }
      if (filter.day && filter.today)
        return fecha === convertirFecha(filter.day) && enHoy
      if (filter.day && filter.thisWeek)
        return fecha === convertirFecha(filter.day) && enSemana
      if (filter.day) return fecha === convertirFecha(filter.day)
      if (filter.today && filter.thisWeek) return enHoy && enSemana
      if (filter.today) return enHoy
      if (filter.thisWeek) return enSemana
      return true
    })
  }

  async cancelMedicalShift(idMedicalShift: number): Promise<void> {
    const shift = this.objects.find((s) => s.id === idMedicalShift)
    if (shift) {
      await NotificationServiceManager.getInstance().addNotification(
        new NotificationModel(
          Date.now(),
          'SHIFT_DELETE',
          `El turno con ${shift.petMedicalShift.name} fue cancelado`,
          new Date().toISOString(),
          true,
          shift.petMedicalShift.name,
          'petOwner',
          shift.nameVet,
          `${shift.date}T${shift.hour}`,
        ),
      )
    }
    this.objects = this.objects.filter((shift) => shift.id !== idMedicalShift)
  }

  async getMedicalShiftById(idMedicalShift: number): Promise<MedicalShift> {
    const medicalShiftDto = this.objects[idMedicalShift - 1]
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

    await NotificationServiceManager.getInstance().addNotification(
      new NotificationModel(
        Date.now(),
        'SHIFT_UPDATE',
        `Turno de ${medicalShift.petMedicalShift.name} modificado`,
        new Date().toISOString(),
        false,
        medicalShift.petMedicalShift.name,
        'petOwner',
        this.objects[index].nameVet,
        `${medicalShift.date}T${medicalShift.hour}`,
      ),
    )
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
    this.objects.push(newMedicalShift)

    await NotificationServiceManager.getInstance().addNotification(
      new NotificationModel(
        Date.now(),
        'appointment',
        `Nuevo turno creado para ${medicalShift.petMedicalShift.name}`,
        new Date().toISOString(),
        false,
        medicalShift.petMedicalShift.name,
        'Tamara',
        medicalShift.nameVet || '',
        `${medicalShift.date}T${medicalShift.hour}`,
      ),
    )
  }
}
