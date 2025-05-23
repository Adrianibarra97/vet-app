import { useState, useEffect } from 'react'
import { MedicalShiftGrid } from '../../components/medical-shift-grid/MedicalShiftGrid'
import { TurnFilter } from '../../components/turn-filter/TurnFilter'
import { FilterTurn } from '../../domain/Filterturn'
import { MedicalShift } from '../../domain/MedicalShift'
import MedicalShiftServiceManager from '../../services/medical-shift-service/MedicalShiftServiceManager'
import { Filter } from '../../domain/Filter'

import './MedicalShiftPage.css'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'
import { NotificationModel } from '../../domain/Notification'
import NotificationServiceManager from '../../services/notification-service/NotificationServiceManager'
import PetOwnerServiceManager from '../../services/pet-owner-service/PetOwnerServiceManager'
import VetServiceManager from '../../services/vet-service/VetServiceManager'
import { USER_ID_TOKEN } from '../../services/config'

const filterValues = new Filter(
  'Por fecha',
  'date',
  'Hoy',
  'checkbox',
  'Este semana',
  'checkbox',
)

export const MedicalShiftPage = () => {
  const [medicalShifts, setMedicalShifts] = useState(new Array<MedicalShift>())
  const [filter, setFilter] = useState<FilterTurn>(
    new FilterTurn('', false, false),
  )

  const handleChangesFilter = (filter: FilterTurn) => {
    setFilter(filter)
  }

  const getAllMedicalShiftsByFilter = async (filter: FilterTurn) => {
    const shifts =
      await MedicalShiftServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
  }
  const sendNotificationForBoth = async (
    type: string,
    message: string,
    shift: MedicalShift,
  ) => {
    const userId = parseInt(localStorage.getItem(USER_ID_TOKEN) || '-1')
    const petOwner =
      await PetOwnerServiceManager.getInstance().getOneById(userId)
    const vet = await VetServiceManager.getInstance().getOneById(userId)

    const baseNotificationData = {
      id: Date.now(),
      type,
      message,
      date: new Date().toISOString(),
      urgent: ['SHIFT_DELETE', 'SHIFT_TODAY'].includes(type),
      petName: shift.petMedicalShift.name,
      appointmentDate: `${shift.date}T${shift.hour}`,
    }

    const notificationForPetOwner = new NotificationModel(
      baseNotificationData.id,
      type,
      message,
      baseNotificationData.date,
      baseNotificationData.urgent,
      baseNotificationData.petName,
      `${petOwner.name} ${petOwner.surname}`,
      shift.nameVet,
      baseNotificationData.appointmentDate,
    )

    const notificationForVet = new NotificationModel(
      baseNotificationData.id + 1,
      type,
      message,
      baseNotificationData.date,
      baseNotificationData.urgent,
      baseNotificationData.petName,
      `${petOwner.name} ${petOwner.surname}`,
      `${vet.name} ${vet.surname}`,
      baseNotificationData.appointmentDate,
    )

    await NotificationServiceManager.getInstance().addNotification(
      notificationForPetOwner,
    )
    await NotificationServiceManager.getInstance().addNotification(
      notificationForVet,
    )
  }

  const handleMedicalShiftCancel = async (idMedicalShift: number) => {
    const shiftToCancel = medicalShifts.find((s) => s.id === idMedicalShift)
    if (shiftToCancel) {
      await sendNotificationForBoth(
        'SHIFT_DELETE',
        `El turno con ${shiftToCancel.petMedicalShift.name} fue cancelado`,
        shiftToCancel,
      )
    }

    await MedicalShiftServiceManager.getInstance().cancelMedicalShift(
      idMedicalShift,
    )
    const shifts =
      await MedicalShiftServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
    SnackbarUtilities.succes(`Se canceló con éxito el turno.`)
  }

  const handleEditOrCreateMedicalShift = async (
    medicalShift: MedicalShift,
    idMedicalShift: number,
  ) => {
    if (idMedicalShift > -1) {
      medicalShift.id = idMedicalShift
      await MedicalShiftServiceManager.getInstance().editExistMedicalShift(
        medicalShift,
      )

      await sendNotificationForBoth(
        'SHIFT_UPDATE',
        `El turno de ${medicalShift.petMedicalShift.name} fue actualizado`,
        medicalShift,
      )
      SnackbarUtilities.succes(
        `Se editó con éxito el turno de ${medicalShift.petMedicalShift.name}.`,
      )
    } else {
      await MedicalShiftServiceManager.getInstance().createNewMedicalShift(
        medicalShift,
      )

      await sendNotificationForBoth(
        'SHIFT_CREATE',
        `Nuevo turno asignado para ${medicalShift.petMedicalShift.name}`,
        medicalShift,
      )

      SnackbarUtilities.succes(
        `Se creó con éxito el turno de ${medicalShift.petMedicalShift.name}.`,
      )
    }

    await getAllMedicalShiftsByFilter(filter)
  }

  useEffect(() => {
    getAllMedicalShiftsByFilter(filter)
  }, [filter])

  return (
    <main className="main">
      <h2 className="main__title">Turnos</h2>
      <div className="main__content">
        <div className="main__content--filter">
          <TurnFilter
            filter={filterValues}
            filterFunction={handleChangesFilter}
          />
        </div>
        <div className="main__content--data">
          <MedicalShiftGrid
            medicalShifts={medicalShifts}
            onClickCancel={handleMedicalShiftCancel}
            onEditOrCreateMedicalShift={handleEditOrCreateMedicalShift}
          />
        </div>
      </div>
    </main>
  )
}
