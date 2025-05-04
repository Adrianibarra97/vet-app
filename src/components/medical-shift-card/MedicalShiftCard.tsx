import { Card, Box, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { MedicalShiftModal } from "../medical-shift-modal/MedicalShiftModal"

import './MedicalShiftCard.css'
import AuthServiceManager from "../../services/auth-service/AuthServiceManager"
import CancelModalMedicalShift from "../cancel-modal-medical-shift/CancelModalMedicalShift"

interface MedicalShiftCardProps {
  medicalShift: MedicalShift,
  onClickCancel: (idMedicalShift: number) => void
  onClickEdit: (medicalShift: MedicalShift, idMedicalShift: number)=>void
}
export default function MedicalShiftCard({ medicalShift, onClickCancel, onClickEdit }: MedicalShiftCardProps) {
  const [modalEditMedicalShiftOpen,setModalEditMedicalShiftOpen]=useState(false)
  const [modalCancelMedicalShiftState, setModalCancelMedicalShiftState] = useState(false);
  const fecha = dayjs(medicalShift.date).format('DD/MM/YYYY')

  const handleOnEdit = (medicalShift: MedicalShift, idMedicalShift: number) => {
    onClickEdit(medicalShift, idMedicalShift)
    setModalEditMedicalShiftOpen(false)
  }

  return (
    <>
      <Card className="content__items">
        <h4 className="content__items--title" >CONSULTA</h4>
        <main className="content__items--data">
          <div className="content__item">
            <Box className="content__item--data">
              <p className="item--label">Veterinario</p>
              <Typography className="item-data">{medicalShift.nameVet}</Typography>
            </Box>
            <Box className="content__item--data">
              <p className="item--label">Paciente</p>
              <Typography className="item-data">{medicalShift.namePet.name}</Typography>
            </Box>
          </div>
          <Box className="content__item">
            <Box className="content__item--data">
              <p className="item--label">Fecha</p>
              <Typography className="item-data">{fecha}</Typography>
            </Box>
            <Box className="content__item--data">
              <p className="item--label">Hora</p>
              <Typography className="item-data">{medicalShift.hour}</Typography>
            </Box>
          </Box>
          <Box className="content__item--button">
            {AuthServiceManager.getIntance().isVet() &&
              <button className="content__button content__button--edit"
                onClick={()=>setModalEditMedicalShiftOpen(true)}
              >
                Editar
              </button>
            }
            <button className="content__button content__button--cancel"
              onClick={() => setModalCancelMedicalShiftState(true)}
            >Cancelar</button>
          </Box>
        </main>
      </Card>
      <MedicalShiftModal
        open={modalEditMedicalShiftOpen}
        onClose={() => setModalEditMedicalShiftOpen(false)}
        onConfirm={handleOnEdit}
        idMedicalShift={ medicalShift.id }
      />
      <CancelModalMedicalShift
        open={modalCancelMedicalShiftState}
        onClose={() => setModalCancelMedicalShiftState(false)}
        onConfirm={() => onClickCancel(medicalShift.id)}
      />
    </>
  )
}