<<<<<<< HEAD
import { ErrorMessage } from '../error-message/ErrorMessage'
import MedicalShiftCard from '../medical-shift-card/medical-shift-card'

import { MedicalShift } from '../../domain/MedicalShift'

import './MedicalshiftGrid.css'

interface PropMedicalShifts {
  medicalShifts: Array<MedicalShift>
}

export const MedicalShiftGrid = (propMedicalShifts: PropMedicalShifts) => {
=======
import { MedicalShift } from "../../domain/MedicalShift"
import { ErrorMessage } from "../error-message/ErrorMessage"
import MedicalShiftCard from "../medical-shift-card/MedicalShiftCard"


interface PropMedicalShift {
  medicalShifts: Array<MedicalShift>
}

export const MedicalShiftGrid = (propMedicalShift: PropMedicalShift) => {
>>>>>>> d04bd06 (we work on the shift view)

  return (
    <div id="content" className="content">
      {
<<<<<<< HEAD
        propMedicalShifts.medicalShifts.length > 0 ?
        propMedicalShifts.medicalShifts.map((medicalShift: MedicalShift) => {
=======
        propMedicalShift.medicalShifts.length > 0 ?
          propMedicalShift.medicalShifts.map((medicalShift: MedicalShift) => {
>>>>>>> d04bd06 (we work on the shift view)
            return (<MedicalShiftCard key={ medicalShift.id.toString() } medicalShift={ medicalShift } />)
          })
        :
        <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
    </div>
  )
}