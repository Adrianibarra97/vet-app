import { Card, Box, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { MedicalShift } from "../../domain/MedicalShift"
import { MedicalShiftModal } from "../medical-shift-modal/MedicalShiftModal"
import './MedicalShiftCard.css'
import AuthServiceManager from "../../services/auth-service/AuthServiceManager"
import { ConfirmOrCancelModalMedicalShift } from "../confirm-cancel-modal-medical-shift/ConfirmOrCancelModalMedicalShift"

interface MedicalShiftCardProps {
  medicalShift: MedicalShift,
  onClickCancel: (idMedicalShift: number) => void
  onClickEdit: (medicalShift: MedicalShift, idMedicalShift: number)=>void
}
export default function MedicalShiftCard({ medicalShift, onClickCancel, onClickEdit }: MedicalShiftCardProps) {
  const [modalEditMedicalShiftOpen,setModalEditMedicalShiftOpen]=useState(false)
  const [modalCancelMedicalShiftState, setModalCancelMedicalShiftState] = useState(false);
  const [isPastDate, setIsPastDate] = useState<boolean>(false)
  const [isPastTime, setIsPastTime] = useState<boolean>(false)
  const fecha = dayjs(medicalShift.date).format('DD/MM/YYYY')

  const handleOnEdit = (medicalShift: MedicalShift, idMedicalShift: number) => {
    onClickEdit(medicalShift, idMedicalShift)
    setModalEditMedicalShiftOpen(false)
  }

  const compareDates = (inputDate: string, inputTime: string) => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().substring(0, 5)

    setIsPastDate(inputDate < currentDate);

    if (inputDate === currentDate) {
      setIsPastTime(inputTime < currentTime);
    } else {
      setIsPastTime(false);
    }
  }

  const isPastMedicalShift = ():string => {
    return !isPastDate && !isPastTime ?
      'content__item'
      : 'content__height content__item'
  }

  useEffect(()=>{
    compareDates(medicalShift.date,medicalShift.hour)
  },[medicalShift])

  return (
    <>
      <Card className="content__items">
        <h4 className="content__items--title" >CONSULTA</h4>
        <main className="content__items--data">
          <div className={isPastMedicalShift()}>
            <Box className="content__item--data">
              <p className="item--label">Veterinario</p>
              <Typography className="item-data">{medicalShift.nameVet}</Typography>
            </Box>
            <Box className="content__item--data">
              <p className="item--label">Paciente</p>
              <Typography className="item-data">{medicalShift.petMedicalShift.name}</Typography>
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
          {!isPastDate && !isPastTime &&
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
          }
        </main>
      </Card>
      <MedicalShiftModal
        open={modalEditMedicalShiftOpen}
        onClose={() => setModalEditMedicalShiftOpen(false)}
        onConfirm={handleOnEdit}
        medicalShift={medicalShift}
        idMedicalShift={ medicalShift.id }
      />
      <ConfirmOrCancelModalMedicalShift
        open={modalCancelMedicalShiftState}
        onClose={() => setModalCancelMedicalShiftState(false)}
        onConfirm={() => onClickCancel(medicalShift.id)}
        medicalShift={medicalShift}
        title='¿Estas seguro que quieres cancelar este turno?'
      />
    </>
  )
}