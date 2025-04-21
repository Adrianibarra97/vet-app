import { Card, Typography, Box } from '@mui/material'
import { MedicalShift } from '../../domain/MedicalShift'
import dayjs from 'dayjs'
import './MedicalShiftCard.css'
interface MedicalShiftCardProps {
  medicalShift: MedicalShift,
  onClickCancel: (idMedicalShift: number) => void
}

export default function MedicalShiftCard({
  medicalShift, onClickCancel
}: MedicalShiftCardProps) {
  const fecha = dayjs(medicalShift.date).format('DD/MM/YYYY')
  const convertirHora = (fechaString: string) => {
    return dayjs(fechaString).format('HH:mm')
  }
  return (
    <Card className="content__items">
      <h4 className="content__items--title" >
        CONSULTA
      </h4>

      <main className="content__items--data">
        <div className="content__item">
          <Box className="content__item--data">
            <p className="item--label">Veterinario</p>
            <Typography className="item-data">
              {medicalShift.vetName}
            </Typography>
          </Box>
          <Box className="content__item--data">
            <p className="item--label">Paciente</p>
            <Typography className="item-data">
              {medicalShift.petName}
            </Typography>
          </Box>
        </div>

        <Box className="content__item">
          <Box className="content__item--data">
            <p className="item--label">Fecha</p>
            <Typography className="item-data">{fecha}</Typography>
          </Box>
          <Box className="content__item--data">
            <p className="item--label">Hora</p>
            <Typography className="item-data">
              {convertirHora(medicalShift.date)}
            </Typography>
          </Box>
        </Box>

        <Box className="content__item--button">
          <button className="content__button content__button--edit">
            Editar
          </button>

          <button className="content__button content__button--cancel" onClick={() => onClickCancel(medicalShift.id)}>
            Cancelar
          </button>
        </Box>
      </main>
    </Card>
  )
}
