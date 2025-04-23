import { useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { ErrorMessage } from "../error-message/ErrorMessage"
import MedicalShiftCard from "../medical-shift-card/MedicalShiftCard"
import { MedicalShiftModal } from "../medical-shift-modal/MedicalShiftModal"

import './MedicalShiftGrid.css'

interface PropMedicalShifts {
  medicalShifts: Array<MedicalShift>
  onClickCancel: (idMedicalShift: number) => void
  onEditOrCreateMedicalShift:(medicalShift: MedicalShift, idMedicalShift?: number) => void
}
  
export const MedicalShiftGrid = (propMedicalShifts: PropMedicalShifts) => {

  const [modalCreateMedicalShiftOpen,setModalCreateMedicalShiftOpen]= useState(false)
  const handleOnCreate = (medicalShift: MedicalShift, idMedicalShift?: number) => {
    propMedicalShifts.onEditOrCreateMedicalShift(medicalShift, idMedicalShift)
  }

  return (
    <div id="content" className="content">
      <div className="content__items"
        onClick={()=>setModalCreateMedicalShiftOpen(true)}>
        <h3 className="items--title">+ Nueva Consulta</h3>
      </div>
      {
        propMedicalShifts.medicalShifts.length > 0 ?
          propMedicalShifts.medicalShifts.map((medicalShift: MedicalShift) => {
            return (<MedicalShiftCard key={ medicalShift.id.toString() } 
              medicalShift={ medicalShift } onClickCancel={ propMedicalShifts.onClickCancel}
              onClickEdit={propMedicalShifts.onEditOrCreateMedicalShift}/>)
            })
        : <ErrorMessage errorMessage="No hay información para mostrar!" />
      }
      <MedicalShiftModal
        open={modalCreateMedicalShiftOpen}
        onClose={() => setModalCreateMedicalShiftOpen(false)}
        onConfirm={handleOnCreate}
        idMedicalShift={undefined}
      />
    </div>
  )
}  