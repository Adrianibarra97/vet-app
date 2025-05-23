import { useState, useEffect } from 'react'
import { MedicalShiftGrid } from '../../components/medical-shift-grid/MedicalShiftGrid'
import { TurnFilter } from '../../components/turn-filter/TurnFilter'
import { FilterTurn } from '../../domain/Filterturn'
import { MedicalShift } from '../../domain/MedicalShift'
import MedicalShiftServiceManager from '../../services/medical-shift-service/MedicalShiftServiceManager'
import { Filter } from '../../domain/Filter'

import './MedicalShiftPage.css'
import { SnackbarUtilities } from '../../util/snackbar/SnackbarManager'

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

  const handleMedicalShiftCancel = async (idMedicalShift: number) => {
    await MedicalShiftServiceManager.getInstance().cancelMedicalShift(
      idMedicalShift,
    )
    const shifts =
      await MedicalShiftServiceManager.getInstance().getAllByFilter(filter)
    setMedicalShifts(shifts)
    SnackbarUtilities.succes(`Se cancelo con exito el medical shift.`)
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
      await getAllMedicalShiftsByFilter(filter)
      SnackbarUtilities.succes(
        `Se edito con exito el medical shift de ${medicalShift.petMedicalShift.name}.`,
      )
    } else {
      await MedicalShiftServiceManager.getInstance().createNewMedicalShift(
        medicalShift,
      )
      await getAllMedicalShiftsByFilter(filter)
      SnackbarUtilities.succes(
        `Se creo con exito el medical shift de ${medicalShift.petMedicalShift.name}.`,
      )
    }
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
