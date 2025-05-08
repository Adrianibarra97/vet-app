import { useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { ErrorMessage } from "../error-message/ErrorMessage"
import MedicalShiftCard from "../medical-shift-card/MedicalShiftCard"
import { MedicalShiftModal } from "../medical-shift-modal/MedicalShiftModal"

import './MedicalShiftGrid.css'
import AuthServiceManager from "../../services/auth-service/AuthServiceManager"

interface PropMedicalShifts {
  medicalShifts: Array<MedicalShift>
  onClickCancel: (idMedicalShift: number) => void
  onEditOrCreateMedicalShift:(medicalShift: MedicalShift, idMedicalShift: number) => void
}

export const MedicalShiftGrid = (propMedicalShifts: PropMedicalShifts) => {
  const [modalCreateMedicalShiftOpen,setModalCreateMedicalShiftOpen]= useState(false)

  const showNewMedicalShiftButton = () => {
    return AuthServiceManager.getIntance().isVet()
      ?'content__items'
      :'content__items content__items--none'
  }

  const handleOnCreate = (medicalShift: MedicalShift, idMedicalShift: number) => {
    propMedicalShifts.onEditOrCreateMedicalShift(medicalShift, idMedicalShift)
  }

  return (
    <div id="content" className='content'>
      <div className={showNewMedicalShiftButton()}
        onClick={()=>setModalCreateMedicalShiftOpen(true)}>
        <h3 className="content__items--add">+ Nueva Consulta</h3>
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
        idMedicalShift={ -1 }
      />
    </div>
  )
}  