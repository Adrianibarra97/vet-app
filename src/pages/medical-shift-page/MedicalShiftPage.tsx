import { useState, useEffect } from "react"
import { MedicalShiftGrid } from "../../components/medical-shift-grid/MedicalShiftGrid"
import { TurnFilter } from "../../components/turn-filter/TurnFilter"
import { FilterTurn } from "../../domain/Filterturn"
import { MedicalShift } from "../../domain/MedicalShift"
import MedicalShiftServiceManager from "../../services/medical-shift-service/MedicalShiftServiceManager"
import { Filter } from "../../domain/Filter"

import './MedicalShiftPage.css'
import { SnackbarUtilities } from "../../util/snackbar/SnackbarManager"
import { NotificationModel } from "../../domain/Notification"
import NotificationServiceManager from "../../services/notification-service/NotificationServiceManager"

const filterValues = new Filter(
  'Por fecha',
  'date',
  'Hoy',
  'checkbox',
  'Este semana',
  'checkbox',
)

export const MedicalShiftPage = () => {

  const[medicalShifts, setMedicalShifts] = useState(new Array<MedicalShift>())
  const [filter, setFilter] = useState<FilterTurn>(new FilterTurn('', false, false))

  const handleChangesFilter = (filter: FilterTurn) => {
    setFilter(filter)
  }

  const getAllMedicalShiftsByFilter = async (filter: FilterTurn) => {
    const shifts = await MedicalShiftServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
  }

  const createAndSendNotification = async (
    type: string,
    message: string,
    shift: MedicalShift
  ) => {
    const notification = new NotificationModel(
    Date.now(), 
    type,
    message,
    new Date().toISOString(),
    ['SHIFT_DELETE', 'SHIFT_TODAY'].includes(type),
    shift.petMedicalShift.name,
    undefined, 
    shift.nameVet,
    `${shift.date}T${shift.hour}`
  )

    await NotificationServiceManager.getInstance().addNotification(notification)
  }
  const handleMedicalShiftCancel = async (idMedicalShift: number) => {
    const shiftToCancel = medicalShifts.find(s => s.id === idMedicalShift)
    if (shiftToCancel) {
      await createAndSendNotification(
        'SHIFT_DELETE',
        `Tu turno con ${shiftToCancel.petMedicalShift.name} fue cancelado`,
        shiftToCancel
      )
    }

    await MedicalShiftServiceManager.getInstance().cancelMedicalShift(idMedicalShift)
    const shifts = await MedicalShiftServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
    SnackbarUtilities.succes(`Se canceló con éxito el turno.`)
  }

    const handleEditOrCreateMedicalShift = async (
    medicalShift: MedicalShift,
    idMedicalShift: number
  ) => {
    if (idMedicalShift > -1) {
      medicalShift.id = idMedicalShift
      await MedicalShiftServiceManager.getInstance().editExistMedicalShift(medicalShift)

      await createAndSendNotification(
        'SHIFT_UPDATE',
        `El turno de ${medicalShift.petMedicalShift.name} fue actualizado`,
        medicalShift
      )

      SnackbarUtilities.succes(`Se editó con éxito el turno de ${medicalShift.petMedicalShift.name}.`)
    } else {
      await MedicalShiftServiceManager.getInstance().createNewMedicalShift(medicalShift)

      await createAndSendNotification(
        'SHIFT_CREATE',
        `Nuevo turno asignado para ${medicalShift.petMedicalShift.name}`,
        medicalShift
      )

      SnackbarUtilities.succes(`Se creó con éxito el turno de ${medicalShift.petMedicalShift.name}.`)
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
          <TurnFilter filter={filterValues} filterFunction={handleChangesFilter} />
        </div>
        <div className="main__content--data">
          <MedicalShiftGrid medicalShifts={ medicalShifts }
            onClickCancel={handleMedicalShiftCancel}
            onEditOrCreateMedicalShift={handleEditOrCreateMedicalShift}
          />
        </div>
      </div>
    </main>
  )
}