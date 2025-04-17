import { ErrorMessage } from '../error-message/ErrorMessage'
import MedicalShiftCard from '../medical-shift-card/medical-shift-card'

import { MedicalShift } from '../../domain/MedicalShift'

import './MedicalshiftGrid.css'

interface PropMedicalShifts {
  medicalShifts: Array<MedicalShift>
}

export const MedicalShiftGrid = (propMedicalShifts: PropMedicalShifts) => {

  return (
    <div id="content" className="content">
      {
        propMedicalShifts.medicalShifts.length > 0 ?
        propMedicalShifts.medicalShifts.map((medicalShift: MedicalShift) => {
            return (<MedicalShiftCard key={ medicalShift.id.toString() } medicalShift={ medicalShift } />)
          })
        :
        <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
    </div>
  )
}